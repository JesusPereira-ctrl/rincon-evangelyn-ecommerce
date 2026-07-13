import { Separator } from '@/components/ui/separator';
import { ProceedToCheckoutButton } from './ProceedToCheckoutButton';
import { moneyFormatToClp } from '../../utils/utils';

interface Props {
  subtotal: number;
  totalItems: number;
}

export const OrderSummary = ({ totalItems, subtotal }: Props) => {
  return (
    <>
      <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        Resumen del pedido
      </h2>

      <div className="space-y-3 text-sm pt-2">
        <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
          <span>Subtotal ({totalItems} productos)</span>
          <span className="font-medium text-neutral-900 dark:text-neutral-100">
            {moneyFormatToClp(subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-neutral-500 dark:text-neutral-400">
          <span>Costo de envío</span>
          <span className="font-semibold text-emerald-500 uppercase text-xs tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
            Gratis
          </span>
        </div>

        <Separator className="my-2 dark:bg-neutral-800" />

        <div className="flex justify-between text-base font-bold text-neutral-900 dark:text-neutral-50 pt-1">
          <span>Total estimado</span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            {moneyFormatToClp(subtotal)}
          </span>
        </div>

        <ProceedToCheckoutButton />
      </div>
    </>
  );
};
