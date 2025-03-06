import type { Meta } from '@/types/routes';
import PageTemplate from '@/components/PageTemplate';

const Dashboard = (props: Meta) => {
  return (
    <PageTemplate meta={props}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Add your dashboard content here */}
      </div>
    </PageTemplate>
  );
};

export default Dashboard; 