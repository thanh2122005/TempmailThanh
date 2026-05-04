import type { InboxMessage } from '../types/api';

export function formatDateTime(value?: string): string {
  if (!value) return 'Kh\u00F4ng r\u00F5 th\u1EDDi gian';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Kh\u00F4ng r\u00F5 th\u1EDDi gian';
  return d.toLocaleString('vi-VN');
}

export function formatRelativeTime(value?: string): string {
  if (!value) return 'Kh\u00F4ng r\u00F5 th\u1EDDi gian';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Kh\u00F4ng r\u00F5 th\u1EDDi gian';
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'V\u1EEBa xong';
  if (mins < 60) return `${mins} ph\u00FAt tr\u01B0\u1EDBc`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} gi\u1EDD tr\u01B0\u1EDBc`;
  const days = Math.floor(hours / 24);
  return `${days} ng\u00E0y tr\u01B0\u1EDBc`;
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;
}

export function getMessagePreview(message: InboxMessage): string {
  return truncateText(message.text?.trim() || 'Kh\u00F4ng c\u00F3 n\u1ED9i dung', 100);
}

export function normalizeEmailSubject(subject?: string): string {
  const value = subject?.trim();
  return value ? value : 'Kh\u00F4ng c\u00F3 ti\u00EAu \u0111\u1EC1';
}
