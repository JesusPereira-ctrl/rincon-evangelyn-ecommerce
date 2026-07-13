import { Button } from '@/components/ui/button';
import { FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';

interface Props {
  type: 'email' | 'whatsapp';
  href: string;
}

export const ContactButton = ({ type, href }: Props) => {
  const label = type === 'email' ? 'Email' : 'WhatsApp';
  const icon = type === 'email' ? <FaEnvelope /> : <FaWhatsapp />;
  const styles =
    type === 'email'
      ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm hover:shadow-md hover:from-blue-600 hover:to-indigo-700'
      : 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm hover:shadow-md hover:from-emerald-600 hover:to-teal-700';

  return (
    <Link href={href}>
      <Button className={styles}>
        {icon}
        {label}
      </Button>
    </Link>
  );
};
