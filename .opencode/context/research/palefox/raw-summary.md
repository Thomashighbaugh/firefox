# Palefox — Raw Fetched Docs

**Fetched:** 2026-06-27  
**Source:** https://github.com/tompassarelli/palefox

## Files Fetched

- README.md (GitHub repo page)
- README.md (raw)
- CLAUDE.md — project guide for AI agents
- docs/getting-started.md — five-minute orientation
- docs/features.md — full feature reference
- docs/customization.md — user customization guide
- docs/colors.md — theming deep dive

## Key Takeaways

1. **Superseded by Gjoa** — Palefox v0.43.0 is final. Development moved to a Firefox source fork.
2. **TypeScript → .uc.js** — Uses Bun build pipeline to compile TypeScript into userChrome.js scripts. Higgs Boson could adopt this approach.
3. **Factory pattern** — Clean INTERFACE/IMPLEMENTATION split for complex modules.
4. **Firefox adapter layer** — `src/firefox/` abstracts raw chrome globals behind typed wrappers.
5. **Custom palette** — `--pfx-*` variables shield against Firefox's GTK transparency bugs on Linux.
6. **Compact mode** — State machine for sidebar autohide with spring animation.
7. **Testing tiers** — Unit (bun test), happy-dom mocks, Marionette integration, AI iteration loop.
8. **user.css** — Never-overwritten user override file.
9. **about:config prefs** — All under `pfx.*` namespace, take effect immediately.
10. **Security** — Hash-pinned loader closes local-write attack vector. Chrome-privileged scripts have full access to tabs, cookies, passwords.
