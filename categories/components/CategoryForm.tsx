'use client';

import { useForm } from 'react-hook-form';
import { useActionState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { createCategoryAction, updateCategory } from '../actions/action';

interface Props {
  id?: number;
  action: 'create' | 'update';
  defaultValues?: {
    name: string;
  };
}

interface CategoryInput {
  name: string;
}

const initialState: { error?: string; success?: boolean } = {};

export const CategoryForm = ({ id, action, defaultValues }: Props) => {
  const router = useRouter();

  const serverAction =
    action === 'update' && id !== undefined
      ? updateCategory.bind(null, id)
      : createCategoryAction;

  const [state, formAction, isActionPending] = useActionState(
    serverAction,
    initialState,
  );
  const [isTransitionPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryInput>({
    defaultValues: {
      name: defaultValues?.name ?? '',
    },
  });

  const isPending = isActionPending || isTransitionPending;

  const onSubmit = (data: CategoryInput) => {
    const formData = new FormData();
    formData.append('name', data.name);

    startTransition(() => {
      formAction(formData);
    });
  };

  useEffect(() => {
    if (state.success) {
      if (action === 'create') reset();
      router.push('/admin/dashboard/categories');
    }
  }, [state.success, reset, router, action]);

  const isCreate = action === 'create';

  return (
    <div className="mx-auto w-full max-w-md rounded-lg border border-gray-200 p-8 shadow-sm dark:border-neutral-700">
      <h1 className="mb-1 text-xl font-semibold">
        {isCreate ? 'Nueva categoría' : 'Editar categoría'}
      </h1>
      <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
        {isCreate
          ? 'Crea una nueva categoría para organizar tus productos.'
          : 'Actualiza el nombre de la categoría.'}
      </p>

      {state.error && (
        <div
          role="alert"
          className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
        >
          {state.error}
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
            placeholder="Ej: Electrónica"
            {...register('name', {
              required: 'El nombre es obligatorio',
              minLength: {
                value: 3,
                message: 'El nombre debe tener al menos 3 caracteres',
              },
              maxLength: {
                value: 50,
                message: 'El nombre no puede superar los 50 caracteres',
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

        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={isPending} className="flex-1">
            {isPending
              ? isCreate
                ? 'Creando...'
                : 'Guardando...'
              : isCreate
                ? 'Crear categoría'
                : 'Guardar cambios'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/dashboard/categories')}
            disabled={isPending}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </div>
  );
};
