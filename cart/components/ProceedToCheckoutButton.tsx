import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const ProceedToCheckoutButton = () => {
  return (
    <Link href={'/shop/checkout'}>
      <Button
        size="lg"
        className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md rounded-lg mt-4 active:scale-[0.99] transition-transform"
      >
        Proceder al pago
      </Button>
    </Link>
  );
};
