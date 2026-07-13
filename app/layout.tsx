import { TooltipProvider } from '@/components/ui/tooltip';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/theme/theme-provider';
import { ShoppingCartStoreProvider } from '@/store/providers/shopping-cart-store-provider';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata = {
  // El título que aparece en la pestaña del navegador (Máximo 50-60 caracteres)
  title: 'El Rincón de Evangelyn | Artesanía Rural y Hecha a Mano',

  // La descripción que Google muestra en los resultados (Máximo 150-160 caracteres)
  description:
    'Descubre artesanías auténticas con alma rural. Productos hechos a mano, únicos y con la calidez de nuestras tradiciones. Envíos a todo el país.',

  // Palabras clave (Aunque Google ya no las pondera tanto, otros buscadores sí)
  keywords: [
    'artesanía rural',
    'hecho a mano',
    'productos rústicos',
    'regalos artesanales',
    'El Rincón de Evangelyn',
  ],

  // Autores y creadores
  authors: [{ name: 'Evangelyn' }],
  creator: 'Evangelyn',

  // Configuración para los robots de Google (Indexar la página y seguir sus enlaces)
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Open Graph: Así se verá tu tienda cuando compartas el link por WhatsApp, Facebook o Instagram
  openGraph: {
    title: 'El Rincón de Evangelyn | Artesanía Rural',
    description:
      'Productos únicos hechos a mano y con la calidez de nuestras tradiciones del campo.',
    url: 'https://www.elrincondeevangelyn.cl', // Cambia por tu dominio real
    siteName: 'El Rincón de Evangelyn',
    images: [
      {
        url: 'https://www.elrincondeevangelyn.cl/og-image.jpg', // Foto miniatura de tu tienda (1200x630px recomendado)
        width: 1200,
        height: 630,
        alt: 'Artesanías de El Rincón de Evangelyn',
      },
    ],
    locale: 'es_CL', // O es_MX, es_ES según tu país
    type: 'website',
  },

  // Configuración específica para Twitter/X
  twitter: {
    card: 'summary_large_image',
    title: 'El Rincón de Evangelyn | Artesanía Rural',
    description:
      'Productos únicos hechos a mano con la calidez de nuestras tradiciones.',
    images: ['https://www.elrincondeevangelyn.cl/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ShoppingCartStoreProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ShoppingCartStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
