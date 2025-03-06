import { useState } from 'react';
import { api } from '../lib/axios';

interface User {
  id: number;
  name: string;
  email: string;
}

export function Example() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get<User[]>('/users');
      setUsers(response.data);
    } catch (error) {
      // Lỗi đã được xử lý trong interceptor
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id'>) => {
    try {
      const response = await api.post<User>('/users', userData);
      setUsers(prev => [...prev, response.data]);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={fetchUsers}
        disabled={loading}
        className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 disabled:opacity-50"
      >
        {loading ? 'Đang tải...' : 'Lấy danh sách người dùng'}
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Danh sách người dùng:</h2>
        <ul className="space-y-2">
          {users.map(user => (
            <li key={user.id} className="p-2 bg-gray-100 rounded">
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 