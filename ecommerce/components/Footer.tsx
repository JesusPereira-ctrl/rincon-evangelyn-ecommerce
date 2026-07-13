// components/footer.tsx
import Link from 'next/link';
import { FaEnvelope, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

// Estructura de links para fácil edición
const FOOTER_LINKS = [
  {
    title: 'Comprar',
    links: [
      { label: 'Inicio', href: '/' },
      { label: 'Tienda', href: '/tienda' },
      { label: 'Categorías', href: '/shop/contact' },
    ],
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Contacto', href: '/shop/contact' },
      { label: 'Preguntas Frecuentes', href: '/faq' },
      { label: 'Envíos y Devoluciones', href: '/envios' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Términos y Condiciones', href: '/terminos' },
      { label: 'Política de Privacidad', href: '/privacidad' },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    link: 'https://www.instagram.com/elrincon_de_evangelyn/',
    icon: <FaInstagram size={18} />,
  },
  {
    link: 'https://wa.me/56964453974?text=Hola%20quiero%20más%20información%20de%20la%20tienda',
    icon: <FaWhatsapp size={18} />,
  },
  {
    link: 'mailto:nayadee73@gmail.com',
    icon: <FaEnvelope size={18} />,
  },
];

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
        {/* SECCIÓN SUPERIOR: Grid responsive */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-5">
          {/* Bloque de Marca/Información (Ocupa más espacio en pantallas grandes) */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <Link href="/" className="text-xl font-bold tracking-tight">
              El Rincón de Evangelyn
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              El encanto de lo auténtico y rural en tus manos. Artesanías que
              rescatan los tiempos de la naturaleza y el valor de los oficios de
              siempre.
            </p>

            {/* Redes Sociales usando variantes de Button de Shadcn */}
            <div className="flex items-center gap-1 mt-2">
              {SOCIAL_LINKS.map((social) => (
                <Button
                  key={social.link}
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  <a
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Bloques de Enlaces Dinámicos */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-900 dark:text-gray-100">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* RECUADRO INFERIOR: Derechos de autor */}
        <div className="mt-12 border-t border-gray-100 pt-8 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center sm:text-left">
            &copy; {new Date().getFullYear()} El Rincón de Evangelyn. Todos los
            derechos reservados.
          </p>
          <p className="text-xs text-gray-400 dark:text-neutral-600">
            Hecho con ❤️ para ti.
          </p>
        </div>
      </div>
    </footer>
  );
};
