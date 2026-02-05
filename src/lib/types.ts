/** Типи для digital-puzzle-solver */

export interface PuzzleInput {
  /** Вхідні числа або рядок для парсингу */
  raw: string;
}

export interface ChainStep {
  value: number;
  label?: string;
}

export interface SolverResult {
  success: boolean;
  steps?: ChainStep[];
  error?: string;
}
