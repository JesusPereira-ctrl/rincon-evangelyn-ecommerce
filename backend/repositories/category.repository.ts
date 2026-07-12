import { Category, Prisma } from '@/prisma/generated/prisma/client';
import prisma from '../prisma';

export const createCategory = async (name: string): Promise<Category> => {
  try {
    return await prisma.category.create({
      data: {
        name: name,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2002'
    ) {
      throw new Error('DUPLICATE_CATEGORY_NAME');
    }
    throw new Error('CATEGORY_CREATE_FAILED');
  }
};

export const deleteCategory = async (id: number): Promise<boolean> => {
  try {
    await prisma.category.delete({ where: { id } });
    return true;
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      throw new Error('CATEGORY_NOT_FOUND');
    }
    throw new Error('CATEGORY_DELETE_FAILED');
  }
};

export const findAllCategories = async (): Promise<Category[]> => {
  return await prisma.category.findMany();
};

export const findCategoryById = async (
  id: number,
): Promise<Category | null> => {
  return await prisma.category.findUnique({ where: { id: id } });
};

export const findAllCategoryByName = async (
  name: string,
): Promise<Category[]> => {
  return await prisma.category.findMany({
    where: { name: { contains: name, mode: 'insensitive' } },
  });
};
