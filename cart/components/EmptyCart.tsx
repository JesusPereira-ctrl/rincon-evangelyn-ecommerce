import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';

export const EmptyCart = () => {
  return (
    <div className="container mx-auto p-6 md:p-10 max-w-2xl text-center space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-center">
        <div className="p-6 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400 dark:text-neutral-500">
          <FiShoppingBag className="h-16 w-16" />
        </div>
      </div>
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">
          Tu carrito está vacío
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto">
          Parece que aún no has añadido productos a tu carrito de compras.
        </p>
      </div>
      <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-11">
        <Link href="/shop">Explorar la tienda</Link>
      </Button>
    </div>
  );
};
