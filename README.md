# RedFox Skill Gallery / redfox-skill-gallery

<p align="right">
  English
  <a href="https://github.com/redfox-data/redfox-skill-gallery/blob/main/README.zh.md">中文</a>
</p>

> RedFox Skills visual gallery plugin — presents RedFox community skills from `redfox-community-dsh` as cards in the DeepSeek Harness Web UI, ready to use with one click.

## Overview

`redfox-skill-gallery` is a DeepSeek Harness Web plugin. It adds a **RedFox Skills** entry at the bottom of the sidebar. Click it to switch the entire UI into a card-style skill gallery that lists all RedFox community skills from the `redfox-community-dsh` plugin (your local skills are not mixed in).

Each card shows the skill’s Chinese name, slug, and description. You can search in real time, open README details, and insert a skill reference into the input box with one click. If `redfox-community-dsh` is not installed yet, opening the gallery will install it for you automatically.

## Features

- Lists all RedFox community skills from `redfox-community-dsh`.
- Filter by category: a filter row under the header groups skills by type (Search, Trending, Accounts, Comments, Feeds & Subs, Download, Writing, Compliance, AI Generation, AI Search, Finance, Tools); each card also shows its category tag.
- Card-style gallery; each card includes Chinese name, slug (technical skill id, e.g. `/bili-ai-feed`), and description.
- Real-time search by Chinese name / slug / description.
- Click a card to view the skill README, with Chinese / English switching.
- Click **Use now** to insert the skill into the input box; you can add or edit your request before sending.
- Auto-installs `redfox-community-dsh` when it is missing.
- Chinese and English UI.

## How to use

### Install

We recommend installing the `redfox-community-dsh` plugin in advance. If it is missing, opening the gallery will install it automatically — but you still need to restart `dsh web` afterward for it to take effect. Installing ahead of time avoids an extra restart:

```sh
dsh plugin --profile web add -w github:redfox-data/redfox-community-dsh
```

Then install this plugin:

```sh
dsh plugin --profile web add -w github:redfox-data/redfox-skill-gallery
```

Restart `dsh web` after install for the change to take effect.

### Usage

1. After restart, refresh the page and click the **RedFox Skills** button at the bottom of the left sidebar.
2. The gallery shows all RedFox community skills as cards.
3. Click a category chip in the filter row (All / Search / Trending / …) to narrow by type; it stacks with the search box.
4. Type keywords in the top search box to filter by Chinese name / slug / description.
5. Click a card to open the detail panel on the right and read the skill README (switch between Chinese / English).
6. Click **Use now** on a card to insert the skill as `/name` into the input box; add or edit your request, then press Enter to send.
7. Press ESC or click **Close** in the top-right to return to the conversation.

> If `redfox-community-dsh` is not installed, opening the gallery will install it automatically — but you still need to restart `dsh web` afterward for it to take effect. Installing it in advance is recommended.

## Skill categories

Category data lives in `lib/skill-categories.json` of this plugin:

- `categories`: category definitions (`id` / Chinese label / English label); array order is the order of the filter row.
- `skills`: pre-classified mapping from skill name to category id, so skills are grouped by type right after the first install.
- `fallbackRules`: keyword-based fallback rules; a new skill not yet in the mapping is auto-classified by these rules first, and falls back to "Other" when nothing matches.

When `redfox-community-dsh` adds new skills later, the agent decides the category and appends one line `"<skill-name>": "<category-id>"` to `skills`. The list route re-reads this file on every request, so the change applies without restarting `dsh web`.

## Uninstall

```sh
dsh plugin --profile web remove redfox-skill-gallery
```
