# Mercury Browser — Firefox Fork Research

**Source:** https://github.com/Alex313031/Mercury  
**Fetched:** 2026-06-27  
**Stars:** 1,500 | **Forks:** 40 | **Commits:** 349 | **Releases:** 15 (latest v129.0.2, Sep 2024)

---

## Overview

Mercury is a **Firefox fork** focused on compiler optimizations (AVX, AES, LTO, PGO) and patches aggregated from LibreWolf, Waterfox, Ghostery, BetterFox, and GNU IceCat. It aims to be the Firefox equivalent of the author's main project: Thorium (a Chromium fork).

**Author:** Alex313031  
**License:** MPL-2.0  
**Website:** https://thorium.rocks/mercury  
**Target:** Firefox ~v129 (last release Sep 2024 — appears dormant)

---

## Architecture

### Build System

Mercury uses shell scripts for the build process:

```bash
./bootstrap.sh    # Bootstrap build environment
./setup.sh        # Setup source tree
./build.sh        # Build Firefox
./package.sh      # Package for distribution
./make_deb.sh     # Create .deb package
./run.sh          # Run the built binary
./revert.sh       # Revert patches
./tot.sh          # Update to tip-of-tree
```

### Repo Layout

```
app/               # Application-level changes
browser/           # Browser UI changes
build/             # Build configuration
devtools/          # Devtools theming
dist/              # Distribution files
docs/              # Documentation (PATCHES.md, BUILDING.md, BUGS.md, DEBUGGING.md)
extensions/        # Extension changes
infra/             # Infrastructure
logos/             # Branding assets
mozconfigs/        # Build configuration per platform
netwerk/           # Network layer changes
policies/          # Firefox policies
portable/          # Portable build support
toolkit/           # Toolkit-level changes
```

---

## Patches

Mercury aggregates patches from multiple sources:

| Source | Patches |
|--------|---------|
| **LibreWolf** | UI patches, JXL support, Windows theming fix |
| **Waterfox** | Various patches |
| **Ghostery** | Ghostery theme patch |
| **BetterFox** | Performance tweaks |
| **GNU IceCat** | Privacy patches |
| **Custom** | Written from scratch by the author |

### Key Modifications

- **Compiler optimizations** — AVX, AES, LTO, PGO enabled
- **Telemetry** — All telemetry and reporting disabled
- **Hardening** — Debugging constructs removed, hardening enabled by default
- **Backspace** — Backspace to go back enabled
- **GPU acceleration** — Enabled by default
- **Privacy** — Do Not Track and Global Privacy Control enabled
- **Pocket** — Disabled, along with highlights and suggested content on new tab
- **UI** — Top bar restored to ~ESR78 state with home button and developer button
- **Extensions** — Allow installing unsigned extensions
- **Branding** — Custom branding
- **JPEG XL** — Enabled by default
- **Performance** — BetterFox performance tweaks implemented

---

## Relevance to Shadowfox

| Aspect | Mercury | Shadowfox |
|--------|---------|-----------|
| **Approach** | Firefox source fork (compiled-in) | CSS + userChrome.js overlay |
| **Focus** | Compiler optimizations + privacy patches | UI customization |
| **Build** | Shell scripts + mach | No build system |
| **Patches** | Aggregated from LibreWolf, Waterfox, etc. | CSS/JS overrides |
| **Target** | Firefox ~v129 (appears dormant) | Any Firefox version |
| **Stars** | 1,500 | — |

**Key lessons for Shadowfox:**

1. **Compiler optimization focus** — Mercury's primary differentiator is compiler flags (AVX, AES, LTO, PGO). This is a fundamentally different approach from Shadowfox's UI overlay — it makes Firefox faster at the binary level rather than changing how it looks.

2. **Patch aggregation** — Mercury pulls patches from multiple forks (LibreWolf, Waterfox, Ghostery, IceCat). This is a pragmatic approach: don't reinvent the wheel, just collect the best patches from everywhere. Shadowfox could adopt a similar philosophy for its CSS/JS modules.

3. **Dormant project** — Last release was Sep 2024 (v129.0.2). This illustrates the maintenance burden of source-level forks — they require constant rebasing against upstream Firefox changes.

4. **Simple build system** — Uses shell scripts rather than Nix flakes (unlike Gjoa). Simpler but less reproducible.

5. **BetterFox integration** — Mercury implements performance tweaks from BetterFox (a popular `user.js` configuration project). This is the closest link to Shadowfox's approach — BetterFox is a configuration overlay, not a source fork.

---

## Comparison: Firefox Fork Landscape

| Project | Approach | Focus | Build | Stars | Status |
|---------|----------|-------|-------|-------|--------|
| **Mercury** | Source fork | Compiler optimizations + privacy | Shell scripts | 1,500 | Dormant (v129) |
| **Konform** | Source fork (ESR) | Privacy + security | Makefile + mach | ~25 | Active (FF 140esr) |
| **Gjoa** | Source fork | Native power-user features | Nix + mach | 5 | Active (v0.4.0) |
| **LibreWolf** | Source fork | Privacy | Makefile + mach | Many | Active |
| **Palefox** | Userscript bundle | Tree tabs + vim | Bun -> .uc.js | 70 | Superseded by Gjoa |
| **uc.css.js** | CSS + JS overlay | Dark theme + scripts | None | 379 | Active (Nightly) |
| **Shadowfox** | CSS + JS overlay | UI customization | None | — | Active |
