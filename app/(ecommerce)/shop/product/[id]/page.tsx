import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { findProductById } from '@/products/actions/action';
import { AddToCartSection } from '@/components/AddToCart'; // <- Importamos la nueva sección
import { FiArrowLeft } from 'react-icons/fi'; // <- Cambiado por react-icons para consistencia

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = await findProductById(+id);

  return (
    <div className="container mx-auto p-6 md:p-10 max-w-5xl animate-in fade-in duration-300">
      {/* Botón de retorno usando react-icons */}
      <Link
        href="/shop"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white mb-8 transition-colors group"
      >
        <FiArrowLeft className="h-4 w-4 transform group-hover:-translate-x-0.5 transition-transform stroke-[2.5]" />
        Volver a la tienda
      </Link>

      {/* Contenedor Principal de Detalles */}
      <div className="grid gap-8 md:grid-cols-2 items-start">
        {/* Columna Izquierda: Imagen del producto */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Columna Derecha: Información e Interacción */}
        <div className="flex flex-col justify-between h-full space-y-6 md:py-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className="px-2.5 py-0.5 text-xs font-semibold"
              >
                Producto ID: {product.id}
              </Badge>
              <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0 px-2.5 py-0.5 text-xs font-semibold">
                Disponible
              </Badge>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 md:text-4xl">
              {product.name}
            </h1>

            <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              ${product.price}
            </p>

            <hr className="border-neutral-200 dark:border-neutral-700 my-2" />

            <div className="space-y-2">
              <h2 className="text-sm font-semibold tracking-wide uppercase text-neutral-400 dark:text-neutral-500">
                Descripción del artículo
              </h2>
              <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-base">
                {product.description}
              </p>
            </div>
          </div>

          {/* Nueva Zona de Compra con Contador de Items */}
          <AddToCartSection productId={product.id} productName={product.name} />
        </div>
      </div>
    </div>
  );
}
