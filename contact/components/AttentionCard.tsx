interface Props {
  title: string;
  label: string;
  label2?: string;
  icon: React.ReactNode;
}

export const AttentionCard = ({ title, label, label2, icon }: Props) => {
  return (
    <div className="flex gap-3 items-start text-sm">
      {icon}
      <div>
        <p className="font-medium text-gray-950 dark:text-gray-50">{title}</p>
        <p className="text-gray-500 dark:text-gray-400 text-xs">
          {label} {label2 && <br />}
          {label2}
        </p>
      </div>
    </div>
  );
};
