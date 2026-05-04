import { useEffect, useState } from 'react';
import type { ThemeMode } from '../types/ui';
import { getString, setString, storageKeys } from '../utils/storage';

export function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>(() => (getString(storageKeys.theme, 'dark') === 'light' ? 'light' : 'dark'));

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    setString(storageKeys.theme, theme);
  }, [theme]);

  return { theme, toggleTheme: () => setTheme((p) => (p === 'dark' ? 'light' : 'dark')) };
}
