import { Outlet } from 'react-router-dom';
import { useAuthStore } from '../store';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function MainLayout() {
  const { user, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} onLogout={logout} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout; 