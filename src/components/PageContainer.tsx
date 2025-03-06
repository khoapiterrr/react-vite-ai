import type { Meta } from '@/types/routes';
import { cn } from '@/utils/cn';

interface PageContainerProps extends Meta {
  children: React.ReactNode;
}

const PageContainer = ({ children, pageContainerType = 'default', pageBackgroundType = 'default' }: PageContainerProps) => {
  return (
    <div
      className={cn(
        'min-h-screen',
        pageBackgroundType === 'plain' && 'bg-white',
        pageContainerType === 'contained' && 'container mx-auto px-4',
        pageContainerType === 'gutterless' && 'px-0'
      )}
    >
      {children}
    </div>
  );
};

export default PageContainer; 