import pc from 'picocolors';
import { fetchAllThemes } from './list';

export async function findCommand(tag: string): Promise<void> {
  const allThemes = await fetchAllThemes().catch((err: unknown) => {
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  });

  const matched = allThemes.filter(
    (theme) => theme.tags?.includes(tag) ?? false,
  );

  if (matched.length === 0) {
    console.log(pc.yellow(`タグ "${tag}" に一致するテーマが見つかりません`));
    return;
  }

  console.log(pc.bold(`\nタグ "${tag}" のテーマ:\n`));
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
