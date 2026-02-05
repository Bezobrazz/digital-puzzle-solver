import type { SolverResult } from '../lib/types';
import { solve } from '../lib/solver';

self.onmessage = (e: MessageEvent<string>) => {
  try {
    const result: SolverResult = solve(e.data);
    self.postMessage(result);
  } catch (err) {
    self.postMessage({
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    } satisfies SolverResult);
  }
};
