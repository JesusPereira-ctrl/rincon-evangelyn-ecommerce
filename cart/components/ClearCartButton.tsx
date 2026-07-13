'use client';

import { Button } from '@/components/ui/button';
import { useShoppingCartStore } from '@/store/providers/shopping-cart-store-provider';
import { FiTrash2 } from 'react-icons/fi';

export const ClearCartButton = () => {
  const clearCart = useShoppingCartStore((state) => state.clearCart);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={clearCart}
      className="text-red-500 hover:text-red-600 dark:hover:bg-red-950/30 border-red-200 dark:border-red-900/50 gap-1.5 self-end md:self-auto"
    >
      <FiTrash2 className="h-4 w-4" /> Vaciar carrito
    </Button>
  );
};
