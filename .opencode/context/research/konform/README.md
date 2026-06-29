# Konform Browser — Firefox Fork Research

**Source:** https://codeberg.org/konform-browser/source  
**Fetched:** 2026-06-27  
**Platform:** Codeberg (Forgejo)

---

## Overview

Konform Browser is a **patched build and custom configuration of Mozilla Firefox ESR** (Extended Support Release), originally forked from LibreWolf. It aims to promote user freedom, security, privacy, and anonymity — suitable for daily browsing and targeted deployments in secure/airgapped environments.

**Key stats:** 1,674 commits, 22 branches, 88 tags, 44 MiB, 57 releases. Based on Firefox 140.12.0esr (as of 2026-06-11).

---

## Architecture

### Build System

Konform is a **source-level fork** — it patches Firefox's source tree and rebuilds from source. The repository contains:

- **Patches** (`patches/`) — ~30+ patch files modifying Firefox internals
- **Theming** (`themes/`) — CSS/SCSS overrides for browser chrome
- **Branding** (`browser/branding/`) — Custom logo, icons, about: pages
- **Components** (`browser/components/`) — Custom UI components (welcome screen, preferences)
- **Config** (`config/`) — Build configuration
- **Settings** (separate repo) — `librewolf.cfg` and `policies.json` for runtime preferences
- **Build scripts** — `Makefile`, `scripts/`, `ffbuild/`

### Build Process

```bash
# From source tarball:
make bootstrap setup-wasi   # one-time bootstrap
./mach build                # build Firefox
./mach package              # package for distribution
./mach run                  # run directly

# From this repo:
git clone --recursive https://codeberg.org/konform-browser/source.git
make dir                    # build source tarball
# then follow tarball instructions
```

### Patch Categories

From the API listing, patches are organized into directories:

| Directory | Purpose |
|-----------|---------|
| `patches/kon/` | Konform-specific patches |
| `patches/mb/` | Mullvad Browser backports |
| `patches/tb/` | Tor Browser backports |
| `patches/wf/` | Waterfox backports |
| `patches/moz-backports/` | Mozilla security fixes backported to ESR |
| `patches/sed-patches/` | Simple sed-based patches |
| `patches/ui-patches/` | UI/UX patches |

Individual patches include: `allow-JXL-in-non-nightly-browser`, `allow-ubo-private-mode`, `bootstrap`, `context-menu`, `custom-ubo-assets-bootstrap-location`, `dbus_name`, `disable-data-reporting-at-compile-time`, `firefox-in-ua`, `flatpak-autoconf`, `fullpage-translations`, `fullpage-translations-customization`, `hide-passwordmgr`, `moz-configure`, `mozilla_dirs`, `packaging-extras`, `rs-blocker`, `rust-gentoo-musl`, `urlbarprovider-interventions`, `windows-theming-bug`.

---

## Key Differences from LibreWolf

### ESR vs Rapid Release
- **Konform:** Based on Firefox ESR (Extended Support Release) — less update churn, delayed features, but up-to-date security fixes
- **LibreWolf:** Based on Firefox RR (Rapid Release) — newest features, more frequent updates

### RemoteSettings
- **Konform:** RemoteSettings completely disabled by default — no download/sync of settings, search engines, or AI models at runtime
- **LibreWolf:** More permissive with RemoteSettings

### Welcome Screen
Konform has a custom `about:welcome` with 4 preset switcher options:
1. **Purely Private 🔒** — Disables all external integrations and opaque binary blobs
2. **Core Security 🛡️** — Enables low-risk optional features and security updates (PSL, CRLite)
3. **Basic Functionality ✳️** — Enables WebGPU, local ML, keeps risky integrations off
4. **Just Make It Work 🦊** — Closest to Firefox defaults, unlocks RemoteSettings

### Bundled Extensions
- **LibreWolf:** Downloads uBlock Origin from Mozilla Addons on first run
- **Konform:** Does NOT download any extension. Auto-detects system-installed addons: uBlock Origin, No-Script, Privacy Badger

### Privacy Strengthening
- Disable cross-origin referer by default
- Enable letterboxing by default if ResistFingerPrinting is enabled
- Disable OCSP validation (uses CRLite instead)
- New pref: `privacy.resistFingerprinting.allowTheming` (default `true`) — allows themes with RFP enabled
- User-configurable Firefox Sync endpoints (self-hosted)
- User-configurable HTTP Referer spoofing
- Dynamic light/dark theme depending on system preferences
- Multi-Account Containers Lite pre-enabled
- Bundled fonts matching Tor Browser and Mullvad Browser (font enumeration protection)

### Other Features
- `about:translation` and `about:inference` for direct access to translation and ML
- Management UI for ML models, custom models from HuggingFace
- Link Preview feature configurable with local ML models
- Reskinned logo and privacy-purple color scheme
- Ported bug/security fixes from Tor Browser

---

## Relevance to Shadowfox

| Aspect | Konform | Shadowfox |
|--------|---------|-----------|
| **Approach** | Source-level fork (patches Firefox source) | CSS + userChrome.js overlay |
| **Scope** | Full browser build (privacy, security, UI) | UI customization only |
| **Build** | `./mach build` (full Firefox compilation) | No build system |
| **Patches** | Modifies Firefox internals at compile time | Runtime CSS/JS overrides |
| **Theming** | CSS/SCSS in Firefox source tree | CSS in profile's `chrome/` directory |
| **ESR** | Based on Firefox ESR | Works with any Firefox version |

**Key lessons for Shadowfox:**

1. **ESR stability** — Konform's choice of ESR over RR is relevant. If Shadowfox targets ESR, the chrome API is more stable and changes less frequently between releases.

2. **RemoteSettings disable** — Konform's approach to disabling RemoteSettings entirely (no runtime downloads of settings, search engines, AI models) is a strong privacy stance that Shadowfox could adopt via `user.js` or `policies.json`.

3. **Preset switcher** — The `about:welcome` preset system (Purely Private → Just Make It Work) is a user-friendly way to let users choose their privacy/functionality tradeoff. Shadowfox could offer a similar preset system for UI density/visibility.

4. **Font bundling** — Bundling Tor Browser fonts for fingerprinting protection is a pattern Shadowfox could adopt.

5. **Patch organization** — Konform's patch directory structure (by source: `tb/`, `mb/`, `wf/`, `kon/`) is a clean way to track where patches come from. Shadowfox could use a similar approach for its CSS/JS modules.

6. **System extension detection** — Auto-detecting system-installed extensions instead of downloading them is a privacy-respecting pattern.

---

## Platform Support

- **Linux:** Primary target (AUR, Alpine, .deb/.rpm via bsys6)
- **Docker/Podman:** OCI container image available
- **Android:** "Hopefully one day" — contributions welcome
- **macOS/Windows:** Explicitly not supported — "supporting these targets at the expense of others would not align with project goals"
- **BSD/musl:** Contributions appreciated
