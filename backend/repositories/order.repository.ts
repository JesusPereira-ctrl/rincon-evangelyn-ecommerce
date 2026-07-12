import prisma from '../prisma';

export const getTotalRegisteredOrders = async () => {
  const totalOrders = await prisma.order.count();
  return totalOrders;
};

export const getTotalEarnings = async () => {
  const totalEarnings = await prisma.order.aggregate({
    _sum: {
      totalPrice: true,
    },
  });

  return totalEarnings._sum.totalPrice ?? 0;
};
