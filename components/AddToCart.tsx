'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FiMinus, FiPlus, FiShoppingCart } from 'react-icons/fi';
import { useShoppingCartStore } from '@/store/providers/shopping-cart-store-provider';

interface AddToCartSectionProps {
  productId: number;
  productName: string;
}

export function AddToCartSection({ productId }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useShoppingCartStore((state) => state.addItemToCart);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({ id: productId, quantity: quantity });
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Selector de Cantidad Estilizado */}
        <div className="flex items-center justify-between border border-neutral-200 dark:border-neutral-700 rounded-lg bg-neutral-50 dark:bg-neutral-900/50 p-1 h-12 w-full sm:w-32 shadow-sm">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={decrement}
            className="h-9 w-9 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
            disabled={quantity <= 1}
          >
            <FiMinus className="h-4 w-4" />
          </Button>

          <span className="text-base font-semibold w-8 text-center select-none text-neutral-800 dark:text-neutral-200">
            {quantity}
          </span>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={increment}
            className="h-9 w-9 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
          >
            <FiPlus className="h-4 w-4" />
          </Button>
        </div>

        {/* Botón de Añadir al Carrito Modernizado */}
        <Button
          size="lg"
          onClick={handleAddToCart}
          className="flex-1 h-12 text-base font-medium bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all active:scale-[0.98] flex items-center justify-center gap-2 rounded-lg"
        >
          <FiShoppingCart className="h-5 w-5" />
          Añadir al carrito
        </Button>
      </div>
    </div>
  );
}
