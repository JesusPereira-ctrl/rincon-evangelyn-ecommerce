import { findCategoryById } from '@/categories/actions/action';
import { CategoryForm } from '@/categories/components/CategoryForm';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;

  if (!id || isNaN(+id)) {
    notFound();
  }

  const category = await findCategoryById(Number(id));

  if (!category) {
    notFound();
  }

  return (
    <CategoryForm
      action="update"
      id={category.id}
      defaultValues={{ name: category.name }}
    />
  );
}
