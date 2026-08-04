# UserChrome.js Feature Brainstorm

**Method:** brainstorm
**Topic:** Useful userChrome.js features for power-user Firefox
**Status:** backlog
**Created:** 2026-07-11

## Top 5 Recommendations (Impact × Feasibility)

| Rank | Feature | Impact | Complexity | Why |
|------|---------|--------|------------|-----|
| ⭐1 | **Command Palette** | 🔥🔥🔥🔥🔥 | Medium | Transforms browser UX, Vivaldi's killer feature |
| ⭐2 | **Tab Search/Filter** | 🔥🔥🔥🔥 | Low-Medium | Solves real pain for heavy tab users |
| ⭐3 | **URL Cleaner** | 🔥🔥🔥 | Low | Every copy/paste benefits, simple to implement |
| ⭐4 | **Temporary Container** | 🔥🔥🔥🔥 | Medium | Unique capability, privacy win |
| ⭐5 | **Tab Snooze** | 🔥🔥🔥 | Low-Medium | Novel, no extension replicates well |

---

## Theme A: Tab Management Power Tools

| # | Idea | Why It Matters |
|---|------|----------------|
| 1 | **Tab Session Manager** — Save/restore tab sets with names, not just "reopen last session" | Firefox's built-in session restore is all-or-nothing |
| 2 | **Tab Search/Filter Bar** — Ctrl+Shift+F to fuzzy-search all open tabs by title/URL | Essential with 50+ tabs |
| 3 | **Tab Preview on Hover** — Thumbnail popup when hovering a tab | Visual orientation in dense tab bars |
| 4 | **Duplicate Tab Finder** — Highlight/close duplicate tabs by URL | Tab hoarder's best friend |
| 5 | **Tab Color by Domain** — Auto-color tabs based on domain (red for prod, green for dev) | Visual grouping without containers |
| 6 | **Tab Snooze** — Hide a tab and bring it back at a specified time | "I'll read this later" workflow |
| 7 | **Tab Mute All Except Active** — One-click mute everything but current | Meeting/demo mode |
| 8 | **Tab Cyclic Order** — Reorder tabs by last-accessed time (MRU) | Alternative to LRU tab ordering |

## Theme B: URL & Navigation Smarts

| # | Idea | Why It Matters |
|---|------|----------------|
| 9 | **URL Copy as Markdown** — `[title](url)` format to clipboard | Writer/researcher workflow |
| 10 | **URL Cleaner** — Strip tracking params (`?utm_*`, `fbclid`, etc.) | Privacy + cleaner bookmarks |
| 11 | **QR Code Generator** — QR for current page URL | Phone-to-desktop sharing |
| 12 | **Search Engine Quick Switcher** — Popup to pick search engine for current query | Power search workflow |
| 13 | **Readability Mode Quick Toggle** — Button to toggle reader mode with keyboard | Reading-heavy workflows |
| 14 | **Go to Tab by URL** — Type partial URL, jump to existing tab instead of opening new one | Prevents duplicate tabs |

## Theme C: Vivaldi-Style Power Features

| # | Idea | Why It Matters |
|---|------|----------------|
| 15 | **Command Palette** — Ctrl+Shift+P, type to execute any Firefox action | Keyboard-driven navigation |
| 16 | **Quick Notes Panel** — Sidebar panel with plaintext scratchpad | Note-taking without leaving browser |
| 17 | **Clipboard Manager** — Last 10 clipboard items accessible via popup | Power copy-paste |
| 18 | **Screenshot Tool Enhancements** — Full-page screenshot, auto-save to folder, copy to clipboard | Better than built-in |
| 19 | **Page Translation Quick Toggle** — One-click translate with language auto-detect | Multilingual browsing |
| 20 | **Link Collector** — Accumulate links in a sidebar list, export as markdown list | Research workflow |
| 21 | **Workspaces** — Named sets of tabs you can switch between (like Vivaldi) | Context switching |

## Theme D: Privacy & Security

| # | Idea | Why It Matters |
|---|------|----------------|
| 22 | **Container Tab Quick Switcher** — Right-click tab → switch container without reloading | Multi-account workflow |
| 23 | **Temporary Container** — Open link in ephemeral container that self-destructs | One-off logins |
| 24 | **Per-Site Cookie Cleaner** — Button to clear cookies for current domain only | Privacy without losing all sessions |
| 25 | **URL Sanitizer** — Auto-strip tracking on copy or navigation | Always-on privacy |
| 26 | **Security Header Inspector** — Popup showing CSP/HSTS/headers for current page | Dev + security audit |

## Theme E: UX Polish

| # | Idea | Why It Matters |
|---|------|----------------|
| 27 | **Custom Keyboard Shortcuts** — Remap any Firefox action via config | Power user ergonomics |
| 28 | **Mouse Gestures** — Hold right-click + draw to navigate/close/reload | Efficiency |
| 29 | **Scrollable Tabs** — Mouse wheel on tab bar scrolls through tabs | Dense tab navigation |
| 30 | **Auto-Hide Bookmarks Bar** — Show only on new tab, hide on navigation | Screen space |
| 31 | **Dynamic Theme** — Auto-switch dark/light based on time or site | Eye comfort |
| 32 | **Tab Loading Progress** — Visual progress indicator on tab (not just URL bar) | At-a-glance loading status |
| 33 | **Window Tiler** — Tile multiple Firefox windows in grid layouts | Multi-monitor workflow |

## Theme F: Developer Tools

| # | Idea | Why It Matters |
|---|------|----------------|
| 34 | **CSS Live Editor** — Edit page CSS in a sidebar panel, see changes live | Design iteration |
| 35 | **Color Picker** — Eyedropper tool accessible from toolbar | Design workflow |
| 36 | **JSON Formatter** — Pretty-print JSON responses in-browser | API debugging |
| 37 | **Page Speed Dial** — Quick-access grid of most-visited pages on new tab | Alternative to default new tab |

---

## Existing Scripts (for reference)

Already implemented in `JS/`:
- Extended Statusbar (addonbar with link preview)
- PDF Tools (PDF.js enhancements)
- All Tabs Menu Expansion Pack (drag-drop, close, multiselect)
- Minimize Memory (RAM threshold-based cleanup)
- Autocomplete Popup Styler
- Tooltip Shadow Support
- Sidebar Width (per-panel width persistence)
- Private Window Homepage (respect user homepage in private mode)
- Open Link in Unloaded Tab (context menu item)
- New Tab URL in about:config
- Space & Separator Restorer
- Rebuild userChrome (script manager UI)
- Restart Button / Restart Item in Menu
- AboutConfig Multi-Select
- Second Sidebar (web panels system, 100+ files)
