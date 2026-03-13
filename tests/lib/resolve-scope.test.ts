import { describe, expect, test } from 'bun:test';
import { resolveScope } from '../../src/lib/resolve-scope';

describe('resolveScope', () => {
  test('-g フラグでグローバル設定ファイルパスが返る', () => {
    const home = process.env['HOME'] ?? '/root';

    const result = resolveScope('global');

    expect(result).toBe(`${home}/.claude/settings.json`);
  });

  test('-l フラグでローカル設定ファイルパスが返る', () => {
    const result = resolveScope('local');

    expect(result).toBe('.claude/settings.local.json');
  });

  test('デフォルトでプロジェクト設定ファイルパスが返る', () => {
    const result = resolveScope('project');

    expect(result).toBe('.claude/settings.json');
  });
});
