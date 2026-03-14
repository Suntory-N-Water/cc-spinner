import type { Theme } from './theme-schema';

export function searchThemes(themes: Theme[], query: string): Theme[] {
  const normalizedQuery = query.toLowerCase();

  return themes.filter((theme) => {
    const name = theme.name.toLowerCase();
    const description = theme.description?.toLowerCase() ?? '';
    const tags = theme.tags?.map((tag) => tag.toLowerCase()) ?? [];

    return (
      name.includes(normalizedQuery) ||
      description.includes(normalizedQuery) ||
      tags.some((tag) => tag.includes(normalizedQuery))
    );
  });
}
