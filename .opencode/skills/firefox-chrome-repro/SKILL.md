---
name: firefox-chrome-repro
description: Run the theme against a real Firefox window (Xvfb + WM + throwaway profile) to reproduce and diagnose chrome-level bugs, unpack Fx 158's shipped omni.ja sources, and probe chrome JS state with a .uc.js that writes results to a file. Use when a bug involves browser chrome (toolbars, panels, about: pages, status bar), when headless --screenshot cannot show it, or when you need to know what a Firefox version actually ships.
---

# Firefox chrome repro harness

Manual verification only — this repo has no automated UI tests (`tests/` are static analysis).
Everything here writes to `/tmp/opencode`; nothing touches the user's live profile.

## When to use

| Symptom | Use |
| --- | --- |
| Toolbar/panel/popup doesn't open or is mispositioned | `scripts/repro.sh start` + `shot` |
| about:* page layout (about:addons, about:preferences) | headless `--screenshot` is enough |
| Need to know *why* chrome JS bails | `scripts/repro.sh probe` + edit the probe |
| Need the shipped CSS/DOM for a version | `scripts/extract-firefox-source.sh` |

## Commands

```bash
scripts/repro.sh start [url]     # Xvfb :99 + awesome + profile copy + Firefox (bg)
scripts/repro.sh shot /tmp/x.png # full-screen capture of the whole window
scripts/repro.sh sync            # rsync the repo into the throwaway profile's chrome/
scripts/repro.sh stop
scripts/repro.sh probe           # install probe, start, then cat its output
scripts/extract-firefox-source.sh [outdir]   # unpack shipped omni.ja trees
```

`start` prints the log path (`/tmp/opencode/ff.log`, includes chrome `console.*` output).

## Traps that cost real time

1. **Primary-password modal blocks chrome timers.** A copied profile with `key4.db` +
   `logins.json` pops "Please enter your Primary Password" on startup. Chrome JS
   `setTimeout` callbacks in the browser window **do not run** while it is up, so probes look
   like they never fired. `repro.sh` deletes both files; if you build a profile by hand, do the
   same (or click Cancel and wait).
2. **`pkill -f ff-repro` kills your own shell.** The pattern matches the shell's own command
   line, and any path containing the profile name matches too. Run `pkill` alone (never in the
   same command as a path mentioning the profile), or use the bracketed form
   `pkill -f 'ff-r[e]pro'`.
3. **`IOUtils` is no longer importable from a chrome window** in 158
   (`ChromeUtils.importESModule("resource://gre/modules/IOUtils.sys.mjs")` throws). Write files
   with `nsIFileOutputStream`; append is `0x02 | 0x08 | 0x10` (WRITE|CREATE|APPEND) — using
   `0x10 | 0x20` instead yields `NS_ERROR_FILE_NOT_FOUND`.
4. **The profile's `chrome/` is a symlink into the repo.** Adding a probe through it writes into
   the repo (and gets auto-committed). `repro.sh` replaces it with a copy; `sync` re-copies after
   edits.
5. **`--headless --screenshot` only renders content**, no chrome. It is fine for `about:*` pages
   (`firefox --headless --profile … --screenshot out.png about:addons`), useless for toolbars.
6. **Chrome `console.log` goes nowhere by default.** `user_pref("devtools.console.stdout.chrome",
   true)` in the profile's `user.js` (fastcall: `repro.sh` adds it) makes it appear on stdout.
7. **`user.js` may be a read-only Nix symlink.** Replace the symlink with a real file before
   appending prefs.

## Probe pattern

`scripts/probe-chrome.uc.js` is a template: it waits 4 s, snapshots DOM/widget/rect state for a
target element, optionally calls a function under test (`DownloadsPanel.showPanel(true)` is the
worked example), then writes `KEY=value` lines to `/tmp/opencode/probe.txt`. It is installed as
`chrome/JS/zzz_probe.uc.js` — never commit it into `JS/`, where fx-autoconfig would load it into
the user's live browser.

Instrumentation that paid off in practice:

```js
const wrap = (obj, name, tag) => {
  const orig = obj[name];
  obj[name] = function (...a) { w(`CALLED ${tag}`); return orig.apply(this, a); };  // w() appends to the probe file
};
wrap(window.DownloadsPanel, "showPanel", "showPanel");
window.addEventListener("click", e => w(`click target=${e.target.localName}#${e.target.id}`), true);
```

That pair answers "was the handler called" and "did the click even reach the element" — which are
different bugs with identical symptoms.
