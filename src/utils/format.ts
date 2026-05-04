import type { InboxMessage } from '../types/api';

export function formatDateTime(value?: string): string {
  if (!value) return 'Không rõ thời gian';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Không rõ thời gian';
  return d.toLocaleString('vi-VN');
}

export function formatRelativeTime(value?: string): string {
  if (!value) return 'Không rõ thời gian';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return 'Không rõ thời gian';
  const diff = Date.now() - d.getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'V?a xong';
  if (mins < 60) return `${mins} ph�t tru?c`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} gi? tru?c`;
  const days = Math.floor(hours / 24);
  return `${days} ng�y tru?c`;
}

export function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? `${text.slice(0, maxLength - 1)}...` : text;
}

export function getMessagePreview(message: InboxMessage): string {
  return truncateText(message.text?.trim() || 'Không có nội dung', 100);
}

export function normalizeEmailSubject(subject?: string): string {
  const value = subject?.trim();
  return value ? value : 'Kh�ng c� ti�u d?';
}
