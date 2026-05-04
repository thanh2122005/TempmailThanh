import type { InboxMessage } from '../types/api';

export function parseApiDate(value?: string | number | null): Date | null {
  if (value === null || value === undefined) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function getExpiryLabel(expiresAt?: number | string | null, ttl?: number | null): string {
  if (!expiresAt && !ttl) return 'Kh\u00F4ng gi\u1EDBi h\u1EA1n ho\u1EB7c API kh\u00F4ng cung c\u1EA5p TTL';
  if (ttl && ttl > 0) return `TTL: ${ttl} gi\u00E2y`;
  const parsed = parseApiDate(expiresAt);
  if (!parsed) return 'Kh\u00F4ng gi\u1EDBi h\u1EA1n ho\u1EB7c API kh\u00F4ng cung c\u1EA5p TTL';
  return `H\u1EBFt h\u1EA1n: ${parsed.toLocaleString('vi-VN')}`;
}

export function sortMessagesByNewest(messages: InboxMessage[]): InboxMessage[] {
  return [...messages].sort((a, b) => {
    const av = new Date(a.receivedAt || 0).getTime();
    const bv = new Date(b.receivedAt || 0).getTime();
    return bv - av;
  });
}
