import * as v from 'valibot';

export const ThemeSchema = v.object({
  name: v.pipe(
    v.string(),
    v.regex(/^[a-z0-9-]+$/, 'name は英小文字・数字・ハイフンのみ使用できます'),
  ),
  description: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  mode: v.picklist(['replace', 'append']),
  verbs: v.pipe(v.array(v.string()), v.minLength(1, 'verbs は1つ以上必要です')),
});

export type Theme = v.InferOutput<typeof ThemeSchema>;
