import type { PuzzleInput } from './types';

const DIGITS_ONLY = /^\d+$/;

/**
 * Парсить текст: рядки по newline, trim, без порожніх.
 * Валідує: тільки цифри (/^\d+$/), кількість фрагментів >= 2.
 * @throws Error з зрозумілим повідомленням при помилці валідації
 */
export function parseInputText(text: string): string[] {
  const fragments = text
    .split(/\n/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  if (fragments.length < 2) {
    throw new Error(
      `Потрібно щонайменше 2 фрагменти, отримано: ${fragments.length}`
    );
  }

  for (let i = 0; i < fragments.length; i++) {
    if (!DIGITS_ONLY.test(fragments[i])) {
      throw new Error(
        `Фрагмент ${i + 1} "${fragments[i]}" містить не тільки цифри. Дозволено лише цифри (0-9).`
      );
    }
  }

  return fragments;
}

export const EXAMPLE_INPUT =
  '608017\n248460\n962282\n994725\n177092\n';

/** @deprecated Використовуйте parseInputText для фрагментів по рядках */
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
