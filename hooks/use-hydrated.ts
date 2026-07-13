// hooks/use-hydrated.ts
'use client';

import { useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export const useHydrated = () => {
  return useSyncExternalStore(
    emptySubscribe,
    () => true, // valor en el cliente
    () => false, // valor en el servidor
  );
};
