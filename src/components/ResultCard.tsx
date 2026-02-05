import type { SolveResult } from '../lib/types';

interface ResultCardProps {
  result: SolveResult | null;
  error: string | null;
}

export function ResultCard({ result, error }: ResultCardProps) {
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
        <p className="font-medium">Помилка</p>
        <p className="mt-1 text-sm">{error}</p>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
      <p className="font-medium text-gray-900 dark:text-gray-100">Результат</p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Довжина: <span className="num font-mono">{result.bestLen}</span>, фрагментів:{' '}
        <span className="num font-mono">{result.usedCount}</span>, відвідано{' '}
        <span className="num font-mono">{result.visited}</span>,{' '}
        <span className="num font-mono">{result.elapsedMs}</span> ms
      </p>
    </div>
  );
}
