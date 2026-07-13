'use server';

const PAGE_SIZE = 10;

import prisma from '@/prisma/libs/prisma';
import { revalidatePath } from 'next/cache';

export const findAllCategories = async ({ search = '', page = 1 }) => {
  const where = search
    ? {
        name: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }
    : {};

  const [categories, total] = await Promise.all([
    prisma.category.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { name: 'asc' },
    }),
    prisma.category.count({ where }),
  ]);

  return {
    categories,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
    total,
  };
};

export const deleteCategoryById = async (id: number): Promise<boolean> => {
  try {
    await prisma.category.delete({ where: { id: id } });

    revalidatePath('/admin/dashboard/categories');

    return true;
  } catch {
    return false;
  }
};

export async function updateCategory(
  id: number,
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
) {
  const name = formData.get('name') as string;

  if (!name || name.trim().length < 3) {
    return { error: 'El nombre debe tener al menos 3 caracteres' };
  }

  try {
    await prisma.category.update({
      where: { id },
      data: { name: name.trim() },
    });

    revalidatePath('/admin/dashboard/categories');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Ocurrió un error al actualizar la categoría.' };
  }
}

export async function findCategoryById(id: number) {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  return category;
}

export const createCategoryAction = async (
  _prevState: { error?: string; success?: boolean },
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> => {
  {
    const name = formData.get('name') as string;

    if (!name || name.trim().length === 0) {
      return { error: 'El nombre es obligatorio' };
    }

    if (name.trim().length < 3) {
      return { error: 'El nombre debe tener al menos 3 caracteres' };
    }

    try {
      const existing = await prisma.category.findFirst({
        where: { name: name.trim() },
      });

      if (existing) {
        return { error: 'Ya existe una categoría con ese nombre' };
      }

      await prisma.category.create({
        data: { name: name.trim() },
      });

      revalidatePath('/admin/dashboard/categories');
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        error: 'Ocurrió un error al crear la categoría. Intenta de nuevo.',
      };
    }
  }
};
