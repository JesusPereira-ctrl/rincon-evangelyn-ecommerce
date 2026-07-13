import { createClient } from '@/supabase/libs/server';
import { redirect } from 'next/navigation';
import { getSummaryOfTheStore } from '@/admin/dashboard/actions/action';
import { CardSummary } from '@/admin/dashboard/components/CardSummary';

export const metadata = {
  title: 'Dashboard General',
  description: 'SEO Title',
};

export default async function DashboardPage() {
  const { totalProducts, totalCategories } = await getSummaryOfTheStore();

  const cardProps = [
    {
      title: 'Total de categorías',
      value: totalCategories,
      description: 'Categorías en total en el negocio',
    },
    {
      title: 'Total de productos',
      value: totalProducts,
      description: 'Productos en total en el negocio',
    },
  ];

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div>
      <h2 className="text-4xl">¡Hola que tal Usuario Administrador!</h2>

      <p className="text-xl mt-1 text-gray-700 dark:text-gray-400">
        A continuación tienes un resumen de tu servicio
      </p>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 p-10">
        {cardProps.map((item) => (
          <CardSummary
            key={item.title}
            title={item.title}
            description={item.description}
            value={item.value}
          />
        ))}
      </div>
    </div>
  );
}
