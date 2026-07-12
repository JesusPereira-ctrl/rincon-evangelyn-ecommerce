'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaArrowRight } from 'react-icons/fa';

interface Props {
  path: string;
  label: string;
}

export default function ActiveLink({ path, label }: Props) {
  const pathName = usePathname();

  const isActive = pathName === path;

  return (
    <Link href={path} className="block mb-1">
      <div
        className={`group/enlace flex items-center justify-between w-full rounded-xl p-3 text-sm font-medium transition-colors
          ${
            isActive
              ? 'text-black bg-black dark:text-white font-semibold'
              : 'text-black dark:text-neutral-400 hover:bg-neutral-900/75  dark:hover:bg-neutral-800/50 dark:hover:text-white'
          }`}
      >
        <span
          className={
            isActive
              ? 'text-white'
              : 'group-hover/enlace:text-white transition-colors'
          }
        >
          {label}
        </span>
        <FaArrowRight
          className={`h-4 w-4 transition-colors ${
            isActive ? 'text-white' : 'group-hover/enlace:text-white'
          }`}
        />
      </div>
    </Link>
  );
}
