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

// --- Параметри та результати солвера ---

export type SolveParams = {
  fragments: string[];
  timeLimitMs: number;
};

export type SolveProgress = {
  visited: number;
  bestLen: number;
  elapsedMs: number;
};

export type SolveResult = {
  bestString: string;
  bestPath: number[];
  usedCount: number;
  bestLen: number;
  visited: number;
  elapsedMs: number;
};

// --- Повідомлення воркера ---

export type WorkerMessageIn =
  | { type: 'start'; params: SolveParams }
  | { type: 'stop' };

export type WorkerMessageOut =
  | { type: 'progress'; payload: SolveProgress }
  | { type: 'done'; payload: SolveResult }
  | { type: 'error'; message: string };
