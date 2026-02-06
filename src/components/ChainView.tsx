interface ChainViewProps {
  bestString: string;
  path: number[];
}

function pairs(s: string): string[] {
  const out: string[] = [];
  for (let i = 0; i < s.length; i += 2) {
    out.push(s.slice(i, i + 2));
  }
  return out;
}

export function ChainView({ bestString }: ChainViewProps) {
  if (!bestString) return null;

  const pairList = pairs(bestString);
  // Зв'язки — кожна друга пара (індекси 1, 3, 5, …): перетин між фрагментами
  const isConnector = (index: number) => index % 2 === 1 && index < pairList.length - 1;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Ланцюг</p>
      <div className="num mt-2 flex flex-wrap items-baseline gap-x-0.5 gap-y-1 font-mono text-gray-900 dark:text-gray-100">
        {pairList.map((block, i) => {
          const connector = isConnector(i);
          return (
            <span
              key={i}
              className={
                connector
                  ? 'rounded border border-amber-300 bg-amber-50 px-1.5 py-0.5 text-amber-800 dark:border-amber-600 dark:bg-amber-900/30 dark:text-amber-200'
                  : 'px-0.5 text-gray-800 dark:text-gray-200'
              }
              title={connector ? '2-значний перетин (зв’язок)' : undefined}
            >
              {block}
            </span>
          );
        })}
      </div>
    </div>
  );
}
