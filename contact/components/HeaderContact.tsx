interface Props {
  title: string;
  description: string;
}

export const HeaderContact = ({ title, description }: Props) => {
  return (
    <>
      <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col gap-3">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
    </>
  );
};
