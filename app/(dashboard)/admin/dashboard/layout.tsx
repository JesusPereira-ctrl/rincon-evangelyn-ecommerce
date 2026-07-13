import {
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
  Sidebar,
  SidebarFooter,
  SidebarContent,
} from '@/components/ui/sidebar';
import { FaUserCircle } from 'react-icons/fa';
import { redirect } from 'next/navigation';
import { createClient } from '@/supabase/libs/server';
import LogoutButton from '@/admin/dashboard/components/LogoutButton';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ActiveLink from '@/admin/dashboard/components/ActiveLink';

const dashboardRoute = [
  {
    path: '/admin/dashboard',
    label: 'Descripción General',
  },
  {
    path: '/admin/dashboard/products',
    label: 'Productos',
  },
  {
    path: '/admin/dashboard/categories',
    label: 'Categorías',
  },
  {
    path: '/admin/dashboard/orders',
    label: 'Ordenes',
  },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  return (
    <div>
      <SidebarProvider>
        <Sidebar>
          <SidebarHeader>
            <header className="flex py-4 flex-col items-center gap-6">
              <div>
                <FaUserCircle size={40} />
              </div>
              <div>{user.email}</div>
              <Badge variant={'default'}>Admin Dashboard</Badge>
            </header>
          </SidebarHeader>
          <Separator />
          <SidebarContent className="px-3 py-2">
            {dashboardRoute.map((route) => (
              <ActiveLink key={route.path} {...route} />
            ))}
          </SidebarContent>
          <SidebarFooter className="py-10">
            <LogoutButton />
          </SidebarFooter>
        </Sidebar>
        <main className="flex-1 w-full min-h-screen">
          {/* Barra superior fija para el botón (Trigger), dándole su propio espacio aislado */}
          <div className="flex h-16 items-center border-b dark:border-neutral-700 border-gray-200 px-6">
            <SidebarTrigger />
          </div>

          {/* El contenido de tus páginas (children) con su respectivo padding */}
          <div className="p-6">{children}</div>
        </main>
      </SidebarProvider>
    </div>
  );
}
