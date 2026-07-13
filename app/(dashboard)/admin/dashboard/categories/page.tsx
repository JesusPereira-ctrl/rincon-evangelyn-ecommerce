// app/(dashboard)/admin/dashboard/categories/page.tsx

import { DeleteButton } from '@/admin/dashboard/components/DeleteButton';
import { SearchInput } from '@/admin/dashboard/components/InputSearch';
import { Pagination } from '@/admin/dashboard/components/Pagination';
import {
  deleteCategoryById,
  findAllCategories,
} from '@/categories/actions/action';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

export default async function CategoriesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number(params.page) || 1;

  const { categories, totalPages, currentPage } = await findAllCategories({
    search,
    page,
  });

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Categorías</h1>

        <div className="flex items-center gap-3">
          <SearchInput
            defaultValue={search}
            placeHolder="Buscar categoría..."
          />
          <Link href="/admin/dashboard/categories/create">
            <Button>Nueva categoría</Button>
          </Link>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-500">
                No se encontraron categorías
              </TableCell>
            </TableRow>
          ) : (
            categories.map(({ id, name }) => (
              <TableRow key={id}>
                <TableCell>{id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/dashboard/categories/edit/${id}`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <DeleteButton
                      idToDelete={id}
                      deleteAction={deleteCategoryById}
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
