'use client';

import { PropsWithChildren, useEffect, useState } from 'react';

export function ThemeProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');

    const apply = (isDark: boolean) => {
      document.documentElement.classList.toggle('dark', isDark);
    };

    apply(mq.matches);
    mq.addEventListener('change', (e) => apply(e.matches));
  }, []);

  return <>{children}</>;
}
