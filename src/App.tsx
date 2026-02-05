import { useState, useCallback } from 'react';
import { UploadBox } from './components/UploadBox';
import { Controls } from './components/Controls';
import { ResultCard } from './components/ResultCard';
import { ChainView } from './components/ChainView';
import type { SolverResult } from './lib/types';

function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<SolverResult | null>(null);
  const [solving, setSolving] = useState(false);

  const handleSolve = useCallback(() => {
    if (!input.trim()) return;
    setSolving(true);
    const worker = new Worker(
      new URL('./workers/solver.worker.ts', import.meta.url),
      { type: 'module' }
    );
    worker.postMessage(input);
    worker.onmessage = (e: MessageEvent<SolverResult>) => {
      setResult(e.data);
      setSolving(false);
      worker.terminate();
    };
    worker.onerror = () => {
      setResult({ success: false, error: 'Помилка воркера' });
      setSolving(false);
      worker.terminate();
    };
  }, [input]);

  const handleClear = useCallback(() => {
    setInput('');
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900">
      <div className="mx-auto max-w-2xl space-y-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Digital Puzzle Solver
        </h1>
        <UploadBox onInput={setInput} />
        <Controls onSolve={handleSolve} onClear={handleClear} solving={solving} />
        <ResultCard result={result} />
        {result?.success && result.steps && result.steps.length > 0 && (
          <ChainView steps={result.steps} />
        )}
      </div>
    </div>
  );
}

export default App;
