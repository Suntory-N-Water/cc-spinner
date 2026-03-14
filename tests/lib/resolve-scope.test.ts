import { afterEach, beforeEach, describe, expect, test } from 'bun:test';
import { resolveScope } from '../../src/lib/resolve-scope';

describe('resolveScope', () => {
  let originalHome: string | undefined;

  beforeEach(() => {
    originalHome = process.env['HOME'];
    process.env['HOME'] = '/home/testuser';
  });

  afterEach(() => {
    process.env['HOME'] = originalHome;
  });

  test('-g フラグでグローバル設定ファイルパスが返る', () => {
    // Arrange
    const sut = resolveScope;

    // Act
    const result = sut('global');

    // Assert
    expect(result).toBe('/home/testuser/.claude/settings.json');
  });

  test('-l フラグでローカル設定ファイルパスが返る', () => {
    // Arrange
    const sut = resolveScope;

    // Act
    const result = sut('local');

    // Assert
    expect(result).toBe('.claude/settings.local.json');
  });

  test('デフォルトでプロジェクト設定ファイルパスが返る', () => {
    // Arrange
    const sut = resolveScope;

    // Act
    const result = sut('project');

    // Assert
    expect(result).toBe('.claude/settings.json');
  });
});
