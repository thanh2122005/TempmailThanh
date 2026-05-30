import type { InboxResponse, MailDetail, MailboxAddressResponse } from '../../types/api';
import type { TempMailProvider } from './types';

export class LoveYunaProvider implements TempMailProvider {
  private baseUrl = 'https://webmail.loveyuna.today';
  private apiKey: string | null = null;

  private async getApiKey(): Promise<string> {
    if (this.apiKey) return this.apiKey;
    const stored = localStorage.getItem('loveyuna_api_key');
    if (stored) {
      this.apiKey = stored;
      return stored;
    }
    
    // Tạo API key mới nếu chưa có
    const res = await fetch(`${this.baseUrl}/api/keys`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: 'TempMailThanh Web' })
    });
    
    if (!res.ok) {
      throw new Error('Không thể khởi tạo API key');
    }
    
    const data = await res.json();
    this.apiKey = data.key;
    localStorage.setItem('loveyuna_api_key', data.key);
    return data.key;
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const key = await this.getApiKey();
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      }
    });
    
    const data = await res.json();
    if (!data.ok) {
      if (data.code === 'UNAUTHORIZED' || data.code === 'INVALID_KEY') {
        // Xóa key cũ đi và bắt lỗi để người dùng tải lại
        localStorage.removeItem('loveyuna_api_key');
        this.apiKey = null;
        throw new Error('API Key hết hạn hoặc không hợp lệ, vui lòng tải lại trang.');
      }
      throw new Error(data.error || 'Yêu cầu thất bại');
    }
    
    return data.data;
  }

  async getDomains(): Promise<string[]> {
    try {
      const res = await fetch(`${this.baseUrl}/api/domains`);
      const data = await res.json();
      if (data.domains && Array.isArray(data.domains)) {
        return data.domains;
      }
    } catch (e) {
      console.error('Error fetching domains:', e);
    }
    return ['webmail.loveyuna.today'];
  }

  async createRandomAddress(): Promise<MailboxAddressResponse> {
    const data = await this.request<any>('/v1/address');
    return {
      address: data.address,
      ttl: data.ttl,
      expiresAt: data.expiresAt
    };
  }

  async createCustomAddress(username: string, domain: string): Promise<MailboxAddressResponse> {
    // API v1 có thể hỗ trợ query params để tạo địa chỉ
    const data = await this.request<any>(`/v1/address?domain=${encodeURIComponent(domain)}&username=${encodeURIComponent(username)}`);
    return {
      address: data.address || `${username}@${domain}`,
      ttl: data.ttl,
      expiresAt: data.expiresAt
    };
  }

  async getInbox(address: string): Promise<InboxResponse> {
    const data = await this.request<any>(`/v1/inbox/${address}`);
    return {
      messages: data.emails.map((e: any) => ({
        id: e.id,
        from: e.from,
        to: address,
        subject: e.subject,
        receivedAt: e.date || e.receivedAt,
        text: e.text || e.preview || (e.hasHtml ? 'Email này có chứa mã HTML' : ''),
        html: e.html || '',
      }))
    };
  }

  async getMailDetail(address: string, id: string): Promise<MailDetail> {
    const data = await this.request<any>(`/v1/email/${id}?address=${address}`);
    const e = data.email;
    return {
      id: e.id,
      from: e.from,
      to: e.to,
      subject: e.subject,
      receivedAt: e.date || e.receivedAt,
      text: e.text || '',
      html: e.html || '',
      attachments: e.attachments || []
    };
  }
}
