import { Footer } from '@/ecommerce/components/Footer';
import { Navbar } from '@/ecommerce/components/Navbar';

export default function EcommerceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
