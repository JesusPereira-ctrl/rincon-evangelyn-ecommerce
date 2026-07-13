import { useShoppingCartStore } from '@/store/providers/shopping-cart-store-provider';
import { ClearCartButton } from './ClearCartButton';

interface ProductDetails {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface Props {
  products: ProductDetails[];
}

export const HeaderCart = ({ products }: Props) => {
  const productsInCart = useShoppingCartStore((state) => state.products) || [];
  const fullCartItems = productsInCart.map((cartItem) => {
    const details = products.find((p) => p.id === cartItem.id);
    return {
      id: cartItem.id,
      quantity: cartItem.quantity,
      name: details?.name || `Producto #${cartItem.id}`,
      price: details?.price || 0,
      imageUrl: details?.imageUrl || '',
    };
  });

  const totalItems = fullCartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tu Carrito</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
          Tienes {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}{' '}
          listos para procesar.
        </p>
      </div>
      <ClearCartButton />
    </div>
  );
};
