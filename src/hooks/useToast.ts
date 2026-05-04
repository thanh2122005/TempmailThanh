import { useCallback, useMemo, useState } from 'react';
import type { ToastItem, ToastType } from '../types/ui';

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const addToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  }, [removeToast]);

  return useMemo(() => ({ toasts, addToast, removeToast }), [toasts, addToast, removeToast]);
}
