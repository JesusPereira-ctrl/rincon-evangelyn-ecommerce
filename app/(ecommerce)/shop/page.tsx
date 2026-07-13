import { Pagination } from '@/admin/dashboard/components/Pagination';
import { findAllProducts } from '@/products/actions/action';
import { ProductCard } from '@/shop/components/ProductCard';

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number(params.page) || 1;

  const { products, totalPages, currentPage } = await findAllProducts({
    search,
    page,
  });

  return (
    <div className="container mx-auto p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Nuestra Tienda</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Explora nuestro catálogo de productos.
        </p>
      </div>

      {/* Grilla responsiva optimizada */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
