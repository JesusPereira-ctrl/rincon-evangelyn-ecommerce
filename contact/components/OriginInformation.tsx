import { Card, CardContent } from '@/components/ui/card';
import { AttentionCard } from './AttentionCard';

interface OriginCardInfo {
  title: string;
  label: string;
  label2?: string;
  icon: React.ReactNode;
}

interface Props {
  originCardInfo: OriginCardInfo[];
}

export const OriginInformation = ({ originCardInfo }: Props) => {
  return (
    <Card className="border-gray-200 dark:border-neutral-800 flex-1 flex flex-col justify-center min-h-35">
      <CardContent className="py-6 space-y-4">
        {originCardInfo.map((item) => (
          <AttentionCard
            key={item.title}
            title={item.title}
            icon={item.icon}
            label={item.label}
            label2={item.label2}
          />
        ))}
      </CardContent>
    </Card>
  );
};
