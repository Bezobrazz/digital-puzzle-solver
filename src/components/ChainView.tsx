interface ChainViewProps {
  bestString: string;
  path: number[];
}

export function ChainView({ bestString }: ChainViewProps) {
  if (!bestString) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ланцюг</p>
      <p className="num mt-1 break-all font-mono text-gray-900 dark:text-gray-100">
        {bestString}
      </p>
    </div>
  );
}
