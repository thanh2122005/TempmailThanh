export type ThemeMode = 'dark' | 'light';
export type ToastType = 'success' | 'error' | 'info';
export type MessageTab = 'html' | 'text';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}
