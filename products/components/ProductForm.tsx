'use client';

import { useForm } from 'react-hook-form';
import { useActionState, useEffect, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createProductAction, updateProduct } from '../actions/action';
import {
  deleteProductImageFromSupabase,
  uploadProductImageToSupabase,
} from '@/supabase/actions/actions';
import Image from 'next/image';

interface Category {
  id: number;
  name: string;
}

interface Props {
  id?: number;
  action: 'create' | 'update';
  categories: Category[];
  defaultValues?: {
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    categoryId: number | null;
  };
}

interface ProductInput {
  name: string;
  price: string;
  description: string;
  image: FileList;
  categoryId: string;
}

const initialState: { error?: string; success?: boolean } = {};

export const ProductForm = ({
  id,
  action,
  categories,
  defaultValues,
}: Props) => {
  const router = useRouter();
  const isCreate = action === 'create';

  const serverAction =
    action === 'update' && id !== undefined
      ? updateProduct.bind(null, id)
      : createProductAction;

  const [state, formAction, isActionPending] = useActionState(
    serverAction,
    initialState,
  );
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isTransitionPending, startTransition] = useTransition();
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(
    defaultValues?.imageUrl ?? null,
  );

  // Imágenes marcadas para borrar del bucket, pero solo se ejecuta el borrado
  // real cuando el producto se guarda exitosamente.
  const [pendingDeletions, setPendingDeletions] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductInput>({
    defaultValues: {
      name: defaultValues?.name ?? '',
      price: defaultValues ? defaultValues.price.toString() : '',
      description: defaultValues?.description ?? '',
      categoryId: defaultValues?.categoryId?.toString() ?? '',
    },
  });

  const isPending = isActionPending || isTransitionPending || isUploadingImage;

  // Marca la imagen actual para borrar (no la borra todavía)
  const onClickDeleteImage = (imageUrl: string) => {
    setPendingDeletions((prev) => [...prev, imageUrl]);
    setCurrentImageUrl(null);
  };

  const onSubmit = async (data: ProductInput) => {
    setUploadError(null);
    let finalImageUrl = currentImageUrl;

    const hasNewImage = data.image && data.image.length > 0;

    if (hasNewImage) {
      setIsUploadingImage(true);
      try {
        finalImageUrl = await uploadProductImageToSupabase(data.image[0]);

        // Si había una imagen previa distinta a la nueva, la marcamos para borrar
        if (currentImageUrl && currentImageUrl !== finalImageUrl) {
          setPendingDeletions((prev) => [...prev, currentImageUrl]);
        }
      } catch {
        setUploadError('No se pudo subir la imagen. Intenta de nuevo.');
        setIsUploadingImage(false);
        return;
      }
      setIsUploadingImage(false);
    }

    if (!finalImageUrl && isCreate) {
      setUploadError('Debes subir una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);
    formData.append('imageUrl', finalImageUrl ?? '');
    formData.append('categoryId', data.categoryId);

    startTransition(() => {
      formAction(formData);
    });
  };

  // Solo cuando el producto se guardó exitosamente, ejecutamos los borrados reales
  useEffect(() => {
    if (state.success) {
      const cleanup = async () => {
        await Promise.all(
          pendingDeletions.map((url) => deleteProductImageFromSupabase(url)),
        );
      };
      cleanup();

      if (isCreate) reset();
      router.push('/admin/dashboard/products');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 p-8 shadow-sm dark:border-neutral-700">
      <h1 className="mb-1 text-xl font-semibold">
        {isCreate ? 'Nuevo producto' : 'Editar producto'}
      </h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {isCreate
          ? 'Agrega un nuevo producto a tu catálogo.'
          : 'Actualiza la información del producto.'}
      </p>

      {(state.error || uploadError) && (
        <div
          role="alert"
          className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
        >
          {state.error || uploadError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Ej: Audífonos inalámbricos"
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres',
              },
              maxLength: {
                value: 100,
                message: 'El nombre no puede superar los 100 caracteres',
              },
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900"
          />
          {errors.name && (
            <p className="text-sm text-red-500" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="price" className="text-sm font-medium">
            Precio
          </label>
          <div className="relative">
            <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-400">
              $
            </span>
            <input
              id="price"
              type="number"
              placeholder="0"
              {...register('price', {
                required: 'El precio es obligatorio',
                validate: (value) =>
                  parseFloat(value) > 0 || 'El precio debe ser mayor a 0',
              })}
              className="w-full rounded-md border border-gray-300 py-2 pr-3 pl-7 text-sm focus:border-indigo-600 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900"
            />
          </div>
          {errors.price && (
            <p className="text-sm text-red-500" role="alert">
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-medium">
            Descripción
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Describe el producto..."
            {...register('description', {
              required: 'La descripción es obligatoria',
              minLength: {
                value: 10,
                message: 'La descripción debe tener al menos 10 caracteres',
              },
            })}
            className="w-full resize-none rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900"
          />
          {errors.description && (
            <p className="text-sm text-red-500" role="alert">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="image" className="text-sm font-medium">
            Imagen del producto
          </label>

          <input
            id="image"
            type="file"
            accept="image/*"
            {...register('image', {
              required:
                isCreate && !currentImageUrl
                  ? 'La imagen es obligatoria'
                  : false,
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-gray-200 dark:border-neutral-600 dark:bg-neutral-900 dark:file:bg-neutral-800"
          />
          {errors.image && (
            <p className="text-sm text-red-500" role="alert">
              {errors.image.message as string}
            </p>
          )}

          {currentImageUrl && (
            <div className="group relative mt-2 flex w-28 flex-col items-center gap-2 rounded-md border bg-gray-50 p-1 dark:bg-neutral-800">
              <Image
                src={currentImageUrl}
                alt="Imagen actual"
                height={200}
                width={200}
                className="h-24 w-24 rounded-md object-cover"
              />

              <button
                type="button"
                onClick={() => onClickDeleteImage(currentImageUrl)}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white shadow-md transition-colors hover:bg-red-600"
                title="Quitar imagen"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="categoryId" className="text-sm font-medium">
            Categoría
          </label>
          <select
            id="categoryId"
            {...register('categoryId')}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-indigo-600 focus:outline-none dark:border-neutral-600 dark:bg-neutral-900"
          >
            <option value="">Sin categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={isPending} className="flex-1">
            {isUploadingImage
              ? 'Subiendo imagen...'
              : isPending
                ? isCreate
                  ? 'Creando...'
                  : 'Guardando...'
                : isCreate
                  ? 'Crear producto'
                  : 'Guardar cambios'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/dashboard/products')}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};
