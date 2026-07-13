'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import { useStore } from 'zustand';
import {
  createShoppingCartStore,
  type ShoppingCartStore,
} from '@/store/shopping-cart/shoppingCartStore';

export type ShoppingCartStoreApi = ReturnType<typeof createShoppingCartStore>;

export const ShoppingCartStoreContext = createContext<
  ShoppingCartStoreApi | undefined
>(undefined);

export interface ShoppingCartStoreProviderProps {
  children: ReactNode;
}

export const ShoppingCartStoreProvider = ({
  children,
}: ShoppingCartStoreProviderProps) => {
  const [store] = useState(() => createShoppingCartStore());

  return (
    <ShoppingCartStoreContext.Provider value={store}>
      {children}
    </ShoppingCartStoreContext.Provider>
  );
};

export const useShoppingCartStore = <T,>(
  selector: (store: ShoppingCartStore) => T,
): T => {
  const shoppingCartStoreContext = useContext(ShoppingCartStoreContext);

  if (!shoppingCartStoreContext) {
    throw new Error(
      'useShoppingCartStore debe usarse dentro de <ShoppingCartStoreProvider>',
    );
  }

  return useStore(shoppingCartStoreContext, selector);
};
