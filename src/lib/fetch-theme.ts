import * as v from 'valibot';

const CENTRAL_BASE =
  'https://raw.githubusercontent.com/Suntory-N-Water/cc-spinner/main/themes';

const ThemeDataSchema = v.object({
  mode: v.picklist(['replace', 'append']),
  verbs: v.array(v.string()),
});

const GitHubSettingsSchema = v.object({
  spinnerVerbs: v.optional(ThemeDataSchema),
});

type ThemeData = v.InferOutput<typeof ThemeDataSchema>;

type UrlResult =
  | { url: string; type: 'central' }
  | { url: string; type: 'github' };

export function buildThemeUrl(nameOrRepo: string): UrlResult {
  if (nameOrRepo.includes('/')) {
    return {
      url: `https://raw.githubusercontent.com/${nameOrRepo}/main/.claude/settings.json`,
      type: 'github',
    };
  }
  return {
    url: `${CENTRAL_BASE}/${nameOrRepo}.json`,
    type: 'central',
  };
}

export async function fetchTheme(nameOrRepo: string): Promise<ThemeData> {
  const { url, type } = buildThemeUrl(nameOrRepo);
  const res = await fetch(url);

  if (!res.ok) {
    if (type === 'github') {
      throw new Error('リポジトリまたはファイルが見つかりません');
    }
    throw new Error(`テーマ "${nameOrRepo}" が見つかりません`);
  }

  if (type === 'github') {
    const settings = v.parse(GitHubSettingsSchema, await res.json());
    if (!settings.spinnerVerbs) {
      throw new Error('spinnerVerbs が設定されていません');
    }
    return settings.spinnerVerbs;
  }

  return v.parse(ThemeDataSchema, await res.json());
}
