import { CheckoutClient } from '@/checkout/components/CheckoutClient';

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-2xl font-bold mb-8">Finalizar compra</h1>
      <CheckoutClient />
    </div>
  );
}
