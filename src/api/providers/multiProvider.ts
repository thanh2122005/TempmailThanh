import { CskhTempMailProvider } from './cskhProvider';
import { LoveYunaProvider } from './loveyunaProvider';
import type { TempMailProvider } from './types';
import type { MailboxAddressResponse, InboxResponse, MailDetail } from '../../types/api';

export class MultiProvider implements TempMailProvider {
  private cskh = new CskhTempMailProvider();
  private loveyuna = new LoveYunaProvider();

  private isLoveyunaDomain(domainOrAddress: string): boolean {
    return domainOrAddress.includes('webmail.loveyuna.today');
  }

  private getProviderForDomain(domain: string): TempMailProvider {
    return this.isLoveyunaDomain(domain) ? this.loveyuna : this.cskh;
  }

  private getProviderForAddress(address: string): TempMailProvider {
    return this.isLoveyunaDomain(address) ? this.loveyuna : this.cskh;
  }

  async getDomains(): Promise<string[]> {
    try {
      const [cskhDomains, loveyunaDomains] = await Promise.all([
        this.cskh.getDomains().catch(() => []),
        this.loveyuna.getDomains().catch(() => []),
      ]);
      // Nối mảng cskhDomains với loveyunaDomains để hiện tất cả
      return [...cskhDomains, ...loveyunaDomains];
    } catch (e) {
      console.error('Error fetching domains', e);
      return ['webmail.loveyuna.today'];
    }
  }

  async createRandomAddress(): Promise<MailboxAddressResponse> {
    // Mặc định tạo ngẫu nhiên từ hệ thống cũ hoặc mới.
    // Tạm thời để cskh tạo ngẫu nhiên nếu bạn muốn hệ thống cũ làm mặc định.
    // Hoặc random ngẫu nhiên giữa 2 provider. Ở đây dùng cskh làm gốc, 
    // vì loveyuna có thể được chọn qua Custom Address hoặc tuỳ ý.
    // Thử dùng loveyuna mặc định
    return this.loveyuna.createRandomAddress();
  }

  async createCustomAddress(username: string, domain: string): Promise<MailboxAddressResponse> {
    const provider = this.getProviderForDomain(domain);
    return provider.createCustomAddress(username, domain);
  }

  async getInbox(address: string): Promise<InboxResponse> {
    const provider = this.getProviderForAddress(address);
    return provider.getInbox(address);
  }

  async getMailDetail(address: string, id: string): Promise<MailDetail> {
    const provider = this.getProviderForAddress(address);
    return provider.getMailDetail(address, id);
  }

  async addDomain(domain: string): Promise<unknown> {
    return this.cskh.addDomain?.(domain);
  }
}
