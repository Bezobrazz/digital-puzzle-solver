import type { WorkerMessageIn, WorkerMessageOut, SolveProgress } from '../lib/types';
import { solve } from '../lib/solver';

let stopped = false;

self.onmessage = (e: MessageEvent<WorkerMessageIn>) => {
  const msg = e.data;

  if (msg.type === 'stop') {
    stopped = true;
    return;
  }

  if (msg.type === 'start') {
    stopped = false;
    const { params } = msg;

    const progressCb = (payload: SolveProgress) => {
      self.postMessage({ type: 'progress', payload } satisfies WorkerMessageOut);
    };

    const shouldStop = () => stopped;

    try {
      const result = solve(params, progressCb, shouldStop);
      self.postMessage({ type: 'done', payload: result } satisfies WorkerMessageOut);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      self.postMessage({ type: 'error', message } satisfies WorkerMessageOut);
    }
    return;
  }
};
