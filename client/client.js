window.__ModuleLoader__.load({
  id: "redfox-skill-gallery",
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    var React = require("react");
    var primitives = require("@deepseek-ai/dsh-client-ui-primitives");
    var MarkdownText = primitives.MarkdownText;

    //#region CSS (RedFox-inspired, light & airy)
    var css = [
      // sidebar footer badge
      ".sg_layer{flex:none;align-items:center;width:100%;height:49px;margin:8px 0 0;display:flex;position:relative}",
      ".sg_badge{width:100%;height:49px;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border:none;border-radius:12px;align-items:center;gap:8px;padding:0 8px 0 6px;font-family:inherit;font-size:14px;display:inline-flex;overflow:hidden}",
      ".sg_badge:hover{background:var(--dsw-alias-interactive-bg-hover-solid)}",
      ".sg_badge[data-active]{background:var(--dsw-alias-interactive-bg-hover)}",
      ".sg_badgeIcon{color:#ef4444;flex:none;width:16px;height:16px;display:inline-flex;align-items:center;justify-content:center}",
      ".sg_badgeLabel{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}",
      ".sg_layer.sg_rail{width:36px;height:36px;margin:0}",
      ".sg_layer.sg_rail .sg_badge{border-radius:50%;justify-content:center;gap:0;width:36px;height:36px;padding:0}",

      // full-screen gallery overlay
      ".sg_overlay{position:absolute;inset:0;background:var(--dsw-alias-bg-base);flex-direction:column;display:flex;overflow:hidden}",
      ".sg_header{box-sizing:border-box;border-bottom:1px solid var(--dsw-alias-border-l2);flex:none;align-items:center;gap:12px;min-height:60px;padding:12px 20px;display:flex}",
      ".sg_brand{flex:none;align-items:center;gap:8px;display:flex}",
      ".sg_fox{width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#ef4444,#f97316);align-items:center;justify-content:center;color:#fff;display:inline-flex;font-size:14px;flex:none}",
      ".sg_title{color:var(--dsw-alias-label-primary);font-size:17px;font-weight:700;line-height:24px}",
      ".sg_subtitle{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px;flex:none}",
      ".sg_search{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-base);min-width:0;height:36px;color:var(--dsw-alias-label-primary);font:inherit;border-radius:10px;padding:0 12px;outline:none;flex:1}",
      ".sg_search:focus{border-color:#ef4444}",
      ".sg_close{flex:none;height:36px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l2);border-radius:10px;padding:0 14px;font:inherit;font-size:13px}",
      ".sg_close:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}",

      // category filter row (below header, horizontally scrollable)
      ".sg_cats{flex:none;align-items:center;gap:8px;padding:10px 20px;display:flex;overflow-x:auto;border-bottom:1px solid var(--dsw-alias-border-l2);scrollbar-width:none}",
      ".sg_cats::-webkit-scrollbar{display:none}",
      ".sg_cat{flex:none;height:28px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l2);border-radius:999px;padding:0 12px;font:inherit;font-size:12px;display:inline-flex;align-items:center;gap:5px;white-space:nowrap}",
      ".sg_cat:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l1)}",
      ".sg_cat[data-active='true']{color:#ef4444;border-color:#ef4444;background:rgba(239,68,68,.08)}",
      ".sg_catCount{opacity:.6;font-size:11px}",

      // main: list (left) + detail panel (right, 20%)
      ".sg_main{flex:1;min-height:0;display:flex;flex-direction:row;overflow:hidden}",
      ".sg_list{flex:1;min-width:0;overflow-y:auto;padding:20px}",
      ".sg_note,.sg_error{color:var(--dsw-alias-label-tertiary);margin:16px 0;font-size:13px;line-height:20px}",
      ".sg_error{color:var(--dsw-alias-state-error-primary)}",
      ".sg_count{color:var(--dsw-alias-label-caption);margin:0 0 14px;font-size:12px;line-height:16px}",
      ".sg_grid{grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;display:grid}",
      ".sg_card{border:1px solid var(--dsw-alias-border-l1);background:var(--dsw-alias-bg-base);border-radius:14px;flex-direction:column;gap:10px;padding:16px;display:flex;text-align:left;cursor:pointer;transition:border-color .15s ease,box-shadow .15s ease,transform .15s ease}",
      ".sg_card:hover{border-color:#ef4444;box-shadow:var(--dsw-shadow-lv2);transform:translateY(-2px)}",
      ".sg_card[data-selected]{border-color:#ef4444;box-shadow:0 0 0 1px rgba(239,68,68,.35),var(--dsw-shadow-lv2);background:rgba(239,68,68,.04)}",
      ".sg_cardHead{flex-direction:column;gap:3px;display:flex}",
      ".sg_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:21px}",
      ".sg_slug{color:var(--dsw-alias-label-tertiary);font-family:var(--dsh-font-mono,monospace);font-size:11px;line-height:16px;word-break:break-all;cursor:pointer;align-self:flex-start;border:none;background:0 0;padding:0;font:inherit}",
      ".sg_slug:hover{color:#ef4444;text-decoration:underline}",
      ".sg_userOnly{align-self:flex-start;background:var(--dsw-alias-state-warn-tertiary);color:var(--dsw-alias-state-warn-label);border-radius:8px;padding:0 6px;font-size:10px;line-height:16px;display:inline-flex}",
      ".sg_catTag{align-self:flex-start;background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-tertiary);border-radius:8px;padding:0 6px;font-size:10px;line-height:16px;display:inline-flex}",
      ".sg_desc{color:var(--dsw-alias-label-secondary);font-size:13px;line-height:19px;flex:1;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}",
      ".sg_use{cursor:pointer;background:rgba(239,68,68,.1);color:#ef4444;border:1px solid rgba(239,68,68,.25);border-radius:10px;align-items:center;justify-content:center;height:34px;padding:0 12px;font:inherit;font-size:13px;font-weight:500;display:inline-flex;transition:background .25s ease,color .25s ease,border-color .25s ease}",
      ".sg_use:hover:not(:disabled){background:#ef4444;border-color:#ef4444;color:#fff}",
      ".sg_use:disabled{opacity:.5;cursor:default}",

      // detail panel (slides open to 20%)
      ".sg_detail{width:0;flex:none;overflow:hidden;border-left:1px solid transparent;background:var(--dsw-alias-bg-base);transition:width .3s cubic-bezier(.4,0,.2,1),border-color .3s ease}",
      ".sg_detail[data-open='true']{width:25%;min-width:260px;border-left-color:var(--dsw-alias-border-l2)}",
      ".sg_detailInner{width:100%;min-width:260px;height:100%;flex-direction:column;display:flex;opacity:0;transition:opacity .25s ease}",
      ".sg_detail[data-open='true'] .sg_detailInner{opacity:1}",
      ".sg_detailHead{box-sizing:border-box;border-bottom:1px solid var(--dsw-alias-border-l2);flex:none;align-items:center;gap:8px;min-height:52px;padding:10px 14px;display:flex}",
      ".sg_detailTitle{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:600;line-height:20px;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}",
      ".sg_lang{flex:none;height:26px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:var(--dsw-alias-interactive-bg-hover);border:1px solid var(--dsw-alias-border-l2);border-radius:7px;padding:0 8px;font:inherit;font-size:11px}",
      ".sg_lang[data-active='true']{color:#ef4444;border-color:#ef4444;background:rgba(239,68,68,.08)}",
      ".sg_detailClose{flex:none;height:26px;width:26px;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;border-radius:7px;align-items:center;justify-content:center;font:inherit;font-size:14px;display:inline-flex}",
      ".sg_detailClose:hover{background:var(--dsw-alias-interactive-bg-hover);color:var(--dsw-alias-label-primary)}",
      ".sg_detailBody{flex:1;min-height:0;overflow-y:auto;padding:14px 16px;font-size:13px;line-height:20px}",
      ".sg_detailBody>:first-child{margin-top:0}"
    ].join("\n");
    var tagId = "redfox-skill-gallery/style.css";
    if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
      var tag = document.createElement("style");
      tag.dataset.plugin = "redfox-skill-gallery";
      tag.dataset.pluginCss = tagId;
      tag.textContent = css;
      document.head.appendChild(tag);
    }
    //#endregion

    var NS = "redfox-skill-gallery";
    var zh = {
      "trigger": "红狐Skills",
      "title": "红狐Skills",
      "subtitle": "点击卡片查看详情，点「立即使用」引用到输入框",
      "aria": "打开红狐Skills技能画廊",
      "close": "关闭",
      "search.placeholder": "搜索技能名称 / slug / 描述…",
      "task.placeholder": "可选：先描述你的需求，再点「立即使用」",
      "loading": "正在加载技能…",
      "empty": "当前工作区没有可调用的技能。",
      "emptyQuery": "没有匹配「{query}」的技能。",
      "noSession": "请先新建或选择一个会话，再使用技能。",
      "count": "共 {count} 个技能",
      "use": "立即使用",
      "userOnly": "仅用户",
      "lang.current": "zh",
      "cat.all": "全部",
      "emptyCat": "该分类下暂无技能。",
      "failed": "操作失败：{message}",
      "detail.loading": "正在加载说明…",
      "detail.empty": "该技能暂无说明文档。",
      "copy.slug": "点击复制 /{name}",
      "copied": "已复制 /{name}",
      "install.installing": "未检测到 redfox-community-dsh，正在自动安装…",
      "install.installed": "已自动安装 redfox-community-dsh，请重启 dsh web 后生效。",
      "install.failed": "自动安装失败：{message}"
    };
    var en = {
      "trigger": "RedFox Skills",
      "title": "RedFox Skills",
      "subtitle": "Click a card for details, or \"Use now\" to quote into the input",
      "aria": "Open RedFox Skills gallery",
      "close": "Close",
      "search.placeholder": "Search skill name / slug / description…",
      "task.placeholder": "Optional: describe your task first, then click \"Use now\"",
      "loading": "Loading skills…",
      "empty": "No invocable skills in this workspace.",
      "emptyQuery": "No skill matches \"{query}\".",
      "noSession": "Open or create a session first, then use a skill.",
      "count": "{count} skills",
      "use": "Use now",
      "userOnly": "user-only",
      "lang.current": "en",
      "cat.all": "All",
      "emptyCat": "No skills in this category yet.",
      "failed": "Failed: {message}",
      "detail.loading": "Loading readme…",
      "detail.empty": "No readme for this skill.",
      "copy.slug": "Click to copy /{name}",
      "copied": "Copied /{name}",
      "install.installing": "redfox-community-dsh not found — auto-installing…",
      "install.installed": "redfox-community-dsh installed — restart dsh web to apply.",
      "install.failed": "Auto-install failed: {message}"
    };

    var inject = ["slots", "locale", "connection", "sessions", "conversation"];

    /** Minimal observable store shared by the sidebar badge and the overlay. */
    function createStore(initial) {
      var state = initial;
      var listeners = [];
      return {
        getSnapshot: function () { return state; },
        subscribe: function (fn) {
          listeners.push(fn);
          return function () {
            var i = listeners.indexOf(fn);
            if (i !== -1) listeners.splice(i, 1);
          };
        },
        set: function (next) {
          state = next;
          for (var i = 0; i < listeners.length; i++) listeners[i]();
        }
      };
    }

    function titleCase(name) {
      return String(name || "").split("-").filter(Boolean).map(function (w) {
        return w.charAt(0).toUpperCase() + w.slice(1);
      }).join(" ");
    }

    /** Fetch the redfox-community-dsh skill set from the host route. */
    function fetchRedfoxSkills() {
      return fetch("/redfox-skill-gallery/redfox-skills", { cache: "no-store" })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          return {
            installed: !!(d && d.installed),
            count: (d && d.count) || 0,
            skills: (d && d.skills) || [],
            categories: (d && d.categories) || [],
            error: d && d.error,
          };
        });
    }

    /** Ask the host to auto-install redfox-community-dsh. */
    function installRedfox() {
      return fetch("/redfox-skill-gallery/install-redfox", { method: "POST", cache: "no-store" })
        .then(function (r) { return r.json(); });
    }

    function apply(ctx) {
      ctx.effect(function () {
        ctx.locale.register(NS, { zh: zh, en: en });
      }, "skill-gallery: dictionaries");

      var sessions = ctx.get("sessions");
      var conversation = ctx.get("conversation");
      var ui = createStore({ open: false });

      /** Sidebar footer button: opens the gallery overlay. */
      function SidebarButton(props) {
        var wide = props.wide;
        var t = props.t;
        var open = React.useSyncExternalStore(ui.subscribe, ui.getSnapshot).open;
        return React.createElement("div", {
          className: wide ? "sg_layer" : "sg_layer sg_rail"
        },
          React.createElement("button", {
            type: "button",
            className: "sg_badge",
            "data-active": open || void 0,
            "aria-label": t("aria"),
            "aria-expanded": open,
            onClick: function () { ui.set({ open: true }); }
          },
            React.createElement("span", { className: "sg_badgeIcon" }, "🦊"),
            wide ? React.createElement("span", { className: "sg_badgeLabel" }, t("trigger")) : null
          )
        );
      }

      /** Full-screen gallery overlay: card grid + right-side detail panel. */
      function GalleryOverlay(props) {
        var t = props.t;
        var useSessions = props.useSessions;
        var open = React.useSyncExternalStore(ui.subscribe, ui.getSnapshot).open;

        var skillsState = React.useState(null);
        var skills = skillsState[0];
        var setSkills = skillsState[1];
        var errorState = React.useState(null);
        var error = errorState[0];
        var setError = errorState[1];
        var noteState = React.useState(null);
        var note = noteState[0];
        var setNote = noteState[1];
        var installState = React.useState("idle");
        var install = installState[0];
        var setInstall = installState[1];
        var queryState = React.useState("");
        var query = queryState[0];
        var setQuery = queryState[1];
        var taskState = React.useState("");
        var task = taskState[0];
        var setTask = taskState[1];
        var catsState = React.useState([]);
        var cats = catsState[0];
        var setCats = catsState[1];
        var activeCatState = React.useState("all");
        var activeCat = activeCatState[0];
        var setActiveCat = activeCatState[1];

        var selectedState = React.useState(null);
        var selected = selectedState[0];
        var setSelected = selectedState[1];
        var langState = React.useState("zh");
        var lang = langState[0];
        var setLang = langState[1];
        var readmeState = React.useState(null);
        var readme = readmeState[0];
        var setReadme = readmeState[1];

        var currentId = useSessions
          ? useSessions(function (s) { return s.current; })
          : sessions.list.getSnapshot().current;

        React.useEffect(function () {
          if (!open) return;
          setError(null);
          setNote(null);
          setSkills(null);
          setInstall("idle");
          setCats([]);
          setActiveCat("all");
          var abort = new AbortController();
          fetchRedfoxSkills().then(function (d) {
            if (abort.signal.aborted) return;
            if (d.error) { setError(d.error); setSkills([]); return; }
            if (!d.installed) {
              setInstall("installing");
              setSkills([]);
              installRedfox().then(function (r) {
                if (abort.signal.aborted) return;
                if (r && r.ok) {
                  setInstall("installed");
                } else {
                  setInstall("failed");
                  setError(t("install.failed", { message: (r && r.error) || "unknown" }));
                }
              }).catch(function (err) {
                if (abort.signal.aborted) return;
                setInstall("failed");
                setError(t("install.failed", { message: String((err && err.message) || err) }));
              });
              return;
            }
            setSkills(d.skills);
            setCats(d.categories || []);
          }).catch(function (err) {
            if (abort.signal.aborted) return;
            setError(String((err && err.message) || err));
            setSkills([]);
          });
          return function () { abort.abort(); };
        }, [open]);

        React.useEffect(function () {
          if (!open) return;
          var onKey = function (e) { if (e.key === "Escape") ui.set({ open: false }); };
          window.addEventListener("keydown", onKey);
          return function () { window.removeEventListener("keydown", onKey); };
        }, [open]);

        React.useEffect(function () {
          if (selected === null) { setReadme(null); setLang("zh"); return; }
          setReadme(null);
          var abort = new AbortController();
          fetch("/redfox-skill-gallery/skill-readme?name=" + encodeURIComponent(selected), { cache: "no-store" })
            .then(function (r) { return r.json(); })
            .then(function (d) {
              if (abort.signal.aborted) return;
              setReadme(d && d.zh !== void 0 ? d : { zh: "", en: "" });
            })
            .catch(function () {
              if (abort.signal.aborted) return;
              setReadme({ zh: "", en: "" });
            });
          return function () { abort.abort(); };
        }, [selected]);

        if (!open) return null;

        function close() {
          ui.set({ open: false });
        }

        function invoke(name) {
          if (currentId === void 0 || currentId === null) { setError(t("noSession")); return; }
          var text = "/" + name + (task.trim() ? " " + task.trim() : " ");
          try {
            // Build a draft span at the end of the current composer draft and
            // route the insertion through the frozen `slash/input-insert-text`
            // event (consumed by ui-conversation's SessionInputShell), rather
            // than calling the package-internal setDraft directly.
            // `conversation` is the ConversationController service; its public
            // `input` field is the InputHub (SessionInputResolver), which owns
            // the per-session shell registry.
            var inputHub = conversation.input || conversation;
            var shell = inputHub.shell(currentId);
            var snap = shell.snapshot || {};
            var draft = snap.draft || "";
            var span = {
              start: draft.length,
              end: draft.length,
              draftRev: snap.draftRev,
            };
            var actx = sessions.scope(currentId);
            var applied = false;
            if (actx) {
              applied = actx.bail(actx, "slash/input-insert-text", { text: text, span: span }) === true;
            }
            if (!applied) {
              // fallback: no session-scope listener yet — append directly.
              shell.setDraft(draft + text);
            }
            setTask("");
            ui.set({ open: false });
          } catch (err) {
            setError(t("failed", { message: String((err && err.message) || err) }));
          }
        }

        var q = query.trim().toLowerCase();
        var uiLang = t("lang.current");
        var catLabel = function (id) {
          for (var i = 0; i < cats.length; i++) {
            if (cats[i] && cats[i].id === id) return (uiLang === "en" ? cats[i].en : cats[i].zh) || cats[i].zh || cats[i].en || null;
          }
          return null;
        };
        var catCounts = {};
        (skills || []).forEach(function (s) {
          var c = s.category || "other";
          catCounts[c] = (catCounts[c] || 0) + 1;
        });
        // chips follow the registry order; unknown ids (e.g. a category the
        // agent added to the skills map but not to `categories`) trail behind.
        var knownCat = {};
        cats.forEach(function (c) { if (c && c.id) knownCat[c.id] = true; });
        var extraCats = Object.keys(catCounts).filter(function (id) {
          return !knownCat[id] && catCounts[id] > 0;
        });
        var filtered = (skills || []).filter(function (s) {
          if (activeCat !== "all" && (s.category || "other") !== activeCat) return false;
          if (!q) return true;
          var name = (s.name || "").toLowerCase();
          var zhName = (s.zhName || "").toLowerCase();
          var desc = (s.description || "").toLowerCase();
          return name.indexOf(q) !== -1 || zhName.indexOf(q) !== -1 || desc.indexOf(q) !== -1;
        });

        var loading = skills === null && error === null;
        var selectedSkill = selected === null ? null : (skills || []).find(function (s) { return s.name === selected; }) || null;
        var selectedZhName = selected === null ? "" : (selectedSkill ? (selectedSkill.zhName || titleCase(selectedSkill.name)) : titleCase(selected));
        var readmeText = readme === null ? null : (lang === "zh" ? (readme.zh || readme.en || "") : (readme.en || readme.zh || ""));

        function renderCatChip(id, label, count) {
          return React.createElement("button", {
            key: id,
            type: "button",
            className: "sg_cat",
            "data-active": activeCat === id ? "true" : void 0,
            onClick: function () { setActiveCat(id); }
          }, label, React.createElement("span", { className: "sg_catCount" }, String(count)));
        }

        var catRow = (skills || []).length > 0
          ? React.createElement("div", { className: "sg_cats", role: "tablist" },
              [renderCatChip("all", t("cat.all"), (skills || []).length)]
                .concat(cats.filter(function (c) { return c && c.id && catCounts[c.id] > 0; }).map(function (c) {
                  return renderCatChip(c.id, catLabel(c.id) || c.id, catCounts[c.id]);
                }))
                .concat(extraCats.map(function (id) {
                  return renderCatChip(id, catLabel(id) || id, catCounts[id]);
                }))
            )
          : null;

        function renderCard(s) {
          var zhName = s.zhName || titleCase(s.name);
          return React.createElement("article", {
            key: s.name,
            className: "sg_card",
            "data-selected": selected === s.name || void 0,
            onClick: function () { setSelected(s.name); }
          },
            React.createElement("div", { className: "sg_cardHead" },
              React.createElement("span", { className: "sg_name" }, zhName),
              React.createElement("button", {
                type: "button",
                className: "sg_slug",
                title: t("copy.slug", { name: s.name }),
                onClick: function (e) {
                  e.stopPropagation();
                  var text = "/" + s.name;
                  var done = function () { setError(null); setNote(t("copied", { name: s.name })); };
                  if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(text).then(done).catch(function () {
                      setError(t("failed", { message: "clipboard" }));
                    });
                  } else {
                    setError(t("failed", { message: "clipboard" }));
                  }
                }
              }, "/" + s.name),
              s.category && catLabel(s.category) ? React.createElement("span", { className: "sg_catTag" }, catLabel(s.category)) : null,
              s.modelInvocable === false ? React.createElement("span", { className: "sg_userOnly" }, t("userOnly")) : null
            ),
            s.description ? React.createElement("p", { className: "sg_desc" }, s.description) : null,
            React.createElement("button", {
              type: "button",
              className: "sg_use",
              onClick: function (e) {
                e.stopPropagation();
                invoke(s.name);
              }
            }, t("use"))
          );
        }

        var detailPanel = React.createElement("aside", {
          className: "sg_detail",
          "data-open": selected !== null ? "true" : "false"
        },
          React.createElement("div", { className: "sg_detailInner" },
            React.createElement("div", { className: "sg_detailHead" },
              React.createElement("span", { className: "sg_detailTitle" }, selectedZhName),
              React.createElement("button", {
                type: "button",
                className: "sg_lang",
                "data-active": lang === "zh" ? "true" : "false",
                onClick: function () { setLang("zh"); }
              }, "中文"),
              React.createElement("button", {
                type: "button",
                className: "sg_lang",
                "data-active": lang === "en" ? "true" : "false",
                onClick: function () { setLang("en"); }
              }, "EN"),
              React.createElement("button", {
                type: "button",
                className: "sg_detailClose",
                "aria-label": t("close"),
                onClick: function () { setSelected(null); }
              }, "×")
            ),
            React.createElement("div", { className: "sg_detailBody" },
              readmeText === null
                ? React.createElement("p", { className: "sg_note" }, t("detail.loading"))
                : readmeText === ""
                  ? React.createElement("p", { className: "sg_note" }, t("detail.empty"))
                  : React.createElement(MarkdownText, { text: readmeText })
            )
          )
        );

        return React.createElement("div", { className: "sg_overlay", "data-skill-gallery": true },
          React.createElement("header", { className: "sg_header" },
            React.createElement("span", { className: "sg_brand" },
              React.createElement("span", { className: "sg_fox" }, "🦊"),
              React.createElement("span", { className: "sg_title" }, t("title"))
            ),
            React.createElement("span", { className: "sg_subtitle" }, t("subtitle")),
            React.createElement("input", {
              className: "sg_search",
              type: "text",
              placeholder: t("search.placeholder"),
              value: query,
              onChange: function (e) { setQuery(e.target.value); }
            }),
            React.createElement("input", {
              className: "sg_search",
              type: "text",
              placeholder: t("task.placeholder"),
              value: task,
              onChange: function (e) { setTask(e.target.value); }
            }),
            React.createElement("button", { type: "button", className: "sg_close", onClick: close }, t("close"))
          ),
          catRow,
          React.createElement("div", { className: "sg_main" },
            React.createElement("div", { className: "sg_list" },
              error !== null ? React.createElement("p", { className: "sg_error", role: "alert" }, error) : null,
              note !== null ? React.createElement("p", { className: "sg_note", role: "status" }, note) : null,
              install === "installing" ? React.createElement("p", { className: "sg_note" }, t("install.installing")) : null,
              install === "installed" ? React.createElement("p", { className: "sg_note" }, t("install.installed")) : null,
              loading ? React.createElement("p", { className: "sg_note" }, t("loading")) : null,
              !loading && error === null && install !== "installing" && install !== "installed" && (skills || []).length === 0 ? React.createElement("p", { className: "sg_note" }, t("empty")) : null,
              !loading && error === null && (skills || []).length > 0 && filtered.length === 0 ? React.createElement("p", { className: "sg_note" }, q ? t("emptyQuery", { query: query }) : t("emptyCat")) : null,
              filtered.length > 0 ? React.createElement("div", null,
                React.createElement("p", { className: "sg_count" }, t("count", { count: filtered.length })),
                React.createElement("div", { className: "sg_grid" }, filtered.map(renderCard))
              ) : null
            ),
            detailPanel
          )
        );
      }

      ctx.slots.inject("sidebar.footer.action", function () {
        return ctx.slots.register({
          name: "sidebar.footer.action",
          id: "redfox-skill-gallery",
          locale: NS
        }, SidebarButton);
      });

      ctx.slots.inject("shell.overlay", function () {
        return ctx.slots.register({
          name: "shell.overlay",
          id: "redfox-skill-gallery-overlay",
          locale: NS
        }, GalleryOverlay);
      });
    }

    exports.apply = apply;
    exports.inject = inject;
    return module.exports;
  }
});
