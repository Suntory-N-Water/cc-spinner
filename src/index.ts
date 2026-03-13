#!/usr/bin/env node
import { Command } from 'commander';
import { addCommand } from './commands/add';
import { previewCommand } from './commands/preview';
import { listCommand } from './commands/list';
import { findCommand } from './commands/find';
import { showBanner, showLogo } from './lib/banner';
import { version } from '../package.json';

if (process.argv.length <= 2) {
  showBanner();
  process.exit(0);
}

showLogo();

const program = new Command();

program
  .name('cc-spinner')
  .description('Claude Code の spinnerVerbs テーマを配布・適用する CLI ツール')
  .version(version);

program
  .command('add <theme>')
  .description('テーマを適用する(テーマ名または owner/repo 形式)')
  .option('-g, --global', 'グローバルスコープ (~/.claude/settings.json)')
  .option('-l, --local', 'ローカルスコープ (.claude/settings.local.json)')
  .action(addCommand);

program
  .command('preview <theme>')
  .description('セリフ一覧を確認する(settings.json は変更しない)')
  .action(previewCommand);

program
  .command('list')
  .description('中央リポジトリのテーマ一覧を表示する')
  .action(listCommand);

program
  .command('find <tag>')
  .description('タグでテーマを検索する')
  .action(findCommand);

program.parse();
