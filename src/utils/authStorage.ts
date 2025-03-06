import { setItem, getItem, removeItem } from './localStorage';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user';

interface User {
  id: string;
  email: string;
  name: string;
  // Thêm các trường khác tùy theo yêu cầu
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Lưu thông tin authentication
 */
export function setAuth(tokens: AuthTokens, user: User): void {
  setItem(TOKEN_KEY, tokens.accessToken);
  setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  setItem(USER_KEY, user);
}

/**
 * Lấy access token
 */
export function getAccessToken(): string | null {
  return getItem<string>(TOKEN_KEY, '');
}

/**
 * Lấy refresh token
 */
export function getRefreshToken(): string | null {
  return getItem<string>(REFRESH_TOKEN_KEY, '');
}

/**
 * Lấy thông tin user
 */
export function getUser(): User | null {
  return getItem<User | null>(USER_KEY, null);
}

/**
 * Xóa thông tin authentication
 */
export function removeAuth(): void {
  removeItem(TOKEN_KEY);
  removeItem(REFRESH_TOKEN_KEY);
  removeItem(USER_KEY);
}

/**
 * Kiểm tra xem user đã đăng nhập chưa
 */
export function isAuthenticated(): boolean {
  return !!getAccessToken() && !!getUser();
}

/**
 * Cập nhật access token
 */
export function updateAccessToken(token: string): void {
  setItem(TOKEN_KEY, token);
}

/**
 * Cập nhật thông tin user
 */
export function updateUser(user: User): void {
  setItem(USER_KEY, user);
} 