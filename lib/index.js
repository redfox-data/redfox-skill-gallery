/**
 * redfox-skill-gallery host entry (node half).
 *
 * Focuses the gallery on the `redfox-community-dsh` skill set (the packaged
 * redfox-community hub skills) instead of the user's local skills. Exposes:
 *  - GET  `/redfox-skill-gallery/redfox-skills` -> `{ installed, count, skills }`
 *  - GET  `/redfox-skill-gallery/skill-readme?name=` -> `{ zh, en }`
 *  - POST `/redfox-skill-gallery/install-redfox`  -> auto-installs redfox-community-dsh
 *
 * `installed` is true when any skill carries provider `redfox-community-dsh`.
 * When absent, the browser half auto-calls the install route, which shells out
 * to `dsh plugin --profile <name> add github:redfox-data/redfox-community-dsh`.
 */
import { readFileSync, existsSync } from 'node:fs'
import { join, resolve } from 'node:path'
import { spawn } from 'node:child_process'

export const name = 'redfox-skill-gallery'
export const inject = ['skills']

const REDFOX_PROVIDER = 'redfox-community-dsh'
const REDFOX_SPEC = 'github:redfox-data/redfox-community-dsh'

/** Extract the human title from a README's first H1 line (`# 中文名 / slug`). */
function readmeTitle(readme) {
  const lines = String(readme || '').split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^#\s+(.+)$/)
    if (!m) continue
    let title = m[1].trim()
    const slash = title.indexOf(' / ')
    if (slash !== -1) title = title.slice(0, slash).trim()
    return title || null
  }
  return null
}

/** Strip the leading H1 (and the `---` rule right after it) from a README. */
function stripH1(md) {
  const lines = String(md || '').split(/\r?\n/)
  const idx = lines.findIndex((l) => /^#\s+/.test(l))
  if (idx === -1) return String(md || '')
  const rest = lines.slice(idx + 1)
  let start = 0
  while (start < rest.length && (rest[start].trim() === '' || /^\s*---+\s*$/.test(rest[start]))) start++
  return rest.slice(start).join('\n').trim()
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'cache-control': 'no-store',
    'content-type': 'application/json; charset=utf-8',
  })
  res.end(JSON.stringify(payload))
}

function readText(path) {
  try {
    return existsSync(path) ? readFileSync(path, 'utf8') : ''
  } catch {
    return ''
  }
}

/** Resolve the profile name this host booted with (default `web`). */
function argvProfile() {
  const argv = process.argv
  const i = argv.indexOf('--profile')
  return i !== -1 && i + 1 < argv.length && !argv[i + 1].startsWith('-') ? argv[i + 1] : 'web'
}

/** Resolve how to invoke the dsh CLI (node entry when available, else bare `dsh`). */
function dshCommand() {
  const entry = process.argv[1]
  if (entry !== undefined && /[\\/](?:bin\.(?:js|ts)|dsh)$/.test(entry)) {
    const abs = resolve(entry)
    return { file: process.execPath, args: [...process.execArgv, abs] }
  }
  return { file: 'dsh', args: [] }
}

/** Run `dsh plugin --profile <name> <args...>` and resolve its outcome. */
function runDshPlugin(profile, pluginArgs, timeoutMs = 180000) {
  const { file, args } = dshCommand()
  return new Promise((resolvePromise) => {
    const child = spawn(file, [...args, 'plugin', '--profile', profile, ...pluginArgs], {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: process.platform !== 'win32',
    })
    let stdout = ''
    let stderr = ''
    let settled = false
    const settle = (result) => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      resolvePromise(result)
    }
    const timer = setTimeout(() => {
      try {
        child.kill('SIGTERM')
      } catch {
        /* already gone */
      }
      settle({ exitCode: 124, stdout, stderr: 'install timed out', timedOut: true })
    }, timeoutMs)
    child.stdout?.on('data', (c) => {
      stdout = (stdout + c.toString()).slice(-256 * 1024)
    })
    child.stderr?.on('data', (c) => {
      stderr = (stderr + c.toString()).slice(-64 * 1024)
    })
    child.on('error', (err) => settle({ exitCode: 127, stdout, stderr: String((err && err.message) || err) }))
    child.on('close', (code) => settle({ exitCode: code, stdout, stderr }))
  })
}

export function apply(ctx) {
  ctx.inject(['webServer'], (hostCtx) => {
    hostCtx.effect(() => {
      async function listRedfox() {
        const skills = await ctx.skills.list()
        return skills.filter((s) => s.provider === REDFOX_PROVIDER)
      }

      const offList = hostCtx.webServer.register({
        kind: 'exact',
        path: '/redfox-skill-gallery/redfox-skills',
        handler: async (req, res) => {
          try {
            const redfox = await listRedfox()
            const skills = redfox.map((s) => {
              const base = s.resourceBase
              let zhName = ''
              if (base && base.kind === 'directory' && base.path) {
                zhName = readmeTitle(readText(join(base.path, 'README.md'))) || ''
              }
              return {
                name: s.name,
                description: s.description || '',
                whenToUse: s.whenToUse,
                modelInvocable: s.invocation.modelInvocable,
                zhName,
              }
            })
            sendJson(res, 200, { installed: redfox.length > 0, count: skills.length, skills })
          } catch (err) {
            sendJson(res, 500, { error: String((err && err.message) || err) })
          }
        },
      })

      const offReadme = hostCtx.webServer.register({
        kind: 'exact',
        path: '/redfox-skill-gallery/skill-readme',
        handler: async (req, res) => {
          try {
            const url = new URL(req.url || '/', 'http://localhost')
            const name = url.searchParams.get('name')
            if (!name) {
              sendJson(res, 400, { error: 'missing name' })
              return
            }
            const redfox = await listRedfox()
            const skill = redfox.find((s) => s.name === name)
            const base = skill && skill.resourceBase
            if (!base || base.kind !== 'directory' || !base.path) {
              sendJson(res, 404, { error: 'skill not found' })
              return
            }
            sendJson(res, 200, {
              zh: stripH1(readText(join(base.path, 'README.md'))),
              en: stripH1(readText(join(base.path, 'README.en.md'))),
            })
          } catch (err) {
            sendJson(res, 500, { error: String((err && err.message) || err) })
          }
        },
      })

      const offInstall = hostCtx.webServer.register({
        kind: 'exact',
        path: '/redfox-skill-gallery/install-redfox',
        handler: async (req, res) => {
          try {
            if (req.method && req.method.toUpperCase() !== 'POST') {
              sendJson(res, 405, { error: 'POST only' })
              return
            }
            const redfox = await listRedfox()
            if (redfox.length > 0) {
              sendJson(res, 200, { ok: true, alreadyInstalled: true, count: redfox.length })
              return
            }
            // `-w` targets the profile root (the profile is a pnpm workspace;
            // without it pnpm fails with ERR_PNPM_ADDING_TO_ROOT).
            const result = await runDshPlugin(argvProfile(), ['add', '-w', REDFOX_SPEC])
            if (result.exitCode === 0) {
              sendJson(res, 200, { ok: true, installed: true, restart: true, output: result.stdout })
            } else {
              sendJson(res, 500, { ok: false, error: result.stderr || `exit ${result.exitCode}` })
            }
          } catch (err) {
            sendJson(res, 500, { error: String((err && err.message) || err) })
          }
        },
      })

      return () => {
        offList()
        offReadme()
        offInstall()
      }
    }, 'redfox-skill-gallery: http routes')
  })
}
