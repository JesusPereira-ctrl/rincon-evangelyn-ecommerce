import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login');
  }

  const getDashboardSummary = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/dashboard/summary');
      if (!res.ok) throw new Error('Error en la petición');

      const data = await res.json();
      console.log('Data del Dashboard:', data); // ¡Aquí sí verás tu JSON con las métricas!
      return data;
    } catch (error) {
      console.error('Hubo un problema:', error);
    }
  };

  await getDashboardSummary();

  return (
    <div>
      <h2 className="text-4xl">¡Hola que tal Usuario Administrador!</h2>

      <p className="text-xl mt-1 text-gray-700 dark:text-gray-400">
        A continuación tienes un resumen de tu servicio
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 p-10">
        <Card className="bg-card text-card-foreground border-border shadow-sm flex flex-col justify-between p-2">
          {/* Encabezado: Título pequeño y el Icono alineados en los extremos */}
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Ventas Totales (50%)
            </CardDescription>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>

          {/* Contenido: El número principal destacado y un texto de contexto abajo */}
          <CardContent className="pt-0">
            <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
              $640,000
            </CardTitle>
            <p className="text-[11px] text-muted-foreground mt-1">
              Capital neto recaudado por anticipos
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
