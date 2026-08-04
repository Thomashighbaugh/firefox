---
title: "Higgs Boson — Codebase Map"
type: entity
tags: [firefox-theme, architecture, codebase-map, structure]
created: 2026-07-19
updated: 2026-07-28
status: active
---

# Higgs Boson Firefox Theme — Codebase Map

> **Refresh 2026-07-28**: second-sidebar relocated from `JS/second_sidebar/` to `resources/second-sidebar/` with chrome:// URI scheme. File counts refreshed. `userChrome.css` and `userContent.css` are git-tracked symlinks.

Generated: 2026-07-28 | Theme core files: ~243 (excluding `.opencode/` infra)

## Directory Tree (Max Depth 4)

```
/etc/nixos/external/firefox/
├── userChrome.css   → CSS/userChrome.uc.css  (symlink)
├── userContent.css  → CSS/userContent.uc.css (symlink)
├── AGENTS.md                               # Project documentation
├── README.md
│
├── CSS/                (27 files)
│   ├── userChrome.uc.css                   # Per-entrypoint CSS loader (18 @imports)
│   ├── userContent.uc.css                  # Per-entrypoint CSS loader (10 @imports)
│   ├── chrome/            (16 files)       # Browser UI styling
│   ├── common/            (2 files)        # Shared variables + colors
│   └── content/           (7 files)        # Web content page styling
│
├── JS/                 (22 files)
│   ├── AGENTS.md
│   ├── *.uc.js            (18 files)       # Standalone scripts (incl. quick_tabs, tabGroupColorPicker, tabGroupFolderToggle)
│   ├── *.sys.mjs          (2 files)        # System modules (sheet loaders)
│   ├── second_sidebar.uc.mjs              # Main entry for sidebar
│   └── tab_groups/AGENTS.md               # Subsystem docs (see log)
│
├── .documentation/        (16 files)       # Full project docs
├── .github/                               # Funding + README + screenshots
├── resources/             (178 files)
│   ├── icons/             (6 files)        # Branding SVGs/PNGs
│   ├── wallpaper/         (1 file)         # Background
│   ├── texture/           (1 file)         # Noise texture (lightnoise.png)
│   ├── notifications/     (6 files)        # Status bar icons
│   ├── fss/               (0 files)        # Reserved (empty)
│   ├── userChrome.ag.css, userChrome.au.css  # Background/author sheet CSS
│   └── second-sidebar/    (161 files)      # Full sidebar framework (see resources/second-sidebar/AGENTS.md)
│
├── utils/                 (6 files)        # Boot loader + utilities + chrome.manifest
└── .opencode/                             # AI dev infrastructure
```

## File Counts by Extension

| Extension | Count | Type |
|-----------|-------|------|
| `.mjs`    | 156   | ES6 modules (resources/second-sidebar/ bulk) |
| `.md`     | 45    | Documentation (incl. 5 AGENTS.md, 21 research summaries) |
| `.css`    | 27    | Stylesheets (CSS/ + resources/) |
| `.js`     | 20    | Standalone scripts (.uc.js) + doc tooling |
| `.png`    | 9     | Raster assets |
| `.svg`    | 11    | Vector assets |

## Large Files (>200 Lines)

| Lines | File |
|-------|------|
| 1,277 | `JS/allTabsMenuExpansionPack.uc.js` |
| 867   | `JS/second_sidebar/controllers/web_panel.mjs` |
| 838   | `JS/quick_tabs.uc.js` |
| 782   | `JS/second_sidebar/xul/web_panel_popup_edit.mjs` |
| 731   | `JS/rebuild_userChrome.uc.js` |
| 680   | `utils/boot.sys.mjs` |
| 651   | `CSS/chrome/icons.css` |
| 638   | `CSS/content/new-tab.css` |
| 635   | `JS/second_sidebar/controllers/web_panels.mjs` |
| 515   | `CSS/common/colors.css` |
| 512   | `CSS/chrome/tabs.css` |
| 449   | `JS/second_sidebar/xul/base/xul_element.mjs` |

## Items NOT in Root AGENTS.md

- `.documentation/` — 16 files, full project docs
- `CSS/userChrome.uc.css`, `CSS/userContent.uc.css` — root-level CSS loaders
- `CSS/chrome/colors.css` — chrome-specific colors (different from common/colors.css)
- `CSS/chrome/containers.css`, `customization.css`, `linux-support.css`, `window-controls.css`
- `JS/tab-groups-manager.html`, `utils/tab-groups-manager.html`
- `JS/second_sidebar/icons/`, `JS/second_sidebar/patchers/`
- `resources/fss/` — empty directory
- `resources/userChrome.ag.css`, `resources/userChrome.au.css`
- **Case mismatch**: AGENTS.md says `css/` but actual dir is `CSS/`
