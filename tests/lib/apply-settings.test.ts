import { afterEach, describe, expect, test } from 'bun:test';
import { rm, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { applySettings } from '../../src/lib/apply-settings';

const createTmpDir = async (): Promise<string> => {
  const dir = join(tmpdir(), `cc-spinner-test-${Date.now()}`);
  await mkdir(dir, { recursive: true });
  return dir;
};

describe('applySettings', () => {
  const tmpDirs: string[] = [];

  afterEach(async () => {
    for (const dir of tmpDirs) {
      await rm(dir, { recursive: true, force: true });
    }
    tmpDirs.length = 0;
  });

  test('ファイルが存在しない場合は新規作成できる', async () => {
    // Arrange
    const sut = applySettings;
    const dir = await createTmpDir();
    tmpDirs.push(dir);
    const filePath = join(dir, 'settings.json');
    const spinnerVerbs = { mode: 'replace' as const, verbs: ['テスト'] };

    // Act
    await sut(filePath, spinnerVerbs);

    // Assert
    const content = await Bun.file(filePath).json();
    expect(content).toEqual({ spinnerVerbs });
  });

  test('ディレクトリが存在しない場合は作成してから保存できる', async () => {
    // Arrange
    const sut = applySettings;
    const dir = await createTmpDir();
    tmpDirs.push(dir);
    const filePath = join(dir, 'nested', '.claude', 'settings.json');
    const spinnerVerbs = { mode: 'replace' as const, verbs: ['テスト'] };

    // Act
    await sut(filePath, spinnerVerbs);

    // Assert
    const content = await Bun.file(filePath).json();
    expect(content).toEqual({ spinnerVerbs });
  });

  test('既存ファイルの spinnerVerbs を上書き保存できる', async () => {
    // Arrange
    const sut = applySettings;
    const dir = await createTmpDir();
    tmpDirs.push(dir);
    const filePath = join(dir, 'settings.json');
    await Bun.write(
      filePath,
      JSON.stringify({
        spinnerVerbs: { mode: 'append', verbs: ['古いセリフ'] },
      }),
    );
    const spinnerVerbs = { mode: 'replace' as const, verbs: ['新しいセリフ'] };

    // Act
    await sut(filePath, spinnerVerbs);

    // Assert
    const content = await Bun.file(filePath).json();
    expect(content).toEqual({ spinnerVerbs });
  });

  test('既存の他フィールドを維持しながら spinnerVerbs のみ更新できる', async () => {
    // Arrange
    const sut = applySettings;
    const dir = await createTmpDir();
    tmpDirs.push(dir);
    const filePath = join(dir, 'settings.json');
    const existingContent = {
      permissions: { allow: ['Bash(git:*)'] },
      spinnerVerbs: { mode: 'append', verbs: ['古いセリフ'] },
    };
    await Bun.write(filePath, JSON.stringify(existingContent));
    const spinnerVerbs = { mode: 'replace' as const, verbs: ['新しいセリフ'] };

    // Act
    await sut(filePath, spinnerVerbs);

    // Assert
    const content = await Bun.file(filePath).json();
    expect(content).toEqual({
      permissions: { allow: ['Bash(git:*)'] },
      spinnerVerbs,
    });
  });
});
