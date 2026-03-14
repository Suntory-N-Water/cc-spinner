# エージェント・ガイドライン

## 基本原則

- ログ・コメント・コミットメッセージは日本語で記載する
- 明示的に求められない限り、**後方互換性を維持しない**

## プロジェクト概要

Claude Code の `spinnerVerbs` テーマを配布・適用する CLI ツール。

## コマンド

- 静的解析: `bun run ai-check`
- テスト: `bun run test`

## コード規約

- GitHub の情報取得には `gh` コマンドを使用する
- ライブラリの仕様は Context7 MCP サーバー を使用する
- GitHub Actions ワークフロー更新時は `/dev:actions-check` で静的解析を実施する
