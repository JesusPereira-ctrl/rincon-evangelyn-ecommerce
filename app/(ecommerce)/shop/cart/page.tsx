import { ClientWrapper } from '@/cart/components/ClientWrapper';
import { findAllProducts } from '@/products/actions/action';

export default async function CartPage() {
  const products = await findAllProducts({});

  return <ClientWrapper databaseProducts={products.products} />;
}
