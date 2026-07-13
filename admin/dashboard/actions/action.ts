'use server';

import prisma from '@/prisma/libs/prisma';

export const getSummaryOfTheStore = async () => {
  const totalCategories = await prisma.category.count();
  const totalProducts = await prisma.product.count();

  return {
    totalCategories,
    totalProducts,
  };
};
