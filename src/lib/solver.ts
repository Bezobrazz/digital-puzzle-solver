import type { SolverResult, ChainStep } from './types';
import { parseNumbers } from './parse';

/**
 * Обчислює ланцюг (placeholder: повертає вхідні числа як кроки).
 */
export function solve(raw: string): SolverResult {
  const numbers = parseNumbers(raw);
  if (numbers.length === 0) {
    return { success: false, error: 'Не знайдено чисел у вводі' };
  }
  const steps: ChainStep[] = numbers.map((value) => ({ value }));
  return { success: true, steps };
}
