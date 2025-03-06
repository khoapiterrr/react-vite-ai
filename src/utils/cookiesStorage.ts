/**
 * Utility functions for managing cookies
 */

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

/**
 * Set a cookie with the given name, value and options
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.expires) {
    if (typeof options.expires === 'number') {
      const days = options.expires;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      options.expires = date;
    }
    cookieString += `;expires=${options.expires.toUTCString()}`;
  }

  if (options.path) cookieString += `;path=${options.path}`;
  if (options.domain) cookieString += `;domain=${options.domain}`;
  if (options.secure) cookieString += ';secure';
  if (options.sameSite) cookieString += `;samesite=${options.sameSite}`;

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length, cookie.length));
    }
  }
  return null;
}

/**
 * Remove a cookie by name
 * @param name - Cookie name
 */
export function removeCookie(name: string): void {
  setCookie(name, '', { expires: -1 });
}

/**
 * Check if a cookie exists
 * @param name - Cookie name
 * @returns boolean indicating if cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * Get all cookies as an object
 * @returns Object containing all cookies
 */
export function getAllCookies(): Record<string, string> {
  const cookies: Record<string, string> = {};
  const cookieString = document.cookie;

  if (cookieString) {
    const cookieArray = cookieString.split(';');
    cookieArray.forEach(cookie => {
      const [name, value] = cookie.split('=').map(c => decodeURIComponent(c.trim()));
      cookies[name] = value;
    });
  }

  return cookies;
}

/**
 * Clear all cookies
 */
export function clearAllCookies(): void {
  const cookies = getAllCookies();
  Object.keys(cookies).forEach(name => removeCookie(name));
} 