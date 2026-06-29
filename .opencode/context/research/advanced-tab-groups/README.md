# Advanced Tab Groups — Zen Browser Mod Research

**Source:** https://github.com/BibekBhusal0/Advanced-Tab-Groups  
**Fetched:** 2026-06-27  
**Stars:** 0 (fork) | **Original:** Vertex-Mods/Advanced-Tab-Groups by 12th

---

## Overview

A single-file userChrome.js mod for **Zen Browser** that enhances tab folders and groups with Arc/Edge-style visual design, icon support, animations, and folder-to-group conversion.

**Author:** 12th (original), BibekBhusal0 (fork maintainer)  
**License:** MIT  
**Target:** Zen Browser  
**Version:** 3.2.0b (beta)

---

## Architecture

### Files

```
advanced-tab-groups.uc.js   -- Main script (single file, ~92% JS)
userChrome.css              -- Styling (~7% CSS)
theme.json                  -- Mod metadata
preferences.json            -- User preferences
README.md                   -- Documentation
image.png                   -- Preview image
```

### Mod Metadata (theme.json)

```json
{
  "id": "advanced-tab-groups",
  "name": "Advanced Tab Groups (BETA)",
  "description": "Tab Groups for Zen Browser",
  "js": true,
  "version": "3.2.0b",
  "tags": ["Zen Browser", "Vertical Tabs", "Tab Groups", "Tab Folders"],
  "fork": ["zen"]
}
```

---

## Features

- **Arc & Edge Styles** -- Visual styling inspired by Arc and Edge browsers
- **Folder to Group Conversion** -- Convert existing tab folders into groups
- **Icon Support** -- Custom icons for tab groups
- **Font Fade Overflow Effect** -- Text overflow handling
- **Renaming** -- Inline group renaming
- **Animations** -- Smooth transitions
- **Stashing** -- Planned feature (soon)

---

## Relevance to Shadowfox

| Aspect | Advanced Tab Groups | Shadowfox |
|--------|---------------------|-----------|
| **Target** | Zen Browser | Firefox (any version) |
| **Approach** | Single .uc.js file | Modular CSS + multiple scripts |
| **Scope** | Tab groups only | Full UI customization |
| **Build** | None (single file) | No build system |
| **Version** | 3.2.0b (beta) | -- |

**Key lessons for Shadowfox:**

1. **Single-file mod** -- This demonstrates that a complex feature (tab groups with Arc/Edge styling, icons, animations) can be implemented in a single `.uc.js` file. Shadowfox's second sidebar system (100+ files) could potentially be more consolidated.

2. **Arc/Edge styling patterns** -- The visual design language from Arc and Edge browsers is directly applicable to Shadowfox's UI goals.

3. **Folder-to-group conversion** -- Converting existing Firefox tab folders into visual groups is a UX pattern Shadowfox could adopt.

4. **Beta versioning** -- The `3.2.0b` version scheme (with `b` suffix for beta) is the same pattern used by the Zen Custom JS publishing workflow.

5. **Fork maintenance** -- This repo is a fork where BibekBhusal0 maintains fixes for the original project. This illustrates the fork maintenance pattern in the Zen Browser mod ecosystem.
