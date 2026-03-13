export type Scope = 'global' | 'local' | 'project';

const SCOPE_PATHS: Record<Scope, () => string> = {
  global: () => `${process.env['HOME'] ?? '/root'}/.claude/settings.json`,
  local: () => '.claude/settings.local.json',
  project: () => '.claude/settings.json',
};

export function resolveScope(scope: Scope): string {
  return SCOPE_PATHS[scope]();
}
