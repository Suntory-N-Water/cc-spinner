import { describe, expect, test } from 'bun:test';
import { buildThemeUrl } from '../../src/lib/fetch-theme';

describe('buildThemeUrl', () => {
  test('"/" を含まない引数は中央リポジトリ URL になる', () => {
    const result = buildThemeUrl('frieren');

    expect(result).toEqual({
      url: 'https://raw.githubusercontent.com/Suntory-N-Water/cc-spinner/main/themes/frieren.json',
      type: 'central',
    });
  });

  test('"/" を含む引数は GitHub 直指定 URL になる', () => {
    const result = buildThemeUrl('owner/repo');

    expect(result).toEqual({
      url: 'https://raw.githubusercontent.com/owner/repo/main/.claude/settings.json',
      type: 'github',
    });
  });

  test('org/repo 形式でも正しく URL を組み立てられる', () => {
    const result = buildThemeUrl(
      'Suntory-N-Water/claude-code-changelog-viewer',
    );

    expect(result).toEqual({
      url: 'https://raw.githubusercontent.com/Suntory-N-Water/claude-code-changelog-viewer/main/.claude/settings.json',
      type: 'github',
    });
  });
});
