---
title: "05 — Prefs & policies"
type: research
tags: [firefox-fork, prefs, staticpreflist, policies, autoconfig]
created: 2026-10-11
updated: 2026-10-11
---

# 05 — Prefs & policies

## 5.1 Default pref data files

| File | Scope |
| ---- | ----- |
| `modules/libpref/init/all.js` | all products (Firefox, Thunderbird, …) |
| `browser/app/profile/firefox.js` | **Firefox desktop** — most new prefs go here |
| `modules/libpref/init/StaticPrefList.yaml` | static prefs (C++-mirrored); see below |
| `mobile/android/app/geckoview-prefs.js` | GeckoView |
| `mail/app/profile/all-thunderbird.js` | Thunderbird (comm-central) |

In **release builds all of these are packaged into `omni.ja`.**

Precedence: factory default → `StaticPrefList` → pref data file. **If a pref is in both
`StaticPrefList.yaml` and `firefox.js`, `firefox.js` wins.** A pref should not be in both
`StaticPrefList.yaml` and `all.js`, but may sensibly be in both `StaticPrefList.yaml` and `firefox.js`.

## 5.2 User prefs

- `prefs.js` — managed by Firefox, rewritten regularly. Do not hand-edit.
- `user.js` — user-created, read-only (Firefox never writes it). Applied once at startup, parent
  process only.
- Both use `user_pref("name", value);` and a *more restrictive* parser than default pref files
  (they are not JS despite the suffix).

## 5.3 Adding a pref in a fork

- **JS-default pref** → append to `browser/app/profile/firefox.js`:
  ```js
  pref("higgs.verticalTabs.enabled", true);
  ```
- **Static pref** → add to `modules/libpref/init/StaticPrefList.yaml`:
  ```yaml
  - name: higgs.some.enabled
    type: bool
    value: true
    mirror: always   # or never / once …
  ```
  Static prefs are exposed to C++ with a defined mirror kind. Use these only if C++ reads them.

Read at runtime: `Services.prefs.getBoolPref("higgs.…", defaultValue)` — always pass a default.

## 5.4 policies.json (enterprise / distribution)

Lives at `<install>/distribution/policies.json`. The `Preferences` policy sets prefs with a
**Status**:

| Status | Behaviour |
| ------ | --------- |
| `default` | appears as default even if factory default differs |
| `locked` | read-only; UI greyed |
| `user` | as if the user set it (persists) |
| `clear` | no effect; resets to factory default each start |

Supported prefixes include `browser.`, `toolkit.legacyUserProfileCustomizations.stylesheets`
(Firefox 95+), `extensions.`, `gfx.`, `network.`, … — a curated allow-list, not every pref.

```json
{ "policies": { "Preferences": {
  "toolkit.legacyUserProfileCustomizations.stylesheets": { "Value": true, "Status": "default" }
} } }
```

## 5.5 AutoConfig (what fx-autoconfig rides on)

Two files, in the **install dir** (Windows: the dir with `firefox.exe`; macOS:
`Firefox.app/Contents/Resources`; Linux: `/usr/lib/firefox`):

1. `defaults/pref/autoconfig.js` (must be LF, must start with a comment):
   ```js
   // autoconfig
   pref("general.config.filename", "config.js");
   pref("general.config.obscure_value", 0);
   ```
2. `config.js` at the install root (must start with a comment on line 1):
   ```js
   // IMPORTANT: start on the 2nd line
   lockPref("browser.shell.checkDefaultBrowser", false);
   ```
Functions: `pref()` (user value, reset each start), `defaultPref()` (default, user-changeable),
`lockPref()` (default + locked), `unlockPref()`.

Centralised mode: `lockPref("autoadmin.global_config_url", "https://…/autoconfig.js")` +
`autoadmin.append_emailaddr`.

### Risks / gotchas

- `config.js` executes with **system principal** — arbitrary code execution surface (Bug 1567628).
  Mozilla sandboxes AutoConfig by default now (a pref must be flipped to run non-pref JS);
  `general.config.sandbox_enabled` controls this. A fork that wants prefs only should keep the
  sandbox on; a fork that wants fx-autoconfig's JS loader has to disable it.
- The `general.config.filename` pref lives in the install dir and is unversioned; on Windows
  **versioned install directories** (FF136+) mean the install root may differ from the versioned
  subdir (see §06).
- LibreWolf ships an `autoconfig-setEnv.patch` to make AutoConfig tolerate `MOZILLA_OFFICIAL`, and
  merges its `librewolf.cfg` into any pre-existing AutoConfig.

## 5.6 For a fork — recommendation

- Move the AutoConfig `pref()` lines into `firefox.js` (path B) → **no AutoConfig dependency, no
  sandbox caveat, prefs are versioned with the tree.**
- Keep `policies.json` in `distribution/` only for genuinely lockable enterprise settings.
- Keep `toolkit.legacyUserProfileCustomizations.stylesheets` **off** in a fork that bakes CSS into
  the tree (it is only needed for profile CSS).

## Sources

firefox-source-docs `modules/libpref` (and `devtools/preferences`), `StaticPrefList.yaml` (searchfox),
`firefox-admin-docs.mozilla.org/reference/policies/preferences`, `support.mozilla.org` AutoConfig,
MIT AutoConfig mirror, Bug 1567628, codeberg librewolf/source patches.
