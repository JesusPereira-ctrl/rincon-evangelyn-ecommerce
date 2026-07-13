'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from '@/components/ui/card';

const InputSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.email('Formato de correo inválido').min(1, 'El correo es requerido'),
  subject: z.string().min(1, 'El asunto es requerido'),
  message: z.string().min(1, 'El mensaje es requerido'),
});

type InputSchemaType = z.infer<typeof InputSchema>;

export const FormContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<InputSchemaType>({
    resolver: zodResolver(InputSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit: SubmitHandler<InputSchemaType> = async (data) => {
    console.log('Datos limpios y validados:', data);

    reset();
  };

  return (
    <Card className="md:col-span-2 border-gray-200 dark:border-neutral-800 shadow-sm flex flex-col justify-between h-full">
      <div>
        <CardHeader>
          <CardTitle className="text-xl">Envíanos un mensaje</CardTitle>
          <CardDescription>
            Te responderemos de vuelta a tu correo electrónico lo antes posible.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className={errors.name ? 'text-red-500' : ''}
                >
                  Nombre
                </Label>
                <Input
                  id="name"
                  placeholder="Tu nombre"
                  {...register('name')}
                  className={`bg-white dark:bg-neutral-900 ${errors.name ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.name && (
                  <p className="text-xs font-medium text-red-500 dark:text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className={errors.email ? 'text-red-500' : ''}
                >
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="nombre@correo.com"
                  {...register('email')}
                  className={`bg-white dark:bg-neutral-900 ${errors.email ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                />
                {errors.email && (
                  <p className="text-xs font-medium text-red-500 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="subject"
                className={errors.subject ? 'text-red-500' : ''}
              >
                Asunto
              </Label>
              <Input
                id="subject"
                placeholder="¿En qué te podemos ayudar?"
                {...register('subject')}
                className={`bg-white dark:bg-neutral-900 ${errors.subject ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.subject && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="message"
                className={errors.message ? 'text-red-500' : ''}
              >
                Mensaje
              </Label>
              <Textarea
                id="message"
                placeholder="Cuéntanos con detalle qué tienes en mente..."
                rows={5}
                {...register('message')}
                className={`bg-white dark:bg-neutral-900 resize-none ${errors.message ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
              />
              {errors.message && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">
                  {errors.message.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full sm:w-auto px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </Button>
          </form>
        </CardContent>
      </div>
    </Card>
  );
};
