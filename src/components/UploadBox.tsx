import type { ChangeEvent } from 'react';

interface UploadBoxProps {
  onInput?: (text: string) => void;
  placeholder?: string;
}

export function UploadBox({ onInput, placeholder = 'Вставте числа або текст...' }: UploadBoxProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onInput?.(e.target.value);
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white p-4 dark:border-gray-600 dark:bg-gray-800">
      <textarea
        className="min-h-[120px] w-full resize-y rounded border border-gray-200 bg-gray-50 px-3 py-2 font-sans text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
        placeholder={placeholder}
        onChange={handleChange}
        aria-label="Вхідні дані"
      />
    </div>
  );
}
