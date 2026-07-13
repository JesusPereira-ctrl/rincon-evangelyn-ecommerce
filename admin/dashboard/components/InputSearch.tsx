// app/(dashboard)/admin/dashboard/categories/components/CategorySearchInput.tsx
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

interface Props {
  defaultValue: string;
  placeHolder: string;
}

export const SearchInput = ({ defaultValue, placeHolder }: Props) => {
  const [value, setValue] = useState(defaultValue);
  const [, startTransition] = useTransition();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);

      if (value) {
        params.set('search', value);
      } else {
        params.delete('search');
      }
      params.set('page', '1'); // reinicia a la página 1 en cada búsqueda nueva

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    }, 400); // debounce de 400ms

    return () => clearTimeout(timeout);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <input
      type="text"
      placeholder={placeHolder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-64 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900"
    />
  );
};
