'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
  };
}

export function ProductCard({ product }: ProductProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el clic en el botón active el Link del padre
    console.log(`Añadido al carrito: ${product.name}`);
    alert(`${product.name} añadido al carrito`);
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-neutral-700 group">
      {/* Todo este bloque redirige al detalle */}
      <Link
        href={`/shop/product/${product.id}`}
        className="block cursor-pointer"
      >
        {/* Contenedor de la imagen con overlay de "Ver detalle" */}
        <div className="relative aspect-square w-full bg-gray-100 dark:bg-neutral-800 overflow-hidden">
          <Image
            src={product.imageUrl || '/placeholder.png'}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Capa oscura explícita que aparece en HOVER */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-white/90 text-neutral-900 dark:bg-neutral-900/90 dark:text-white px-4 py-2 rounded-full text-sm font-medium shadow-md flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              Ver detalles
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
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
          </div>
        </div>

        <CardHeader className="p-4 pb-2">
          <div className="flex items-start justify-between gap-2">
            {/* El título cambia de color al pasar el mouse por cualquier parte de la tarjeta */}
            <CardTitle className="text-lg font-semibold line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {product.name}
            </CardTitle>
            <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
              ${product.price}
            </span>
          </div>
          <CardDescription className="line-clamp-2 mt-1">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Link>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        {/* Enlace de texto explícito abajo por si no pasan el mouse por la foto */}
        <Link
          href={`/shop/product/${product.id}`}
          className="text-xs text-center font-medium text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors py-1 w-full"
        >
          Más información del producto
        </Link>

        <Button className="w-full" onClick={handleAddToCart}>
          Añadir al carrito
        </Button>
      </CardFooter>
    </Card>
  );
}
