'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaShoppingCart, FaBars } from 'react-icons/fa';
import { useShoppingCartStore } from '@/store/providers/shopping-cart-store-provider';
import { useHydrated } from '@/hooks/use-hydrated';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
} from '@/components/ui/sheet';

const NAV_LINKS = [
  { href: '/', label: 'Inicio' },
  { href: '/shop', label: 'Tienda' },
];

export const Navbar = () => {
  const pathname = usePathname();
  const products = useShoppingCartStore((state) => state.products) || [];
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);

  const totalItems = products.reduce((acc, p) => acc + p.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* IZQUIERDA: Logo */}
        <div className="flex-1 flex justify-start">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight whitespace-nowrap"
          >
            El Rincón de Evangelyn
          </Link>
        </div>

        {/* CENTRO: Desktop Menú */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* DERECHA: Carrito + Drawer */}
        <div className="flex-1 flex items-center justify-end gap-2">
          {/* Carrito */}
          <Link href="/shop/cart">
            <Button variant="outline" size="icon" className="relative">
              <FaShoppingCart size={16} />
              {hydrated && totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-medium text-white">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>

          {/* Drawer Móvil - controlado manualmente, sin SheetTrigger */}
          <div className="md:hidden">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <FaBars size={16} />
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent
                side="right"
                className="w-70 sm:w-87.5 pointer-events-auto bg-white dark:bg-neutral-950 p-6"
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-lg font-bold">
                    El Rincón de Evangelyn
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-2 mt-6">
                  {NAV_LINKS.map(({ href, label }) => {
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`rounded-md px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-gray-100 text-gray-900 dark:bg-neutral-800 dark:text-white'
                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-neutral-800 dark:hover:text-white'
                        }`}
                      >
                        {label}
                      </Link>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};
