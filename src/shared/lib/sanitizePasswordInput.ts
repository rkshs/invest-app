const CYRILLIC_PATTERN = /[\u0400-\u04FF]/g;

export function sanitizePasswordInput(value: string): string {
  return value.replace(CYRILLIC_PATTERN, '');
}
