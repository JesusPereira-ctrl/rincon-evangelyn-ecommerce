'use client';

import { useForm } from 'react-hook-form';
import { useActionState, useTransition } from 'react';
import { loginAction, LoginState } from '@/supabase/actions/actions';
import { Button } from '@/components/ui/button';

type SignInInput = {
  email: string;
  password: string;
};

const initialState: LoginState = {};

export const FormLogin = () => {
  const [state, formAction, isActionPending] = useActionState(
    loginAction,
    initialState,
  );
  const [isTransitionPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>();

  const onSubmit = (data: SignInInput) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);

    startTransition(() => {
      formAction(formData);
    });
  };

  const isPending = isActionPending || isTransitionPending;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-sm rounded-lg p-8 shadow-md dark:border dark:border-neutral-500"
    >
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Panel de administración
      </h1>

      {state.error && (
        <div
          role="alert"
          className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400"
        >
          {state.error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Correo
        </label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'El correo electrónico es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'El formato del correo no es válido',
            },
          })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-400" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="mb-1 block text-sm font-medium">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'La contraseña es obligatoria',
          })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-600 focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-400" role="alert">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </form>
  );
};
