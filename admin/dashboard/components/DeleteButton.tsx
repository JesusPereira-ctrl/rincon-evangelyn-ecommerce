'use client';

import { Button } from '@/components/ui/button';
import { useTransition } from 'react';

interface Props {
  idToDelete: number;
  deleteAction: (id: number) => void;
}

export const DeleteButton = ({ deleteAction, idToDelete }: Props) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAction(idToDelete);
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant="destructive"
      onClick={handleDelete}
      disabled={isPending}
    >
      {isPending ? 'Eliminando...' : 'Eliminar'}
    </Button>
  );
};
