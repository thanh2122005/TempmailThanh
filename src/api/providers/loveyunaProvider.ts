import { apiRequest } from '../client';
import type { InboxResponse, MailDetail, MailboxAddressResponse } from '../../types/api';
import type { TempMailProvider } from './types';

export class LoveYunaProvider implements TempMailProvider {
  async getDomains(): Promise<string[]> {
    try {
      const res = await apiRequest<{domains: string[]}>('/api/domains');
      if (res && Array.isArray(res.domains)) {
        return res.domains;
      }
    } catch (e) {
      console.error('Error fetching domains:', e);
    }
    return ['lamgpt.cloud', 'vnforeo.com', 'vietkieu.edu.pl'];
  }

  async createRandomAddress(): Promise<MailboxAddressResponse> {
    const domains = await this.getDomains();
    const domain = domains[Math.floor(Math.random() * domains.length)];
    const username = Math.random().toString(36).substring(2, 12);
    return {
      address: `${username}@${domain}`,
      ttl: 3600
    };
  }

  async createCustomAddress(username: string, domain: string): Promise<MailboxAddressResponse> {
    return {
      address: `${username}@${domain}`,
      ttl: 3600
    };
  }

  async getInbox(address: string): Promise<InboxResponse> {
    const res = await apiRequest<any>(`/api/inbox/${encodeURIComponent(address)}`);
    const rawList = Array.isArray(res.emails) ? res.emails : (Array.isArray(res.messages) ? res.messages : []);
    
    return {
      messages: rawList.map((e: any) => ({
        id: e.id || '',
        from: e.from || '',
        to: address,
        subject: e.subject || '',
        receivedAt: e.date || e.receivedAt || '',
        text: e.text || e.preview || (e.hasHtml ? 'Email có chứa HTML' : ''),
        html: e.html || '',
      }))
    };
  }

  async getMailDetail(_address: string, id: string): Promise<MailDetail> {
    const res = await apiRequest<any>(`/api/email/${encodeURIComponent(id)}`);
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
}
