import * as p from '@clack/prompts';
import type { Scope } from '../lib/resolve-scope';
import { resolveScope } from '../lib/resolve-scope';
import { fetchTheme } from '../lib/fetch-theme';
import { applySettings } from '../lib/apply-settings';

type AddOptions = {
  global?: boolean;
  local?: boolean;
};

export async function addCommand(
  theme: string,
  options: AddOptions,
): Promise<void> {
  p.intro(`cc-spinner add`);

  const themeData = await fetchTheme(theme).catch((err: unknown) => {
    p.cancel(err instanceof Error ? err.message : String(err));
    process.exit(1);
  });

  let scope: Scope;

  if (options.global) {
    scope = 'global';
  } else if (options.local) {
    scope = 'local';
  } else {
    const selected = await p.select<Scope>({
      message: `テーマ "${theme}" を適用しますか？`,
      options: [
        { value: 'project', label: 'プロジェクト (.claude/settings.json)' },
        { value: 'global', label: 'グローバル (~/.claude/settings.json)' },
        { value: 'local', label: 'ローカル (.claude/settings.local.json)' },
      ],
    });

    if (p.isCancel(selected)) {
      p.cancel('キャンセルされました');
      process.exit(0);
    }

    scope = selected;
  }

  const filePath = resolveScope(scope);
  await applySettings(filePath, themeData);

  p.outro(`テーマ "${theme}" を ${filePath} に適用しました`);
}
