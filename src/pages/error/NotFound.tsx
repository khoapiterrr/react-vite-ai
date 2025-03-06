import type { Meta } from '@types/routes';
import { Link } from 'react-router-dom';

const NotFound = (props: Meta) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-9xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <p className="mt-2 text-gray-500">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-8 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotFound; 