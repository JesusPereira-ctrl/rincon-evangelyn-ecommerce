// app/not-found.tsx
import { NotFoundState } from '@/components/NotFound';

export default function GlobalNotFound() {
  return (
    <NotFoundState
      title="Página no encontrada"
      description="La ruta que intentas visitar no existe."
      backHref="/"
      backLabel="Ir al inicio"
    />
  );
}
