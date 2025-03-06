import axios from 'axios';
import { toast } from 'react-hot-toast';

// Tạo instance axios với cấu hình mặc định
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý các lỗi phổ biến
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Xử lý lỗi unauthorized
          localStorage.removeItem('token');
          window.location.href = '/login';
          toast.error('Phiên đăng nhập đã hết hạn');
          break;
        case 403:
          toast.error('Bạn không có quyền truy cập');
          break;
        case 404:
          toast.error('Không tìm thấy tài nguyên');
          break;
        case 500:
          toast.error('Lỗi server, vui lòng thử lại sau');
          break;
        default:
          toast.error(error.response.data.message || 'Có lỗi xảy ra');
      }
    } else if (error.request) {
      toast.error('Không thể kết nối đến server');
    } else {
      toast.error('Có lỗi xảy ra');
    }
    return Promise.reject(error);
  }
);

// Các hàm helper để gọi API
export const api = {
  get: <T>(url: string, params?: object) => 
    axiosInstance.get<T>(url, { params }),
  
  post: <T>(url: string, data?: object) => 
    axiosInstance.post<T>(url, data),
  
  put: <T>(url: string, data?: object) => 
    axiosInstance.put<T>(url, data),
  
  delete: <T>(url: string) => 
    axiosInstance.delete<T>(url),
  
  patch: <T>(url: string, data?: object) => 
    axiosInstance.patch<T>(url, data),
};

export default axiosInstance; 