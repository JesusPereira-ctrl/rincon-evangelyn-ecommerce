import { Button } from '@/components/ui/button';

interface Props {
  title: string;
  href: string;
  label: string;
  icon: React.ReactNode;
}

export const ContactCard = ({ title, href, label, icon }: Props) => {
  return (
    <Button
      variant="outline"
      className="w-full justify-start h-10 gap-3 px-4 flex items-center overflow-hidden"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex items-center gap-3"
      >
        {icon}
        <div className="flex flex-col text-left justify-center min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-tight">
            {title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {label}
          </p>
        </div>
      </a>
    </Button>
  );
};
