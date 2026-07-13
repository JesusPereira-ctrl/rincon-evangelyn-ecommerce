// app/(dashboard)/admin/dashboard/orders/actions/action.ts
'use server';

import { OrderStatus } from '@/prisma/generated/prisma/enums';
import prisma from '@/prisma/libs/prisma';
import { notFound } from 'next/navigation';

const PAGE_SIZE = 10;

interface FindOrdersParams {
  search?: string;
  status?: OrderStatus | '';
  page?: number;
}

export const findAllOrders = async ({
  search = '',
  status = '',
  page = 1,
}: FindOrdersParams) => {
  const where = {
    ...(search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { phone: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {}),
    ...(status ? { status } : {}),
  };

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.order.count({ where }),
  ]);

  return {
    orders,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
    total,
  };
};

export const findOrderById = async (id: number) => {
  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!order) {
    notFound();
  }

  return order;
};

export const updateOrderStatus = async (
  orderId: number,
  status: OrderStatus,
) => {
  await prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

export const toggleAdvancePayment = async (orderId: number, paid: boolean) => {
  await prisma.order.update({
    where: { id: orderId },
    data: { FiftyPercentPaged: paid },
  });
};
