# cc-spinner

[English](./README.md)

Claude Code の `spinnerVerbs` テーマを配布・適用する CLI ツール。

Claude Code は `settings.json` の `spinnerVerbs` 設定で、AI が処理中に表示するテキストをカスタマイズできます。**cc-spinner** はこのテーマを簡単に共有・適用できるようにします。

```bash
npx cc-spinner add frieren
```

## コマンド

### `add <theme>` — テーマを適用する

```bash
npx cc-spinner add <theme> [options]
```

| 引数 | 説明 |
|------|------|
| `<theme>` | 中央リポジトリのテーマ名、または任意の GitHub リポジトリを指定する `owner/repo` 形式 |

| オプション | 説明 |
|-----------|------|
| `-g, --global` | `~/.claude/settings.json` に適用 |
| `-l, --local` | `.claude/settings.local.json` に適用 |
| _(なし)_ | スコープを選択するプロンプトを表示 |

**例 — 中央リポジトリのテーマ:**
```bash
npx cc-spinner add frieren
```

**例 — GitHub リポジトリを直接指定:**
```bash
npx cc-spinner add Suntory-N-Water/claude-code-changelog-viewer
```

---

### `preview <theme>` — セリフ一覧を確認する

```bash
npx cc-spinner preview frieren
```

`settings.json` を変更せずにセリフの一覧を表示します。

---

### `list` — 利用可能なテーマ一覧を表示する

```bash
npx cc-spinner list
```

---

### `find <query>` — テーマを検索する

```bash
npx cc-spinner find anime
```

テーマ名、説明文、タグをまとめて検索します。

## テーマのフォーマット

テーマは `themes/` ディレクトリ内の JSON ファイルとして管理され、以下のスキーマに従う必要があります:

```json
{
  "name": "frieren",
  "description": "葬送のフリーレンのセリフ集",
  "tags": ["anime", "japanese"],
  "mode": "replace",
  "verbs": [
    "魔法は探し求めている時が一番楽しいんだよ",
    "そうだね。"
  ]
}
```

| フィールド | 型 | 必須 | 制約 |
|-----------|-----|------|------|
| `name` | string | ✅ | 英小文字・数字・ハイフンのみ。ファイル名(拡張子除く)と一致させる |
| `description` | string | - | 制約なし |
| `tags` | string[] | - | 制約なし |
| `mode` | string | ✅ | `"replace"` または `"append"` のみ |
| `verbs` | string[] | ✅ | 1つ以上 |

## テーマを追加する

1. `Suntory-N-Water/cc-spinner` を fork する
2. `themes/<テーマ名>.json` を追加する(ファイル名は `name` フィールドと一致させる)
3. PR を送る
4. レビュー・マージ後、`npx cc-spinner add <name>` で利用可能になる

## 補足資料

- [Claude Code settings](https://code.claude.com/docs/en/settings)
- [Claude CodeのSpinner Verbsに癒されてみた](https://dev.classmethod.jp/articles/claude-code-spinner-verbs/)

## 開発

```bash
bun install
bun test
bun run build
```
