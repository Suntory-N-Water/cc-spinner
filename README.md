# cc-spinner

[日本語](./README.ja.md)

A CLI tool to distribute and apply `spinnerVerbs` themes for Claude Code.

Claude Code supports a `spinnerVerbs` setting in `settings.json` that customizes the text displayed while the AI is processing. **cc-spinner** makes it easy to share and apply these themes.

```bash
npx cc-spinner add frieren
```

## Commands

### `add <theme>` — Apply a theme

```bash
npx cc-spinner add <theme> [options]
```

| Argument | Description |
|----------|-------------|
| `<theme>` | Theme name from the central repository, or `owner/repo` for any GitHub repository |

| Option | Description |
|--------|-------------|
| `-g, --global` | Apply to `~/.claude/settings.json` |
| `-l, --local` | Apply to `.claude/settings.local.json` |
| _(none)_ | Prompts you to choose a scope |

**Example — central repository:**
```bash
npx cc-spinner add frieren
```

**Example — any GitHub repository:**
```bash
npx cc-spinner add Suntory-N-Water/claude-code-changelog-viewer
```

---

### `preview <theme>` — Preview verbs without applying

```bash
npx cc-spinner preview frieren
```

Displays the list of verbs without modifying any `settings.json`.

---

### `list` — List available themes

```bash
npx cc-spinner list
```

---

### `find <tag>` — Search themes by tag

```bash
npx cc-spinner find anime
```

## Theme format

Themes are stored as JSON files in the `themes/` directory and must conform to the following schema:

```json
{
  "name": "frieren",
  "description": "Quotes from Frieren: Beyond Journey's End",
  "tags": ["anime", "japanese"],
  "mode": "replace",
  "verbs": [
    "Magic is most fun when you're still searching for it.",
    "I see."
  ]
}
```

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| `name` | string | ✅ | Lowercase letters, digits, and hyphens only. Must match the filename. |
| `description` | string | — | Any string |
| `tags` | string[] | — | Any strings |
| `mode` | string | ✅ | `"replace"` or `"append"` |
| `verbs` | string[] | ✅ | At least one item |

## Contributing a theme

1. Fork `Suntory-N-Water/cc-spinner`
2. Add `themes/<name>.json` (filename must match the `name` field)
3. Open a pull request — CI will validate the schema automatically
4. After review and merge, your theme becomes available via `npx cc-spinner add <name>`

## Development

```bash
bun install
bun test
bun run build
```
