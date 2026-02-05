import type { PuzzleInput } from './types';

/**
 * Парсить вхідний рядок у структуровані дані для солвера.
 */
export function parseInput(raw: string): PuzzleInput {
  const trimmed = raw.trim();
  return { raw: trimmed };
}

/**
 * Витягує числа з рядка (наприклад, "1 2 3" або "1,2,3").
 */
export function parseNumbers(raw: string): number[] {
  return raw
    .split(/[\s,;]+/)
    .map((s) => Number(s.trim()))
    .filter((n) => !Number.isNaN(n));
}
