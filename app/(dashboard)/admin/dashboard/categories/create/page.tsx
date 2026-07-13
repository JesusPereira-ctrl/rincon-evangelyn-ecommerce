import { CategoryForm } from '@/categories/components/CategoryForm';

export default function CreateCategoryPage() {
  return (
    <div className="flex min-h-screen  items-center justify-center ">
      <CategoryForm action={'create'} />
    </div>
  );
}
