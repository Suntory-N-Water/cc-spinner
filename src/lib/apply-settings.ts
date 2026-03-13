import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import * as v from 'valibot';

type SpinnerVerbs = {
  mode: 'replace' | 'append';
  verbs: string[];
};

const ExistingSettingsSchema = v.record(v.string(), v.unknown());

export async function applySettings(
  filePath: string,
  spinnerVerbs: SpinnerVerbs,
): Promise<void> {
  const existing = await (async () => {
    try {
      return v.parse(
        ExistingSettingsSchema,
        JSON.parse(await readFile(filePath, 'utf-8')),
      );
    } catch {
      return {};
    }
  })();

  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(
    filePath,
    JSON.stringify({ ...existing, spinnerVerbs }, null, 2),
  );
}
