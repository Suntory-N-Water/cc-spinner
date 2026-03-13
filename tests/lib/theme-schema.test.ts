import { describe, expect, test } from 'bun:test';
import * as v from 'valibot';
import { ThemeSchema } from '../../src/lib/theme-schema';

const validTheme = {
  name: 'frieren',
  description: '葬送のフリーレンのセリフ集',
  tags: ['anime', 'japanese'],
  mode: 'replace' as const,
  verbs: ['そうだね。'],
};

describe('ThemeSchema', () => {
  test('必須フィールドが揃ったテーマはバリデーションを通過する', () => {
    const result = v.safeParse(ThemeSchema, validTheme);

    expect(result.success).toBe(true);
  });

  test('description と tags はオプションなので省略してもバリデーションを通過する', () => {
    const input = { name: 'test', mode: 'append', verbs: ['テスト'] };

    const result = v.safeParse(ThemeSchema, input);

    expect(result.success).toBe(true);
  });

  test('name フィールドが欠けている場合はバリデーションエラーになる', () => {
    const input = { ...validTheme, name: undefined };

    const result = v.safeParse(ThemeSchema, input);

    expect(result.success).toBe(false);
  });

  test('name に英数字・ハイフン以外が含まれる場合はバリデーションエラーになる', () => {
    const input = { ...validTheme, name: 'フリーレン' };

    const result = v.safeParse(ThemeSchema, input);

    expect(result.success).toBe(false);
  });

  test('name にアンダースコアが含まれる場合はバリデーションエラーになる', () => {
    const input = { ...validTheme, name: 'my_theme' };

    const result = v.safeParse(ThemeSchema, input);

    expect(result.success).toBe(false);
  });

  test('verbs が空配列の場合はバリデーションエラーになる', () => {
    const input = { ...validTheme, verbs: [] };

    const result = v.safeParse(ThemeSchema, input);

    expect(result.success).toBe(false);
  });

  test('mode が "replace"/"append" 以外の場合はバリデーションエラーになる', () => {
    const input = { ...validTheme, mode: 'invalid' };

    const result = v.safeParse(ThemeSchema, input);

    expect(result.success).toBe(false);
  });

  test('mode フィールドが欠けている場合はバリデーションエラーになる', () => {
    const input = { ...validTheme, mode: undefined };

    const result = v.safeParse(ThemeSchema, input);

    expect(result.success).toBe(false);
  });
});
