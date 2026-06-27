# Firefox Theme - Artifact Placement Rules

## Core Rule
No standalone scripts (`.sh`, `.ts`, `.mjs`, `.py`) at project root or any top-level directory.

## Permitted Locations
| Artifact Type | Allowed Location |
|---------------|-----------------|
| OpenCode tools | `.opencode/tools/` |
| Skill scripts | `.opencode/skills/{name}/scripts/` |
| Commands | `.opencode/commands/` |
| Firefox test scripts | `utils/` (for fx-autoconfig bootstrap) |
| Build utilities | `utils/` |

## Firefox-Specific Notes
- `userChrome.css` and `userContent.css` at root are **expected** — these are Firefox entry points, not scripts
- `JS/*.uc.js` files are **Firefox UserChrome scripts** — these are allowed; they're browser enhancement scripts loaded by fx-autoconfig
- Any `.sh`, `.ts`, `.mjs`, or `.py` files that implement build tooling, dev workflows, or automation belong in `utils/` or `.opencode/` paths
