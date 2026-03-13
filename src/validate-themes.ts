import * as v from 'valibot';
import { ThemeSchema } from './lib/theme-schema';

const glob = new Bun.Glob('themes/*.json');
const files = [...glob.scanSync('.')];

let hasError = false;

for (const file of files) {
  const json = await Bun.file(file).json();
  const result = v.safeParse(ThemeSchema, json);

  if (!result.success) {
    const issues = v.flatten(result.issues);
    console.error(`❌ ${file}`);
    console.error(JSON.stringify(issues, null, 2));
    hasError = true;
  } else {
    console.log(`✅ ${file}`);
  }
}

if (hasError) {
  process.exit(1);
}
