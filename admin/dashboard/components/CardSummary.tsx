import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardTitle,
} from '@/components/ui/card';

interface Props {
  title: string;
  value: number;
  description: string;
}

export const CardSummary = ({ title, value, description }: Props) => {
  return (
    <Card className="bg-card text-card-foreground border-border shadow-sm flex flex-col justify-between p-2">
      {/* Encabezado: Título pequeño y el Icono alineados en los extremos */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardDescription className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </CardDescription>
      </CardHeader>

      {/* Contenido: El número principal destacado y un texto de contexto abajo */}
      <CardContent className="pt-0">
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          {value}
        </CardTitle>
        <p className="text-[11px] text-muted-foreground mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};
