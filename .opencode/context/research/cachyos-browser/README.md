# CachyOS Browser — Firefox Fork Research

**Source:** https://github.com/CachyOS/CachyOS-Browser-Common  
**Fetched:** 2026-06-27  
**Stars:** 16 | **Forks:** 7 | **Commits:** 314

---

## Overview

CachyOS Browser is a **Firefox fork** maintained by the CachyOS Linux distribution team. It's a LibreWolf-based fork focused on compiler optimizations (mold linker, `-march=native`, LTO, PGO) and privacy patches, packaged for the CachyOS ecosystem.

**Author:** CachyOS team  
**License:** MPL-2.0  
**Target:** CachyOS Linux (Arch-based)

---

## Architecture

### Repo Layout

```
patches/                     -- Firefox source patches
├── about-dialog.patch       -- Custom about dialog
├── add-mold-linker.patch    -- Add mold linker support
├── browser-confvars.patch   -- Browser configuration variables
├── dbus_name.patch          -- D-Bus name customization
├── devtools-bypass.patch    -- Devtools bypass
├── fix-psutil.patch         -- psutil fix
├── fix-psutil-dev.patch     -- psutil dev fix
├── glibc236.patch           -- glibc 2.36 compatibility
├── moz-configure.patch      -- Mozilla configure
├── mozilla_dirs.patch       -- Mozilla directories
├── rust163.patch            -- Rust 1.63 compatibility (68KB)
├── sanitizing-description.patch
├── use-mcpu-native-with-lto-pgo.patch  -- -march=native + LTO + PGO
├── zstandard-0.18.0.patch   -- zstd compatibility
├── lw-logo-devtools-cachy.patch  -- CachyOS branding in devtools (16KB)
├── lw-cachy-logo-devtools.patch   -- Root-level branding patch
├── gentoo/                  -- Gentoo-specific patches
├── kde/                     -- KDE integration patches
├── librewolf/               -- LibreWolf patch imports
├── librewolf-ui/            -- LibreWolf UI patches
├── pref-pane/               -- Preference pane patches
├── sed-patches/             -- Simple sed-based patches
├── unity_kde/               -- Unity/KDE integration
├── librewolf-patchset.txt   -- LibreWolf patch manifest (empty)
│
source_files/                -- Custom source files
├── browser/                 -- Browser-level source overrides
├── search-config.json       -- Custom search engine config
│
helpers/
├── tridactyl-install.sh     -- Tridactyl Vim extension installer
│
apply-patches.py             -- Patch application script
manage-librewolf-patchlist.py -- LibreWolf patch list manager
rebase-patches.sh            -- Patch rebasing script
test-patches.sh              -- Patch testing script
update-patches.sh            -- Patch update script
update-gentoo-patchset.sh    -- Gentoo patch set updater
rename-files.py              -- File renaming utility
gentoo-patch-blacklist.txt   -- Gentoo patch blacklist
category-cachy-browser.svg   -- App category icon
```

### Patch Categories

| Category | Patches | Purpose |
|----------|---------|---------|
| **Compiler** | `use-mcpu-native-with-lto-pgo`, `add-mold-linker` | Performance via aggressive compiler flags |
| **Compatibility** | `glibc236`, `rust163`, `zstandard-0.18.0`, `fix-psutil` | Build fixes for newer/older toolchains |
| **Branding** | `about-dialog`, `lw-logo-devtools-cachy`, `browser-confvars` | CachyOS identity |
| **Privacy** | `librewolf/` (imported) | LibreWolf privacy patches |
| **Desktop** | `kde/`, `unity_kde/` | Desktop environment integration |
| **Infrastructure** | `dbus_name`, `mozilla_dirs`, `moz-configure` | Build system customization |

---

## Key Features

- **mold linker** -- Fast modern linker for faster builds
- **`-march=native` + LTO + PGO** -- Aggressive CPU-specific optimization
- **LibreWolf patches** -- Privacy and security patches imported from LibreWolf
- **Tridactyl pre-installed** -- Vim-style browser navigation via helper script
- **Custom search config** -- CachyOS-specific search engines
- **KDE/Unity integration** -- Desktop environment-specific patches
- **Gentoo compatibility** -- Separate patch set for Gentoo-based builds

---

## Relevance to Shadowfox

| Aspect | CachyOS Browser | Shadowfox |
|--------|-----------------|-----------|
| **Approach** | LibreWolf-based source fork | CSS + userChrome.js overlay |
| **Focus** | Compiler optimization + privacy | UI customization |
| **Build** | Python scripts + mach | No build system |
| **Patches** | LibreWolf imports + custom | CSS/JS overrides |
| **Target** | CachyOS Linux | Any Firefox version |
| **Stars** | 16 | -- |

**Key lessons for Shadowfox:**

1. **LibreWolf as base** -- CachyOS Browser is built on LibreWolf, inheriting its privacy patches. This is a common pattern: fork LibreWolf, add your own patches on top.

2. **mold linker** -- The `add-mold-linker.patch` enables the mold linker for faster Firefox builds. This is a build-time optimization, not a runtime one.

3. **`-march=native` + LTO + PGO** -- Same aggressive compiler optimization approach as Mercury and Gjoa. This is the standard pattern for performance-focused Firefox forks.

4. **Tridactyl integration** -- The `tridactyl-install.sh` helper pre-installs the Tridactyl Vim extension. This is a lighter approach than Gjoa's native vim layer -- just bundle an extension.

5. **Patch organization** -- Patches organized by source (librewolf/, gentoo/, kde/) and by type (sed-patches/, pref-pane/). Same pattern as Konform.

6. **Distribution-specific** -- CachyOS Browser is tied to a specific Linux distribution. This is the narrowest target in the research set.
