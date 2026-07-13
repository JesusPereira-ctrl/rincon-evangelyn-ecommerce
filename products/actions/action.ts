// app/(dashboard)/admin/dashboard/products/actions/action.ts
'use server';

import prisma from '@/prisma/libs/prisma';
import { deleteProductImageFromSupabase } from '@/supabase/actions/actions';
import { revalidatePath } from 'next/cache';
import { notFound } from 'next/navigation';

const PAGE_SIZE = 10;

export type ProductState = {
  error?: string;
  success?: boolean;
};

interface FindProductsParams {
  search?: string;
  page?: number;
}

export async function findAllProducts({
  search = '',
  page = 1,
}: FindProductsParams) {
  const where = search
    ? {
        name: {
          contains: search,
          mode: 'insensitive' as const,
        },
      }
    : {};

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { name: 'asc' },
      include: {
        category: true,
      },
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    totalPages: Math.ceil(total / PAGE_SIZE),
    currentPage: page,
    total,
  };
}

export async function findProductById(id: number) {
  if (!Number.isInteger(id) || id <= 0) {
    notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return product;
}

export async function createProductAction(
  _prevState: ProductState,
  formData: FormData,
): Promise<ProductState> {
  const name = formData.get('name') as string;
  const priceRaw = formData.get('price') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const categoryIdRaw = formData.get('categoryId') as string;

  if (!name || name.trim().length < 3) {
    return { error: 'El nombre debe tener al menos 3 caracteres' };
  }

  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price) || price <= 0) {
    return { error: 'El precio debe ser un número mayor a 0' };
  }

  if (!description || description.trim().length === 0) {
    return { error: 'La descripción es obligatoria' };
  }

  if (!imageUrl || imageUrl.trim().length === 0) {
    return { error: 'La URL de la imagen es obligatoria' };
  }

  const categoryId = categoryIdRaw ? Number(categoryIdRaw) : null;

  try {
    await prisma.product.create({
      data: {
        name: name.trim(),
        price,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        categoryId,
      },
    });

    revalidatePath('/admin/dashboard/products');
    return { success: true };
  } catch (error) {
    console.error(error);
    return {
      error: 'Ocurrió un error al crear el producto. Intenta de nuevo.',
    };
  }
}

export async function updateProduct(
  id: number,
  _prevState: ProductState,
  formData: FormData,
): Promise<ProductState> {
  const name = formData.get('name') as string;
  const priceRaw = formData.get('price') as string;
  const description = formData.get('description') as string;
  const imageUrl = formData.get('imageUrl') as string;
  const categoryIdRaw = formData.get('categoryId') as string;

  if (!name || name.trim().length < 3) {
    return { error: 'El nombre debe tener al menos 3 caracteres' };
  }

  const price = Number(priceRaw);
  if (!priceRaw || Number.isNaN(price) || price <= 0) {
    return { error: 'El precio debe ser un número mayor a 0' };
  }

  if (!description || description.trim().length === 0) {
    return { error: 'La descripción es obligatoria' };
  }

  if (!imageUrl || imageUrl.trim().length === 0) {
    return { error: 'La URL de la imagen es obligatoria' };
  }

  const categoryId = categoryIdRaw ? Number(categoryIdRaw) : null;

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        price,
        description: description.trim(),
        imageUrl: imageUrl.trim(),
        categoryId,
      },
    });

    revalidatePath('/admin/dashboard/products');
    return { success: true };
  } catch (error) {
    console.error(error);
    return { error: 'Ocurrió un error al actualizar el producto.' };
  }
}

export async function deleteProductById(id: number) {
  const product = await prisma.product.findUnique({
    where: { id },
    select: { imageUrl: true },
  });

  await prisma.product.delete({ where: { id } });

  if (product?.imageUrl) {
    await deleteProductImageFromSupabase(product.imageUrl);
  }

  revalidatePath('/admin/dashboard/products');
}
