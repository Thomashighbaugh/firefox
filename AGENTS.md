# AGENTS.md - Firefox Customization Codebase

## Build/Test/Lint Commands
No formal build system. Firefox loads files directly from the profile directory.
No automated testing framework configured.
No linting configuration found (ESLint disabled via `/* eslint-disable */` comments).
Testing: Manually restart Firefox to test changes.

## Project Structure
- `userChrome.css` / `userContent.css` - Main entry points for Firefox customization
- `JS/` - JavaScript modules (.mjs, .uc.js) for browser behavior modification
- `css/` - CSS files organized by component type (userChrome-files/, userContent-files/, common-files/)
- `resources/` - Static assets and configurations

## Code Style Guidelines

### JavaScript/Module Files (.mjs)
- Use ES6 modules with `.mjs` extension
- Import statements: relative paths with `.mjs` extension
- Class-based architecture with PascalCase class names
- Private methods prefixed with `#`
- Console.log for debugging (no formal logging framework)
- JSDoc comments for public methods
- Static methods for utilities and entry points

### CSS Files
- Use CSS custom properties for theming (`var(--property-name)`)
- `@-moz-document url-prefix(chrome://)` wrapper for userChrome styles
- `!important` declarations common due to Firefox's cascade
- Organize imports: common-files → userChrome-files → userContent-files
- Use descriptive file names matching component functionality
- CSS selectors often target Firefox's internal XUL elements