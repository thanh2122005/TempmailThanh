const keys = {
  currentAddress: 'tempmail.currentAddress',
  selectedDomain: 'tempmail.selectedDomain',
  recentAddresses: 'tempmail.recentAddresses',
  readStatus: 'tempmail.readStatus',
  theme: 'tempmail.theme',
} as const;

function canUseStorage(): boolean {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
}

export function safeGetJSON<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function safeSetJSON<T>(key: string, value: T): void {
  if (!canUseStorage()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // noop
  }
}

export function getString(key: string, fallback = ''): string {
  if (!canUseStorage()) return fallback;
  return localStorage.getItem(key) ?? fallback;
}

export function setString(key: string, value: string): void {
  if (!canUseStorage()) return;
  localStorage.setItem(key, value);
}

export function removeStorageItem(key: string): void {
  if (!canUseStorage()) return;
  localStorage.removeItem(key);
}

export const storageKeys = keys;
