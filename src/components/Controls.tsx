interface ControlsProps {
  onSolve?: () => void;
  onClear?: () => void;
  solving?: boolean;
}

export function Controls({ onSolve, onClear, solving = false }: ControlsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={onSolve}
        disabled={solving}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {solving ? 'Обчислення…' : 'Розв’язати'}
      </button>
      <button
        type="button"
        onClick={onClear}
        disabled={solving}
        className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 disabled:opacity-50"
      >
        Очистити
      </button>
    </div>
  );
}
