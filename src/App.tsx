import { useState, useCallback, useRef, useEffect } from 'react';
import { UploadBox } from './components/UploadBox';
import { Controls } from './components/Controls';
import { ResultCard } from './components/ResultCard';
import { ChainView } from './components/ChainView';
import type { SolveResult, SolveProgress, WorkerMessageOut } from './lib/types';
import { parseInputText } from './lib/parse';

const DEFAULT_TIME_LIMIT_MS = 10_000;

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SolveResult | null>(null);
  const [progress, setProgress] = useState<SolveProgress | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [solving, setSolving] = useState(false);

  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, []);

  const handleSolve = useCallback(() => {
    if (!input.trim()) return;
    try {
      const fragments = parseInputText(input);
      setError(null);
      setResult(null);
      setProgress(null);
      setSolving(true);

      if (workerRef.current) {
        workerRef.current.terminate();
      }
      workerRef.current = new Worker(
        new URL('./workers/solver.worker.ts', import.meta.url),
        { type: 'module' }
      );

      const worker = workerRef.current;
      worker.postMessage({
        type: 'start',
        params: { fragments, timeLimitMs: DEFAULT_TIME_LIMIT_MS },
      });

      worker.onmessage = (e: MessageEvent<WorkerMessageOut>) => {
        const msg = e.data;
        if (msg.type === 'progress') {
          setProgress(msg.payload);
        } else if (msg.type === 'done') {
          setResult(msg.payload);
          setSolving(false);
        } else if (msg.type === 'error') {
          setError(msg.message);
          setSolving(false);
        }
      };
      worker.onerror = () => {
        setError('Помилка воркера');
        setSolving(false);
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Невідома помилка');
      setSolving(false);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setResult(null);
    setProgress(null);
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Digital Puzzle Solver
        </h1>
        <UploadBox onInput={setInput} />
        <Controls
          onSolve={handleSolve}
          onClear={handleClear}
          solving={solving}
        />
        {progress && solving && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Відвідано: <span className="num font-mono">{progress.visited}</span>, найкраща довжина:{' '}
            <span className="num font-mono">{progress.bestLen}</span>,{' '}
            <span className="num font-mono">{progress.elapsedMs}</span> ms
          </p>
        )}
        <ResultCard result={result} error={error} />
        {result && result.bestString && (
          <ChainView path={result.bestPath} bestString={result.bestString} />
        )}
      </div>
    </div>
  );
}

export default App;
