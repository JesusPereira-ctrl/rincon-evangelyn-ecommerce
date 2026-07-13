import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';
import { FormContact } from '@/contact/components/FormContact';
import { HeaderContact } from '@/contact/components/HeaderContact';
import { DirectChannels } from '@/contact/components/DirectChannels';
import { OriginInformation } from '@/contact/components/OriginInformation';

const SOCIAL_LINKS = [
  {
    title: 'WhatsApp',
    href: 'https://wa.me/56964453974?text=Hola!%20Quiero%20hacer%20una%20consulta%20desde%20la%20web',
    label: '+56 9 6445 3974',
    icon: <FaWhatsapp size={22} className="text-green-500 shrink-0" />,
  },
  {
    title: 'Correo Electrónico',
    href: 'mailto:nayadee73@gmail.com?subject=Consulta%20Desde%20Web',
    label: 'nayadee73@gmail.com',
    icon: <FaEnvelope size={20} className="text-blue-500 shrink-0" />,
  },
];

const ORIGIN_INFORMATION = [
  {
    title: 'Región de los Ríos, Futrono',
    label: 'Camino hacia Llifen',
    icon: (
      <FaMapMarkerAlt className="text-gray-400 mt-0.5 shrink-0" size={16} />
    ),
  },
  {
    title: 'Horario de Atención',
    label: 'Lunes a Viernes: 09:00 - 18:00 hrs.',
    label2: 'Sábados con calma: 10:00 - 14:00 hrs.',
    icon: <FaClock className="text-gray-400 mt-0.5 shrink-0" size={16} />,
  },
];

export default function ContactoPage() {
  return (
    <div className="container mx-auto min-h-[calc(100vh-4rem)] max-w-5xl px-6 py-12 md:py-20 flex flex-col justify-center">
      <HeaderContact
        title="Hablemos con Calma"
        description="¿Tienes dudas sobre un producto a pedido, envíos o quieres conversar
          sobre un diseño personalizado? Escríbenos, nos encanta conectar
          contigo."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        <FormContact />

        <div className="md:col-span-1 flex flex-col gap-4 h-full">
          <DirectChannels socialLinks={SOCIAL_LINKS} />

          <OriginInformation originCardInfo={ORIGIN_INFORMATION} />
        </div>
      </div>
    </div>
  );
}
