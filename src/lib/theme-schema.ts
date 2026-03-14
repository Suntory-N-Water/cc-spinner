import * as v from 'valibot';

export const ThemeSchema = v.object({
  name: v.pipe(
    v.string(),
    v.regex(
      /^[a-z0-9-]+$/,
      'name may contain only lowercase letters, numbers, and hyphens',
    ),
  ),
  description: v.optional(v.string()),
  tags: v.optional(v.array(v.string())),
  mode: v.picklist(['replace', 'append']),
  verbs: v.pipe(
    v.array(v.string()),
    v.minLength(1, 'verbs must contain at least one item'),
  ),
});

export type Theme = v.InferOutput<typeof ThemeSchema>;
