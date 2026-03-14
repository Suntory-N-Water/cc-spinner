import pc from 'picocolors';
import { fetchAllThemes } from './list';
import { searchThemes } from '../lib/search-themes';

export async function findCommand(query: string): Promise<void> {
  const allThemes = await fetchAllThemes().catch((err: unknown) => {
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  });

  const matched = searchThemes(allThemes, query);

  if (matched.length === 0) {
    console.log(pc.yellow(`No themes found for "${query}"`));
    return;
  }

  console.log(pc.bold(`\nSearch results for "${query}":\n`));
  for (const theme of matched) {
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
