import type { SolverResult } from '../lib/types';

interface ResultCardProps {
  result: SolverResult | null;
}

export function ResultCard({ result }: ResultCardProps) {
  if (!result) return null;

  if (!result.success) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200">
        <p className="font-medium">Помилка</p>
        <p className="mt-1 text-sm">{result.error}</p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
      <p className="font-medium text-gray-900 dark:text-gray-100">Результат</p>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Знайдено кроків: <span className="num font-mono">{result.steps?.length ?? 0}</span>
      </p>
    </div>
  );
}
