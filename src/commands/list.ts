import pc from 'picocolors';
import * as v from 'valibot';
import { ThemeSchema, type Theme } from '../lib/theme-schema';

const THEMES_API =
  'https://api.github.com/repos/Suntory-N-Water/cc-spinner/contents/themes';
const RAW_BASE =
  'https://raw.githubusercontent.com/Suntory-N-Water/cc-spinner/main/themes';

const GitHubContentsSchema = v.array(
  v.object({ name: v.string(), type: v.string() }),
);

export async function fetchAllThemes(): Promise<Theme[]> {
  const res = await fetch(THEMES_API);
  if (!res.ok) {
    throw new Error('Failed to fetch theme list');
  }

  const items = v.parse(GitHubContentsSchema, await res.json());
  const jsonFiles = items
    .filter((item) => item.type === 'file' && item.name.endsWith('.json'))
    .map((item) => item.name);

  return Promise.all(
    jsonFiles.map(async (name) => {
      const themeRes = await fetch(`${RAW_BASE}/${name}`);
      return v.parse(ThemeSchema, await themeRes.json());
    }),
  );
}

export async function listCommand(): Promise<void> {
  const themes = await fetchAllThemes().catch((err: unknown) => {
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  });

  console.log(pc.bold('\nAvailable themes:\n'));
  for (const theme of themes) {
    const tags =
      theme.tags && theme.tags.length > 0
        ? pc.dim(`[${theme.tags.join(', ')}]`)
        : '';
    const desc = theme.description ?? '';
    console.log(
      `  ${pc.cyan(theme.name.padEnd(12))} ${desc.padEnd(24)} ${tags}`,
    );
  }
}
