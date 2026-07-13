import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ContactCard } from './ContactCard';

interface SocialLinks {
  title: string;
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface Props {
  socialLinks: SocialLinks[];
}

export const DirectChannels = ({ socialLinks }: Props) => {
  return (
    <Card className="border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-900/30 flex-1 flex flex-col justify-between">
      <div>
        <CardHeader>
          <CardTitle className="text-lg">Canales Directos</CardTitle>
          <CardDescription>Si buscas una respuesta más rápida.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 mt-3">
          {/* WhatsApp */}
          {socialLinks.map((item) => (
            <ContactCard key={item.title} {...item} />
          ))}
        </CardContent>
      </div>
    </Card>
  );
};
