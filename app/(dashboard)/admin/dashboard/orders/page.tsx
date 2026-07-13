import { SearchInput } from '@/admin/dashboard/components/InputSearch';
import { Pagination } from '@/admin/dashboard/components/Pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { findAllOrders } from '@/orders/actions/action';
import { ContactButton } from '@/orders/components/ContactButton';
import Link from 'next/link';

interface PageProps {
  searchParams: Promise<{ search?: string; page?: string }>;
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendiente',
  ADVANCE_PAYMENT_MADE: 'Anticipo pagado',
  CANCELLED: 'Cancelada',
  COMPLETED: 'Completada',
};

const STATUS_STYLES: Record<string, string> = {
  PENDING:
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400',
  ADVANCE_PAYMENT_MADE:
    'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400',
  CANCELLED: 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400',
  COMPLETED:
    'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400',
};

export default async function OrdersPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search ?? '';
  const page = Number(params.page) || 1;

  const { orders, totalPages, currentPage } = await findAllOrders({
    search,
    page,
  });

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Órdenes</h1>

        <div className="flex items-center gap-3">
          <SearchInput
            defaultValue={search}
            placeHolder="Buscar por email o teléfono..."
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Anticipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center text-gray-500">
                No se encontraron órdenes
              </TableCell>
            </TableRow>
          ) : (
            orders.map(
              ({ id, email, phone, totalPrice, status, FiftyPercentPaged }) => (
                <TableRow key={id}>
                  <TableCell>{id}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{phone}</TableCell>
                  <TableCell>${(totalPrice / 100).toFixed(2)}</TableCell>
                  <TableCell>
                    {FiftyPercentPaged ? (
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-400">
                        ✓ Pagado
                      </span>
                    ) : (
                      <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 dark:bg-neutral-800 dark:text-gray-400">
                        Pendiente
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${STATUS_STYLES[status]}`}
                    >
                      {STATUS_LABELS[status]}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <ContactButton type="email" href={`mailto:${email}`} />
                      <ContactButton
                        type="whatsapp"
                        href={`https://wa.me/${phone.replace(
                          /\D/g,
                          '',
                        )}?text=${encodeURIComponent(
                          `Hola, te contactamos sobre tu orden #${id}.`,
                        )}`}
                      />
                      <Link href={`/admin/dashboard/orders/${id}`}>
                        <Button variant="outline" size="sm">
                          Ver detalle
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ),
            )
          )}
        </TableBody>
      </Table>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
