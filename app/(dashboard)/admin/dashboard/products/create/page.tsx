import { findAllCategories } from '@/categories/actions/action';
import { ProductForm } from '@/products/components/ProductForm';

export default async function CreateProductPage() {
  const { categories } = await findAllCategories({});

  return <ProductForm action="create" categories={categories} />;
}
