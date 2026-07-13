import { DeleteButton } from '@/admin/dashboard/components/DeleteButton';
import { SearchInput } from '@/admin/dashboard/components/InputSearch';
import { Pagination } from '@/admin/dashboard/components/Pagination';
import { Button } from '@/components/ui/button';
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@/components/ui/table';
import { deleteProductById, findAllProducts } from '@/products/actions/action';
import { moneyFormatToClp } from '@/utils/utils';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number(params.page) || 1;

  const { products, totalPages, currentPage } = await findAllProducts({
    search,
    page,
  });

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categorías</h1>

        <div className="flex items-center gap-3">
          <SearchInput defaultValue={search} placeHolder="Buscar producto..." />
          <Link href="/admin/dashboard/products/create">
            <Button>Nuevo producto</Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoría</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                No se encontraron productos
              </TableCell>
            </TableRow>
          ) : (
            products.map(({ id, name, price, category }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{moneyFormatToClp(price)}</TableCell>
                <TableCell>{category?.name ?? 'Sin categoría'}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/dashboard/products/edit/${id}`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <DeleteButton
                      idToDelete={id}
                      deleteAction={deleteProductById}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
