# Glide Browser — Reference

**Source:** https://github.com/glide-browser/glide  
**Date consumed:** 2026-06-27  
**Branch:** main (Firefox 153.0b1-based)  
**Stars:** 1.4k | **Forks:** 41  
**License:** MPL-2.0

---

## Overview

**Glide** is an extensible, keyboard-focused web browser built as a Firefox fork. It layers a complete custom UI and interaction model on top of Firefox's engine while maintaining WebExtensions API compatibility.

**Website:** https://glide-browser.app  
**Download:** https://glide-browser.app/#download  
**Community:** https://glide.zulipchat.com  
**Documentation:** https://glide-browser.app

---

## Key Features

- **Keyboard navigation** via link hints (Vimium-style)
- **Modal-based keymaps** — different modes for different contexts
- **TypeScript config** — user configuration is written in TypeScript
- **WebExtensions API support** — compatible with standard Firefox extensions
- **Fuzzy tab manager** — `<space><space>` to fuzzy-search tabs
- **Site-specific settings/keymaps** — per-domain overrides
- **Gemini protocol support** — built-in Gemini browser
- **NixOS build** — flake-based development environment

---

## Repository Structure

### `firefox.json` — Release Configuration

```json
{
  "name": "Glide Browser",
  "binary_name": "glide",
  "version": {
    "product": "firefox-dev",
    "tag": "FIREFOX_153_0b1_RELEASE",
    "version": "153.0b1"
  },
  "brands": {
    "glide": {
      "release": {
        "display_version": "0.1.62a",
        "github": { "repo": "glide-browser/glide" }
      }
    }
  }
}
```

Based on Firefox Developer Edition 153.0b1. Glide's own semver is 0.1.62a (29 releases).

---

### `src/` Directory — Firefox Source Overlay

The `src/` directory overlays custom files into the Firefox source tree at build time:

| Directory | Purpose |
|-----------|---------|
| `src/browser/actors/` | Custom JSWindowActor classes (content↔chrome IPC) |
| `src/browser/app/profile/` | Firefox preferences/configuration overrides |
| `src/browser/base/content/` | Browser chrome XUL/HTML overlay |
| `src/browser/components/` | Custom browser components |
| `src/browser/extensions/` | Extension system modifications |
| `src/browser/installer/` | Installer configuration |
| `src/browser/locales/` | Localization (en-US) |
| `src/browser/themes/shared/` | Shared theme CSS |
| `src/browser/confvars-sh.patch` | Build config patch |
| `src/browser/moz-configure.patch` | Configure patch |
| **`src/glide/`** | **Main Glide customization layer** |
| `src/glide/browser/actors/` | Glide-specific JSWindowActors |
| `src/glide/browser/base/` | Glide browser chrome (XUL/JS/CSS) |
| `src/glide/browser/components/` | Glide browser components |
| `src/glide/cpp/` | Glide C++ code (XPCOM components) |
| `src/glide/docs/` | Documentation site source |
| `src/glide/generated/` | Auto-generated bindings |
| `src/glide/toolkit/content/` | Toolkit-level content customization |
| `src/glide/chrome.manifest` | Chrome registration |
| `src/glide/moz.build` | Build system integration |
| `src/build/` | Build system modifications |
| `src/devtools/` | DevTools customization |
| `src/layout/base/` | Layout engine patches |
| `src/layout/generic/` | Generic frame patches |
| `src/mobile/` | Mobile support |
| `src/modules/libpref/` | Preference system patches |
| `src/netwerk/` | Networking patches |
| `src/python/mach/mach/` | Mach command additions |
| `src/security/mac/hardenedruntime/` | macOS hardened runtime |
| `src/services/settings/dumps/` | Remote settings dumps |
| `src/testing/` | Test infrastructure |
| `src/toolkit/` | Toolkit-level patches |
| `src/tools/` | Tools patches |
| `src/moz-build.patch` | Root build system patch |

---

### `scripts/` — Build & Dev Tooling

Built with TypeScript (`tsn` / `ts-blank-space`). Key scripts:

