'use server';

import prisma from '@/prisma/libs/prisma';

// Ajusta este import a tu cliente de BD real (Prisma, Drizzle, etc.)
// import { db } from '@/lib/db';

interface CartItemInput {
  id: number;
  quantity: number;
}

export interface CheckoutItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Trae name + price REALES desde la BD para los ids del carrito
export async function getCheckoutItems(
  cartItems: CartItemInput[],
): Promise<CheckoutItem[]> {
  if (cartItems.length === 0) return [];

  const ids = cartItems.map((i) => +i.id);

  const products = await prisma.product.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, price: true },
  });

  return cartItems
    .map((item) => {
      const product = products.find((p) => +p.id === +item.id);
      if (!product) return null;
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      };
    })
    .filter((item): item is CheckoutItem => item !== null);
}

interface SubmitCheckoutInput {
  phone: string;
  address: string;
  email: string;
  cartItems: CartItemInput[]; // solo id + quantity, nunca precios del cliente
}

export async function submitCheckout(payload: SubmitCheckoutInput) {
  const { phone, address, email, cartItems } = payload;

  if (!phone || !address || !email || cartItems.length === 0) {
    return { error: 'Faltan datos requeridos.' };
  }

  try {
    // Recalculamos todo desde la BD, ignorando cualquier precio que venga del cliente
    const items = await getCheckoutItems(cartItems);

    if (items.length === 0) {
      return { error: 'No se pudieron validar los productos del carrito.' };
    }

    const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

    // 1. Guardar la orden en tu BD
    // const order = await db.order.create({
    //   data: { phone, address, email, subtotal, items: { create: items } },
    // });

    // 2. Enviar el correo de confirmación
    // await sendOrderEmail({ to: email, items, subtotal });

    return { success: true };
  } catch (err) {
    console.error('Error creando la orden:', err);
    return {
      error: 'Hubo un problema al procesar tu pedido. Intenta de nuevo.',
    };
  }
}
