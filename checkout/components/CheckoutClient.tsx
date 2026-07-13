'use client';

import { useEffect, useState, useTransition } from 'react';
import { useShoppingCartStore } from '@/store/providers/shopping-cart-store-provider';
import { Button } from '@/components/ui/button';
import {
  getCheckoutItems,
  submitCheckout,
  type CheckoutItem,
} from '../actions/action';

export function CheckoutClient() {
  const cartItems = useShoppingCartStore((state) => state.products) || [];
  const [items, setItems] = useState<CheckoutItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Trae name + price reales desde la BD apenas se monta el checkout
  useEffect(() => {
    if (cartItems.length === 0) {
      setLoadingItems(false);
      return;
    }

    getCheckoutItems(cartItems.map((p) => ({ id: p.id, quantity: p.quantity })))
      .then(setItems)
      .finally(() => setLoadingItems(false));
  }, [cartItems]);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;
    const email = formData.get('email') as string;

    if (!phone || !address || !email) {
      setError('Por favor completa todos los campos.');
      return;
    }

    startTransition(async () => {
      const result = await submitCheckout({
        phone,
        address,
        email,
        cartItems: cartItems.map((p) => ({ id: p.id, quantity: p.quantity })),
      });

      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
      }
    });
  };

  if (loadingItems) {
    return (
      <p className="text-gray-500 dark:text-gray-400">Cargando tu orden...</p>
    );
  }

  if (items.length === 0 && !success) {
    return (
      <p className="text-gray-500 dark:text-gray-400">Tu carrito está vacío.</p>
    );
  }

  if (success) {
    return (
      <div className="rounded-md border border-green-200 bg-green-50 p-6 dark:border-green-900 dark:bg-green-950">
        <p className="font-medium text-green-800 dark:text-green-200">
          ¡Pedido recibido! Te enviamos un correo con los detalles.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2">
      {/* Resumen de orden */}
      <div className="rounded-md border border-gray-200 p-6 dark:border-neutral-800 h-fit">
        <h2 className="text-lg font-semibold mb-4">Resumen de tu orden</h2>

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                {item.name}{' '}
                <span className="text-gray-400">x{item.quantity}</span>
              </span>
              <span className="font-medium">
                ${(item.price * item.quantity).toLocaleString('es-CL')}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t border-gray-200 pt-4 dark:border-neutral-800">
          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toLocaleString('es-CL')}</span>
          </div>
        </div>
      </div>

      {/* Formulario de datos de envío */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold">Datos de envío</h2>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-medium">
            Número de teléfono
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="+56 9 1234 5678"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="address" className="text-sm font-medium">
            Dirección
          </label>
          <input
            id="address"
            name="address"
            type="text"
            required
            placeholder="Calle, número, comuna"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="tu@correo.com"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <Button type="submit" disabled={isPending} className="mt-2">
          {isPending ? 'Enviando...' : 'Confirmar pedido'}
        </Button>
      </form>
    </div>
  );
}
