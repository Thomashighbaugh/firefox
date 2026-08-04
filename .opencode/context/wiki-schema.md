# LLM Wiki Schema

## Directory Structure

```
.opencode/context/
├── index.md              # Wiki catalog (auto-maintained)
├── log.md                # Chronological operation record (append-only)
├── wiki-schema.md        # This file — schema definition
├── research/             # External source summaries (consumed URLs, docs, repos)
│   ├── malevich/         # Malevich Firefox theme
│   ├── quick-tabs/       # Quick Tabs for Zen Browser
│   ├── uc-css-js/        # UserChrome.css/JS research
│   └── zen-custom-js/    # Zen Browser custom JS research
├── frameworks/           # Entity/concept pages (architecture, design, conventions)
├── patterns/             # Pattern pages (discovered patterns, anti-patterns, solutions)
├── decisions.md          # Decision records (ADRs)
└── theory.md             # Living synthesis / overview
```

## YAML Frontmatter Convention

```yaml
---
title: "Page Title"
type: entity | concept | source-summary | decision | pattern | synthesis
tags: [tag1, tag2]
created: 2026-07-17
updated: 2026-07-17
source: https://github.com/owner/repo
status: active | needs-review | stale
---
```

- `type` — one of: entity, concept, source-summary, decision, pattern, synthesis
- `tags` — lowercase, hyphenated keywords for cross-referencing
- `source` — optional URL for external sources
- `status` — active (current), needs-review (potentially stale), stale (deprecated)

## Cross-Reference Syntax

Use `[[page-slug]]` wiki-link syntax. The slug is derived from the filename without extension, with the containing directory as a prefix where ambiguous.

## Operation Workflows

### `consume` — Ingesting External Content
1. Fetch URL or read file
2. Clean and convert to Markdown
3. Save to `research/{slug}/{timestamp}.md` with YAML frontmatter
4. Update index.md (add to External References section)
5. Append to log.md
6. Scan for cross-references to existing pages

### `docs` — Fetching Library Documentation
1. Use Context7 MCP to fetch documentation
2. Save results to `research/{library-slug}/{query-hash}.md`
3. Update index.md and log.md
4. Add cross-references

### `web-research` — Web Research
1. Search and fetch web content
2. Synthesize into structured summary
3. Save to `research/{topic}/` with frontmatter
4. Update index.md and log.md

## Rules
- Raw sources in `research/` are immutable — LLM reads but never modifies them
- Wiki pages are committed (durable context) — they compound across sessions
- NO vector embeddings — use index + keyword + tag matching only
- Any file in `.opencode/context/` is part of the wiki
