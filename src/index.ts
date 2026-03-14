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
  .description(
    'CLI tool to distribute and apply spinnerVerbs themes for Claude Code',
  )
  .version(version);

program
  .command('add <theme>')
  .description('Apply a theme by name or from an owner/repo source')
  .option('-g, --global', 'Apply to the global scope (~/.claude/settings.json)')
  .option(
    '-l, --local',
    'Apply to the local scope (.claude/settings.local.json)',
  )
  .action(addCommand);

program
  .command('preview <theme>')
  .description('Preview verbs without modifying settings.json')
  .action(previewCommand);

program
  .command('list')
  .description('List themes available in the central repository')
  .action(listCommand);

program
  .command('find <query>')
  .description('Find themes by name, description, or tag')
  .action(findCommand);

program.parse();
