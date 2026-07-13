import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ProductCart {
  id: number;
  quantity: number;
}

export type ShoppingCartState = {
  products: ProductCart[];
};

export type ShoppingCartActions = {
  addItemToCart: (product: ProductCart) => void;
  deleteItemOfCart: (productId: number) => void;
  updateItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

export type ShoppingCartStore = ShoppingCartState & ShoppingCartActions;

export const defaultInitState: ShoppingCartState = {
  products: [],
};

export const createShoppingCartStore = (
  initState: ShoppingCartState = defaultInitState,
) => {
  return create<ShoppingCartStore>()(
    persist(
      (set, get) => ({
        ...initState,

        addItemToCart: (product) => {
          set((state) => {
            const existingProduct = state.products.find(
              (p) => p.id === product.id,
            );

            if (existingProduct) {
              return {
                products: state.products.map((p) =>
                  p.id === product.id
                    ? { ...p, quantity: p.quantity + product.quantity }
                    : p,
                ),
              };
            }

            return {
              products: [...state.products, product],
            };
          });
        },

        deleteItemOfCart: (productId) => {
          set((state) => ({
            products: state.products.filter((p) => p.id !== productId),
          }));
        },

        updateItemQuantity: (productId, quantity) => {
          if (quantity <= 0) {
            get().deleteItemOfCart(productId);
            return;
          }

          set((state) => ({
            products: state.products.map((p) =>
              p.id === productId ? { ...p, quantity } : p,
            ),
          }));
        },

        clearCart: () => set({ products: [] }),
      }),
      {
        name: 'shopping-cart-storage',
        storage: createJSONStorage(() => localStorage),
      },
    ),
  );
};
