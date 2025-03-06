/**
 * Utility functions for managing localStorage
 */

/**
 * Set an item in localStorage with type safety
 * @param key - Storage key
 * @param value - Value to store
 */
export function setItem<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

/**
 * Get an item from localStorage with type safety
 * @param key - Storage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Stored value or default value
 */
export function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
}

/**
 * Remove an item from localStorage
 * @param key - Storage key
 */
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

/**
 * Clear all items from localStorage
 */
export function clear(): void {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Error clearing localStorage:", error);
  }
}

/**
 * Check if an item exists in localStorage
 * @param key - Storage key
 * @returns boolean indicating if key exists
 */
export function hasItem(key: string): boolean {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error("Error checking localStorage:", error);
    return false;
  }
}

/**
 * Get all items from localStorage
 * @returns Object containing all stored items
 */
export function getAllItems(): Record<string, unknown> {
  try {
    const items: Record<string, unknown> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        items[key] = value ? JSON.parse(value) : null;
      }
    }
    return items;
  } catch (error) {
    console.error("Error getting all items from localStorage:", error);
    return {};
  }
}

/**
 * Get storage usage in bytes
 * @returns number of bytes used
 */
export function getStorageUsage(): number {
  try {
    let total = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        total += key.length + (localStorage.getItem(key)?.length || 0);
      }
    }
    return total;
  } catch (error) {
    console.error("Error calculating storage usage:", error);
    return 0;
  }
}

/**
 * Check if localStorage is available
 * @returns boolean indicating if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const storage = window.localStorage;
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (error) {
    console.error("Error calculating storage usage:", error);
    return false;
  }
}
