import type { ChainStep } from '../lib/types';

interface ChainViewProps {
  steps: ChainStep[];
}

export function ChainView({ steps }: ChainViewProps) {
  if (steps.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {steps.map((step, i) => (
        <span key={i} className="num inline-flex items-center font-mono">
          <span className="rounded bg-gray-100 px-2 py-1 dark:bg-gray-700">
            {step.value}
          </span>
          {i < steps.length - 1 && (
            <span className="text-gray-400 dark:text-gray-500" aria-hidden>
              →
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
