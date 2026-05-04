import { apiRequest } from '../client';
import type { DomainListResponse, InboxResponse, MailDetail, MailboxAddressResponse } from '../../types/api';
import type { TempMailProvider } from './types';

export class CskhTempMailProvider implements TempMailProvider {
  async getDomains(): Promise<string[]> {
    const res = await apiRequest<DomainListResponse>('/api/domains');
    return Array.isArray(res.domains) ? res.domains : [];
  }

  async createRandomAddress(): Promise<MailboxAddressResponse> {
    const res = await apiRequest<any>('/api/new', { method: 'POST', body: '{}' });
    const address = res.address || res.email;
    if (!address) throw new Error('API khong tra ve dia chi hop le.');
    return { ...res, address };
  }

  async createCustomAddress(username: string, domain: string): Promise<MailboxAddressResponse> {
    const res = await apiRequest<any>('/api/custom', {
      method: 'POST',
      body: JSON.stringify({ username, domain }),
    });
    const address = res.address || res.email;
    if (!address) throw new Error('API khong tra ve dia chi hop le.');
    return { ...res, address };
  }

  async getInbox(address: string): Promise<InboxResponse> {
    const safe = encodeURIComponent(address);
    const res = await apiRequest<InboxResponse>(`/api/inbox/${safe}`);
    return { ...res, messages: Array.isArray(res.messages) ? res.messages : [] };
  }

  async getMailDetail(address: string, id: string): Promise<MailDetail> {
    const safeAddress = encodeURIComponent(address);
    const safeId = encodeURIComponent(id);
    return apiRequest<MailDetail>(`/api/mail/${safeAddress}/${safeId}`);
  }

  async addDomain(domain: string): Promise<unknown> {
    return apiRequest('/api/domains/add', {
      method: 'POST',
      body: JSON.stringify({ domain }),
    });
  }
}
