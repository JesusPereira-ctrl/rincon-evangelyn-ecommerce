import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Props {
  title?: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

export const NotFoundState = ({
  title = 'Recurso no encontrado',
  description = 'El elemento que buscas no existe o fue eliminado.',
  backHref = '/',
  backLabel = 'Volver a la tienda',
}: Props) => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-3 p-6 text-center">
      <h1 className="text-2xl font-semibold">{title}</h1>
      <p className="max-w-sm text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
      <Link href={backHref} className="mt-4">
        <Button variant="outline">{backLabel}</Button>
      </Link>
    </div>
  );
};
