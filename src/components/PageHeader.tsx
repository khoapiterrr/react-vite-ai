import type { PageHeaderProps } from '@/types/routes';

const PageHeader = ({ title, description, extraHeader }: PageHeaderProps) => {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        {title && <h1 className="text-2xl font-bold">{title}</h1>}
        {description && <p className="mt-2 text-gray-600">{description}</p>}
      </div>
      {extraHeader && <div>{extraHeader}</div>}
    </div>
  );
};

export default PageHeader; 