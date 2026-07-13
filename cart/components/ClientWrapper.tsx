'use client';

import { HeaderCart } from './HeaderCart';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { OrderSummary } from './OrderSummary';
import { Product } from '@/prisma/generated/prisma/client';
import { useShoppingCartStore } from '@/store/providers/shopping-cart-store-provider';
import { useHydrated } from '@/hooks/use-hydrated';
import { EmptyCart } from './EmptyCart';
import { ProductCard } from './ProductCard';

interface Props {
  databaseProducts: Product[];
}

export const ClientWrapper = ({ databaseProducts }: Props) => {
  const isHydrated = useHydrated();

  const productsInCart = useShoppingCartStore((state) => state.products) || [];

  if (!isHydrated) {
    return (
      <div className="container mx-auto p-10 text-center text-neutral-500 animate-pulse font-medium">
        Cargando tu carrito...
      </div>
    );
  }

  const fullCartItems = productsInCart.map((cartItem) => {
    const details = databaseProducts.find((p) => p.id === cartItem.id);
    return {
      id: cartItem.id,
      description: details?.description || '',
      quantity: cartItem.quantity,
      name: details?.name || `Producto #${cartItem.id}`,
      price: details?.price || 0,
      imageUrl: details?.imageUrl || '',
    };
  });

  if (fullCartItems.length === 0) {
    return <EmptyCart />;
  }

  const totalItems = fullCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );
  const subtotal = fullCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="container mx-auto p-6 md:p-10 max-w-6xl animate-in fade-in duration-300">
      <HeaderCart products={databaseProducts} />

      <div className="grid gap-8 lg:grid-cols-3 items-start">
        {/* LISTA DE PRODUCTOS DEL CARRITO */}
        <div className="lg:col-span-2 space-y-4">
          {fullCartItems.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}

          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline pt-2 group"
          >
            <FiArrowLeft className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform" />
            Continuar comprando
          </Link>
        </div>

        {/* RESUMEN DEL PEDIDO */}
        <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-sm space-y-4 lg:sticky lg:top-6">
          <OrderSummary subtotal={subtotal} totalItems={totalItems} />
        </div>
      </div>
    </div>
  );
};
