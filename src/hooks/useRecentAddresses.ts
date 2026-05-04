import { useMemo, useState } from 'react';
import type { RecentAddressItem } from '../types/api';
import { safeGetJSON, safeSetJSON, storageKeys } from '../utils/storage';

export function useRecentAddresses() {
  const [items, setItems] = useState<RecentAddressItem[]>(() => safeGetJSON<RecentAddressItem[]>(storageKeys.recentAddresses, []));

  const persist = (next: RecentAddressItem[]) => {
    setItems(next);
    safeSetJSON(storageKeys.recentAddresses, next);
  };

  const add = (address: string) => {
    const now = new Date().toISOString();
    const filtered = items.filter((item) => item.address !== address);
    const next = [{ address, createdAt: now, lastUsedAt: now }, ...filtered].slice(0, 15);
    persist(next);
  };

  const useOne = (address: string) => {
    const now = new Date().toISOString();
    const next = items.map((item) => (item.address === address ? { ...item, lastUsedAt: now } : item)).sort((a, b) =>
      new Date(b.lastUsedAt).getTime() - new Date(a.lastUsedAt).getTime(),
    );
    persist(next);
  };

  return useMemo(
    () => ({
      items,
      add,
      useOne,
      remove: (address: string) => persist(items.filter((item) => item.address !== address)),
      clear: () => persist([]),
    }),
    [items],
  );
}
