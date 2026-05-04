import type { InboxMessage } from '../types/api';

export function parseApiDate(value?: string | number | null): Date | null {
  if (value === null || value === undefined) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function getExpiryLabel(expiresAt?: number | string | null, ttl?: number | null): string {
  if (!expiresAt && !ttl) return 'Không gi?i h?n ho?c API không cung c?p TTL';
  if (ttl && ttl > 0) return `TTL: ${ttl} giây`;
  const parsed = parseApiDate(expiresAt);
  if (!parsed) return 'Không gi?i h?n ho?c API không cung c?p TTL';
  return `H?t h?n: ${parsed.toLocaleString('vi-VN')}`;
}

export function sortMessagesByNewest(messages: InboxMessage[]): InboxMessage[] {
  return [...messages].sort((a, b) => {
    const av = new Date(a.receivedAt || 0).getTime();
    const bv = new Date(b.receivedAt || 0).getTime();
    return bv - av;
  });
}
