import type {
  InboxResponse,
  MailDetail,
  MailboxAddressResponse,
} from '../../types/api';

export interface TempMailProvider {
  getDomains(): Promise<string[]>;
  createRandomAddress(): Promise<MailboxAddressResponse>;
  createCustomAddress(username: string, domain: string): Promise<MailboxAddressResponse>;
  getInbox(address: string): Promise<InboxResponse>;
  getMailDetail(address: string, id: string): Promise<MailDetail>;
  addDomain?(domain: string): Promise<unknown>;
}