| Script | Purpose |
|--------|---------|
| `bootstrap.mts` | Bootstrap development environment |
| `dev.mts` | Watch mode dev server |
| `build.mts` | Full Firefox build |
| `package.mts` | Create distributable package |
| `bundle.mts` | Bundle final artifacts |
| `lint.mts` | Run linters (oxlint) |
| `check-types.mts` | TypeScript type checking |
| `firefox/download.mts` | Download Firefox source |
| `firefox/patch.mts` | Apply patches to Firefox source |
| `firefox/export.mts` | Export patches |
| `firefox/version.mts` | Manage Firefox version |
| `generate-types.mts` | Generate TypeScript types from Firefox internals |
| `build-docs.mts` | Build documentation site |
| `build-api-reference.mts` | Generate API reference |

### `configs/` — Configuration files
### `patches/` — Firefox source patches
### `infra/` — CI infrastructure
### `@types/` — TypeScript type declarations

---

### Build System

**Language split:** 86.8% TypeScript, 3.9% JavaScript, 3.8% CSS, 3.5% HTML, 0.7% Nix

**Package manager:** pnpm 10.17.0 (workspace monorepo)

**Toolchain:**
- **Formatter:** dprint
- **Linter:** oxlint (with oxlint-tsgolint, eslint-plugin-mozilla)
- **TypeScript checker:** tsc
- **Bundler:** esbuild (for TypeScript → JS for Firefox)
- **Key deps:** dioscuri (likely UI toolkit), shiki (syntax highlighting), pagefind (docs search), ts-morph (code generation)

**Nix flake** (`flake.nix`): Full dev shell with LLVM toolchain, system dependencies (GTK3, libpulseaudio, NSS 3.125+), WASM sysroot for RLBox sandboxing, and `sccache` for build caching.

---

## Architecture Highlights

### TypeScript-First Development

Glide writes Firefox chrome JS in TypeScript, transpiling via `ts-blank-space` (strips types without changing line numbers) and `esbuild`. This means:
- Firefox chrome code benefits from full TypeScript type checking
- Type declarations are generated from Firefox IDL files
- JSDoc references to `third_party/dothq/gecko-types` for Firefox internal types

### Patch-Based Firefox Overlay

Rather than maintaining a full fork, Glide overlays files into the Firefox source tree:
1. Firefox source is downloaded and extracted
2. Patches from `patches/` are applied
3. Files from `src/` are copied over to override Firefox originals
4. Build proceeds via `mach`

### Keyboard-First Interaction Model

The browser's defining feature is its modal keymap system — different keyboard shortcuts apply in different modes (normal mode, insert mode, hint mode, etc.), inspired by Vim/Emacs but configurable in TypeScript.

### Site-Specific Overrides

Users can set per-domain preferences and keymaps — a feature that requires deep Firefox integration, likely patching the preference system in `src/modules/libpref/`.

---

## Comparison with Higgs Boson Theme

| Aspect | Glide Browser | Higgs Boson (this project) |
|--------|--------------|---------------------------|
| **Approach** | Full Firefox fork | UserChrome.js + CSS overlay |
| **Build system** | Nix flake, mach, TypeScript toolchain | No build system |
| **UI customization** | Replaces browser chrome entirely | CSS overrides + JS scripts |
| **Sidebar** | Likely custom (keyboard-focused) | Advanced Vivaldi-style second sidebar |
| **Configuration** | TypeScript config file | CSS variables + uc.js scripts |
| **Firefox version** | 153.0b1 (Developer Edition) | 100+ (stable, ESR, beta, nightly) |
| **Key differentiator** | Keyboard-first, extensible via TS config | Visual customization, web panels |
| **Installation** | Standalone browser binary | Chrome profile overlay |
| **Language** | 87% TypeScript | CSS + JS (ES modules) |

Glide represents the "deep fork" approach to Firefox customization, while Higgs Boson takes the "overlay" approach. Both share similar interests in custom browser UI, but at fundamentally different levels of the stack.

---

## Key Insights for Higgs Boson Development

1. **Glide's actor system** shows how a Firefox fork handles content↔chrome IPC — relevant for understanding how our JS scripts might interact with Fission content processes.
2. **TypeScript in Firefox chrome** is proven viable via `ts-blank-space` — something that could be adopted for the second sidebar module.
3. **Glide's Nix flake** provides a reference for NixOS-based Firefox development workflows.
4. **Keyboard hint mode** is a feature that could be worth studying for potential integration.
