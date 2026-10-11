---
title: "09 — Security & pitfalls"
type: research
tags: [firefox-fork, security, autoconfig, signing, pitfalls]
created: 2026-10-11
updated: 2026-10-11
---

# 09 — Security & pitfalls

## 9.1 AutoConfig is a system-principal code-execution surface

`general.config.filename` names a JS file executed **with system privileges at startup**
(Bug 1567628). Mozilla's plan was to sandbox AutoConfig so it can only flip prefs; today it is
*"sandboxed by default (you have to flip a pref)"* — `general.config.sandbox_enabled`. Consequences:

- A fork that only wants prefs should leave the sandbox on.
- A fork that wants fx-autoconfig's JS loader (`boot.sys.mjs`) must disable it, inheriting the risk.
- fx-autoconfig's own README warns that any process able to write `boot.sys.mjs` or a script file
  gets arbitrary code execution without elevation.
- `nsIStyleSheetService` / `Services.scriptloader` from such a context run privileged code too.

**Mitigation for a fork:** move prefs to `firefox.js` and JS to a compiled-in `.sys.mjs` (§04/§05),
eliminating AutoConfig entirely. LibreWolf keeps AutoConfig but patches it (`autoconfig-setEnv.patch`)
and confines it to prefs.

## 9.2 Sandbox prefs/env (dev vs ship)

- Env: `MOZ_DISABLE_CONTENT_SANDBOX`, `MOZ_DISABLE_GMP_SANDBOX`, `MOZ_DISABLE_RDD_SANDBOX`,
  `MOZ_DISABLE_GPU_SANDBOX`, `MOZ_DISABLE_SOCKET_PROCESS_SANDBOX`, `MOZ_SANDBOX_LOGGING=1`.
- Disabling the content sandbox makes Firefox show a **non-dismissable "security sandbox is
  disabled"** banner. Dev only.
- Build flags `--disable-sandbox` / `--disable-content-sandbox` exist but shouldn't ship.

## 9.3 Signing, updates, channel

A shippable fork needs `browser/branding/<name>/`, an update channel + update server, and code
signing (Windows Authenticode, macOS notarisation). Floorp: Certum Open Source code-signing cert
+ Apple notarisation + auto-update. Extension signing (`xpinstall.signatures.required`) blocks
unsigned add-ons except on ESR/`dev-edition`. None of this affects theming, but it blocks "ship it".

## 9.4 Pitfalls catalogue

| Pitfall | Detail |
| ------- | ------ |
| **`omni.ja` is not hand-editable** | Read-only inspection via `unzip` (expect a bad-central-directory warning). Edit source, let `mach` repack. |
| **Untracked file = not packaged** | Anything not in a `jar.mn` won't be in `omni.ja`. |
| **Author origin isn't absolute** | Firefox sometimes ships `!important` (e.g. `*|*[hidden]{display:none!important}`). Rare, but budget for it. |
| **Artifact-build fragility** | Any mismatch between local source and downloaded binaries can cause crashes / XPCOM init failures. Keep the tree clean; don't hand-edit objdir. |
| **Versioned install dirs (Win FF136+)** | Tools writing to the install dir (AutoConfig, branding) must resolve Single vs Versioned. |
| **Nova / redesign gates** | Many FF157+ layout changes sit behind `@media -moz-pref("browser.nova.enabled")` / `browser.nova.enabled`. A fork controls the default — pin it to freeze the old UI (this machine has Nova off). |
| **Pref duplicated in StaticPrefList + all.js** | Not allowed; use `StaticPrefList` + `firefox.js` instead. |
| **AutoConfig path** | `general.config.filename` must resolve from the install root; must be LF; file must start with a comment; `obscure_value` default is 13 (ROT13) so set it to 0. |
| **`mach build faster` scope** | Only JS/CSS/assets. Any C++/Rust/`moz.build`/WebIDL change needs a real build. |
| **`user.js` is read-only** | Firefox never writes it; `prefs.js` is managed and overwritten — never hand-edit `prefs.js`. |
| **Localisation** | New user-visible strings must go through Fluent + `[localization]` `jar.mn`, or the fork is English-only-broken. |

## 9.5 Origin summary (the one line to remember)

> Profile CSS and AutoConfig-injected CSS are **user** origin and need `!important` to beat
> Firefox's own **author** CSS. CSS compiled into the tree is **author** origin and wins for free.
> That is the whole reason to embed.

## Sources

Bug 1567628; firefox-admin-docs policies; MozillaWiki Security/Sandbox; `security.sandbox.*` prefs;
firefox-source-docs artifact_builds (restrictions), installation_dir_layout; fx-autoconfig README.
