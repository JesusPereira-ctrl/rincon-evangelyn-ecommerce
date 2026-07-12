import prisma from '../prisma';

export const getTotalRegisteredProducts = async (): Promise<number> => {
  const totalProducts = await prisma.product.count();
  return totalProducts;
};
