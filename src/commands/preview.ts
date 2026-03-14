import pc from 'picocolors';
import { fetchTheme } from '../lib/fetch-theme';

export async function previewCommand(theme: string): Promise<void> {
  const themeData = await fetchTheme(theme).catch((err: unknown) => {
    console.error(pc.red(err instanceof Error ? err.message : String(err)));
    process.exit(1);
  });

  console.log(pc.bold(`\nVerbs in "${theme}":\n`));
  themeData.verbs.forEach((verb, i) => {
    console.log(`${pc.dim(`${i + 1}.`)} ${verb}`);
  });
}
