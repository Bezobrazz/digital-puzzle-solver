import type { SolveParams, SolveProgress, SolveResult } from './types';

// --- Helpers ---

function prefix2(s: string): string {
  return s.slice(0, 2);
}

function suffix2(s: string): string {
  return s.slice(-2);
}

function gain(nextFrag: string): number {
  return nextFrag.length - 2;
}

const PROGRESS_INTERVAL_MS = 250;

/**
 * Будує граф переходів: next[i] = індекси j, де suffix2(frag[i]) === prefix2(frag[j]).
 * next[i] відсортовано: спочатку за gain(frag[j]) desc, потім за next[j].length desc.
 */
function buildNext(fragments: string[]): number[][] {
  const n = fragments.length;
  const next: number[][] = [];

  for (let i = 0; i < n; i++) {
    const suf = suffix2(fragments[i]);
    const candidates: number[] = [];
    for (let j = 0; j < n; j++) {
      if (j === i) continue;
      if (prefix2(fragments[j]) === suf) candidates.push(j);
    }
    next.push(candidates);
  }

  // Pre-sort: need next[j].length for secondary key, so sort after full next is built
  for (let i = 0; i < n; i++) {
    next[i].sort((a, b) => {
      const gainA = gain(fragments[a]);
      const gainB = gain(fragments[b]);
      if (gainB !== gainA) return gainB - gainA;
      return next[b].length - next[a].length;
    });
  }

  return next;
}

/**
 * DFS/backtracking по графу. Старт з кожного вузла.
 * Оновлює bestString, bestPath, bestLen глобально; використовує shouldStop та onProgress.
 */
export function solve(
  params: SolveParams,
  onProgress: (p: SolveProgress) => void,
  shouldStop: () => boolean
): SolveResult {
  const { fragments, timeLimitMs } = params;
  const startTime = Date.now();
  const next = buildNext(fragments);

  let visited = 0;
  let bestString = '';
  let bestPath: number[] = [];
  let lastProgressTime = startTime;

  function reportProgress() {
    const now = Date.now();
    if (now - lastProgressTime >= PROGRESS_INTERVAL_MS) {
      lastProgressTime = now;
      onProgress({
        visited,
        bestLen: bestString.length,
        elapsedMs: now - startTime,
      });
    }
  }

  function dfs(
    currString: string,
    currPath: number[],
    used: boolean[]
  ): void {
    if (shouldStop() || Date.now() - startTime > timeLimitMs) return;

    visited++;
    reportProgress();

    const currLen = currString.length;
    if (currLen > bestString.length) {
      bestString = currString;
      bestPath = [...currPath];
    }

    const i = currPath[currPath.length - 1];
    for (const j of next[i]) {
      if (used[j]) continue;
      used[j] = true;
      currPath.push(j);
      const newString = currString + fragments[j].slice(2);
      dfs(newString, currPath, used);
      currPath.pop();
      used[j] = false;
    }
  }

  const n = fragments.length;
  const used: boolean[] = new Array(n).fill(false);

  for (let start = 0; start < n; start++) {
    if (shouldStop() || Date.now() - startTime > timeLimitMs) break;
    used[start] = true;
    dfs(fragments[start], [start], used);
    used[start] = false;
  }

  const elapsedMs = Date.now() - startTime;
  return {
    bestString,
    bestPath,
    usedCount: bestPath.length,
    bestLen: bestString.length,
    visited,
    elapsedMs,
  };
}
