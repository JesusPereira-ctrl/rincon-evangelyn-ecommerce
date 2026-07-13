import { findAllCategories } from '@/categories/actions/action';
import { findProductById } from '@/products/actions/action';
import { ProductForm } from '@/products/components/ProductForm';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await findProductById(Number(id));
  const { categories } = await findAllCategories({});

  return (
    <ProductForm
      action="update"
      id={product.id}
      categories={categories}
      defaultValues={{
        name: product.name,
        price: product.price,
        description: product.description,
        imageUrl: product.imageUrl,
        categoryId: product.categoryId,
      }}
    />
  );
}
