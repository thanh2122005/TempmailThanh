import { useCallback, useState } from 'react';
import { tempMailApi } from '../api/tempMailApi';
import type { InboxMessage, MailDetail, MailboxAddressResponse, ReadStatusMap } from '../types/api';
import { safeGetJSON, safeSetJSON, setString, getString, storageKeys } from '../utils/storage';
import { sortMessagesByNewest } from '../utils/time';
import { normalizeUsername, validateUsername } from '../utils/validators';
import { useRecentAddresses } from './useRecentAddresses';

export function useTempMail() {
  const recent = useRecentAddresses();
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState(getString(storageKeys.selectedDomain, ''));
  const [currentAddress, setCurrentAddress] = useState(getString(storageKeys.currentAddress, ''));
  const [addressMeta, setAddressMeta] = useState<MailboxAddressResponse | null>(null);
  const [inboxMessages, setInboxMessages] = useState<InboxMessage[]>([]);
  const [selectedMessageId, setSelectedMessageId] = useState<string>('');
  const [selectedMessageDetail, setSelectedMessageDetail] = useState<MailDetail | null>(null);
  const [readStatusMap, setReadStatusMap] = useState<ReadStatusMap>(() => safeGetJSON(storageKeys.readStatus, {}));

  const [domainsLoading, setDomainsLoading] = useState(false);
  const [addressLoading, setAddressLoading] = useState(false);
  const [inboxLoading, setInboxLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const [domainsError, setDomainsError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [inboxError, setInboxError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [lastRefreshedAt, setLastRefreshedAt] = useState('');

  const loadDomains = useCallback(async () => {
    setDomainsLoading(true);
    setDomainsError('');
    try {
      const result = await tempMailApi.getDomains();
      setDomains(result);
      const nextDomain = result.includes(selectedDomain) ? selectedDomain : result[0] || '';
      setSelectedDomain(nextDomain);
      setString(storageKeys.selectedDomain, nextDomain);
    } catch (error) {
      setDomainsError(error instanceof Error ? error.message : 'Kh\u00F4ng th\u1EC3 t\u1EA3i danh s\u00E1ch domain.');
    } finally {
      setDomainsLoading(false);
    }
  }, [selectedDomain]);

  const loadInbox = useCallback(async (address: string) => {
    if (!address) return;
    setInboxLoading(true);
    setInboxError('');
    try {
      const res = await tempMailApi.getInbox(address);
      const sorted = sortMessagesByNewest(res.messages);
      setInboxMessages(sorted);
      if (selectedMessageId && !sorted.some((m) => m.id === selectedMessageId)) {
        setSelectedMessageId('');
        setSelectedMessageDetail(null);
      }
      setLastRefreshedAt(new Date().toISOString());
    } catch (error) {
      setInboxError(error instanceof Error ? error.message : 'Kh\u00F4ng th\u1EC3 t\u1EA3i h\u1ED9p th\u01B0.');
    } finally {
      setInboxLoading(false);
    }
  }, [selectedMessageId]);

  const createRandomAddress = useCallback(async () => {
    setAddressLoading(true);
    setAddressError('');
    try {
      const data = await tempMailApi.createRandomAddress();
      setCurrentAddress(data.address);
      setString(storageKeys.currentAddress, data.address);
      setAddressMeta(data);
      recent.add(data.address);
      setSelectedMessageId('');
      setSelectedMessageDetail(null);
      await loadInbox(data.address);
      return data;
    } catch (error) {
      setAddressError(error instanceof Error ? error.message : 'Kh\u00F4ng th\u1EC3 t\u1EA1o \u0111\u1ECBa ch\u1EC9 ng\u1EABu nhi\u00EAn.');
      return null;
    } finally {
      setAddressLoading(false);
    }
  }, [loadInbox, recent]);

  const createCustomAddress = useCallback(async (username: string, domain: string) => {
    const normalized = normalizeUsername(username);
    const validation = validateUsername(normalized);
    if (validation) throw new Error(validation);

    setAddressLoading(true);
    setAddressError('');
    try {
      const data = await tempMailApi.createCustomAddress(normalized, domain);
      setCurrentAddress(data.address);
      setString(storageKeys.currentAddress, data.address);
      setAddressMeta(data);
      recent.add(data.address);
      setSelectedMessageId('');
      setSelectedMessageDetail(null);
      await loadInbox(data.address);
      return data;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Kh\u00F4ng th\u1EC3 t\u1EA1o \u0111\u1ECBa ch\u1EC9 t\u00F9y ch\u1EC9nh.';
      setAddressError(msg);
      throw new Error(msg);
    } finally {
      setAddressLoading(false);
    }
  }, [loadInbox, recent]);

  const loadMessage = useCallback(async (address: string, id: string) => {
    if (!address || !id) return;
    setMessageLoading(true);
    setMessageError('');
    setSelectedMessageId(id);
    const key = `${address}:${id}`;
    const nextRead = { ...readStatusMap, [key]: true };
    setReadStatusMap(nextRead);
    safeSetJSON(storageKeys.readStatus, nextRead);
    try {
      const detail = await tempMailApi.getMailDetail(address, id);
      setSelectedMessageDetail(detail);
    } catch (error) {
      setMessageError(error instanceof Error ? error.message : 'Kh\u00F4ng th\u1EC3 t\u1EA3i chi ti\u1EBFt email.');
    } finally {
      setMessageLoading(false);
    }
  }, [readStatusMap]);

  const refreshInbox = useCallback(async () => {
    if (currentAddress) await loadInbox(currentAddress);
  }, [currentAddress, loadInbox]);

  const initializeApp = useCallback(async () => {
    await loadDomains();
    if (!getString(storageKeys.currentAddress, '')) {
      await createRandomAddress();
    } else {
      await loadInbox(getString(storageKeys.currentAddress, ''));
    }
  }, [createRandomAddress, loadDomains, loadInbox]);

  const setCurrentAddressFromRecent = useCallback(async (address: string) => {
    setCurrentAddress(address);
    setString(storageKeys.currentAddress, address);
    recent.useOne(address);
    setSelectedMessageId('');
    setSelectedMessageDetail(null);
    await loadInbox(address);
  }, [loadInbox, recent]);

  return {
    recent,
    domains,
    selectedDomain,
    setSelectedDomain: (domain: string) => {
      setSelectedDomain(domain);
      setString(storageKeys.selectedDomain, domain);
    },
    currentAddress,
    addressMeta,
    inboxMessages,
    selectedMessageId,
    selectedMessageDetail,
    readStatusMap,
    domainsLoading,
    addressLoading,
    inboxLoading,
    messageLoading,
    domainsError,
    addressError,
    inboxError,
    messageError,
    lastRefreshedAt,
    initializeApp,
    loadDomains,
    createRandomAddress,
    createCustomAddress,
    loadInbox,
    refreshInbox,
    loadMessage,
    setCurrentAddressFromRecent,
  };
}
