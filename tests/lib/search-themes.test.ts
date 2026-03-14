import { describe, expect, test } from 'bun:test';
import { searchThemes } from '../../src/lib/search-themes';
import type { Theme } from '../../src/lib/theme-schema';

const createTheme = (overrides: Partial<Theme>): Theme => ({
  name: 'frieren',
  description: 'Quotes from Frieren',
  tags: ['anime'],
  mode: 'replace',
  verbs: ['Magic is most fun'],
  ...overrides,
});

describe('searchThemes', () => {
  describe('正常系', () => {
    describe('検索対象ごとの一致', () => {
      test('テーマ名に検索語が含まれるテーマを返す', () => {
        // Arrange
        const sut = searchThemes;
        const frierenTheme = createTheme({ name: 'frieren' });
        const fernTheme = createTheme({
          name: 'fern',
          description: 'Quotes from Fern',
        });
        const themes = [frierenTheme, fernTheme];

        // Act
        const result = sut(themes, 'frie');

        // Assert
        expect(result).toEqual([frierenTheme]);
      });

      test('説明文に検索語が含まれるテーマを返す', () => {
        // Arrange
        const sut = searchThemes;
        const starkTheme = createTheme({
          name: 'stark',
          description: 'A brave warrior theme',
        });
        const fernTheme = createTheme({
          name: 'fern',
          description: 'Quiet mage theme',
        });
        const themes = [starkTheme, fernTheme];

        // Act
        const result = sut(themes, 'warrior');

        // Assert
        expect(result).toEqual([starkTheme]);
      });

      test('タグに検索語が含まれるテーマを返す', () => {
        // Arrange
        const sut = searchThemes;
        const fantasyTheme = createTheme({ tags: ['anime', 'fantasy'] });
        const businessTheme = createTheme({
          name: 'office-worker',
          tags: ['business'],
        });
        const themes = [fantasyTheme, businessTheme];

        // Act
        const result = sut(themes, 'fanta');

        // Assert
        expect(result).toEqual([fantasyTheme]);
      });
    });

    describe('検索条件の扱い', () => {
      test('検索語の大文字小文字が異なっても同じテーマを返す', () => {
        // Arrange
        const sut = searchThemes;
        const frierenTheme = createTheme({
          name: 'Frieren',
          description: 'Calm mage theme',
          tags: ['Anime'],
        });
        const themes = [frierenTheme];

        // Act
        const result = sut(themes, 'ANIME');

        // Assert
        expect(result).toEqual([frierenTheme]);
      });

      test('一致する項目が複数あってもテーマを1回だけ返す', () => {
        // Arrange
        const sut = searchThemes;
        const animeTheme = createTheme({
          name: 'anime-theme',
          description: 'Anime quotes',
          tags: ['anime'],
        });
        const themes = [animeTheme];

        // Act
        const result = sut(themes, 'anime');

        // Assert
        expect(result).toEqual([animeTheme]);
      });
    });
  });

  describe('異常系', () => {
    describe('検索対象の欠落', () => {
      test('説明文やタグがないテーマが含まれていても一致判定できる', () => {
        // Arrange
        const sut = searchThemes;
        const minimalTheme = createTheme({
          name: 'minimal-theme',
          description: undefined,
          tags: undefined,
        });
        const fernTheme = createTheme({ name: 'fern' });
        const themes = [minimalTheme, fernTheme];

        // Act
        const result = sut(themes, 'minimal');

        // Assert
        expect(result).toEqual([minimalTheme]);
      });
    });

    describe('検索結果なし', () => {
      test('一致するテーマがない場合は空配列を返す', () => {
        // Arrange
        const sut = searchThemes;
        const themes = [createTheme({ name: 'frieren', tags: ['anime'] })];

        // Act
        const result = sut(themes, 'business');

        // Assert
        expect(result).toEqual([]);
      });
    });
  });
});
