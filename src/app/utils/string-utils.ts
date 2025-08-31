/**
 * Конвертирует строку в kebab-case формат
 * @param str - исходная строка
 * @returns строка в kebab-case формате
 */
export function toKebabCase(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\da-z-]/g, '');
}
