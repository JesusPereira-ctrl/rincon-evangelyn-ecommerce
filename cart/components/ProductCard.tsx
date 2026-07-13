'use client';

import { Button } from '@/components/ui/button';
import { useShoppingCartStore } from '@/store/providers/shopping-cart-store-provider';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { moneyFormatToClp } from '../../utils/utils';

interface Props {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

export const ProductCard = ({ id, imageUrl, name, price, quantity }: Props) => {
  const deleteItemOfCart = useShoppingCartStore(
    (state) => state.deleteItemOfCart,
  );
  const updateItemQuantity = useShoppingCartStore(
    (state) => state.updateItemQuantity,
  );

  return (
    <div className="flex items-center gap-4 bg-white dark:bg-neutral-950 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm transition-all hover:border-neutral-300 dark:hover:border-neutral-700">
      {/* Imagen del producto */}
      <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 border shrink-0">
        <Image
          src={imageUrl || '/placeholder.png'}
          alt={name}
          fill
          sizes="(max-width: 96px) 100vw, 96px"
          className="object-cover"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="space-y-1">
          <h3 className="font-semibold text-neutral-900 dark:text-neutral-50 truncate text-base sm:text-lg">
            {name}
          </h3>
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            {moneyFormatToClp(price)} c/u
          </p>
        </div>

        <div className="flex items-center gap-4 self-start sm:self-auto">
          {/* Control de cantidades */}
          <div className="flex items-center border border-neutral-200 dark:border-neutral-800 rounded-md bg-neutral-50 dark:bg-neutral-900 p-0.5 h-9">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-sm"
              onClick={() => updateItemQuantity(id, quantity - 1)}
            >
              <FiMinus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold select-none">
              {quantity}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-sm"
              onClick={() => updateItemQuantity(id, quantity + 1)}
            >
              <FiPlus className="h-3 w-3" />
            </Button>
          </div>

          {/* Precio acumulado por ítem */}
          <span className="text-base font-bold text-neutral-900 dark:text-neutral-50 w-20 text-right hidden sm:block">
            {moneyFormatToClp(price * quantity)}
          </span>

          {/* Botón borrar ítem solitario */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteItemOfCart(id)}
            className="text-neutral-400 hover:text-red-500 dark:hover:text-red-400 h-9 w-9"
            title="Eliminar del carrito"
          >
            <FiTrash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
