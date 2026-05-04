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
    if (!address) throw new Error('API kh\u00F4ng tr\u1EA3 v\u1EC1 \u0111\u1ECBa ch\u1EC9 h\u1EE3p l\u1EC7.');
    return { ...res, address };
  }

  // Keep for future use if API adds support
  async createCustomAddress(username: string, domain: string): Promise<MailboxAddressResponse> {
    const res = await apiRequest<any>('/api/custom', {
      method: 'POST',
      body: JSON.stringify({ username, domain }),
    });
    const address = res.address || res.email;
    if (!address) throw new Error('API kh\u00F4ng tr\u1EA3 v\u1EC1 \u0111\u1ECBa ch\u1EC9 h\u1EE3p l\u1EC7.');
    return { ...res, address };
  }

  async getInbox(address: string): Promise<InboxResponse> {
    const safe = encodeURIComponent(address);
    const res = await apiRequest<any>(`/api/inbox/${safe}`);
    // API returns { emails: [...] } not { messages: [...] }
    // Each email has: id, from, to, subject, date, preview
    const rawList = Array.isArray(res.emails) ? res.emails : (Array.isArray(res.messages) ? res.messages : []);
    const messages = rawList.map((e: any) => ({
      id: e.id || '',
      from: e.from || '',
      to: e.to || '',
      subject: e.subject || '',
      receivedAt: e.date || e.receivedAt || '',
      text: e.preview || e.text || '',
      html: e.html || '',
    }));
    return { messages };
  }

  async getMailDetail(_address: string, id: string): Promise<MailDetail> {
    // API uses GET /api/email/:id (no address in path)
    const safeId = encodeURIComponent(id);
    const res = await apiRequest<any>(`/api/email/${safeId}`);
    return {
      id: res.id || id,
      from: res.from || '',
      to: res.to || '',
      subject: res.subject || '',
      receivedAt: res.date || res.receivedAt || '',
      text: res.textBody || res.text || res.preview || '',
      html: res.body || res.html || '',
    };
  }

  async addDomain(domain: string): Promise<unknown> {
    return apiRequest('/api/domains/add', {
      method: 'POST',
      body: JSON.stringify({ domain }),
    });
  }
}
