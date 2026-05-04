export interface DomainListResponse {
  domains: string[];
}

export interface MailboxAddressResponse {
  address: string;
  expiresAt?: number | string | null;
  ttl?: number | null;
}

export interface Attachment {
  filename?: string;
  name?: string;
  contentType?: string;
  size?: number;
  url?: string;
  [key: string]: unknown;
}

export interface InboxMessage {
  id: string;
  receivedAt?: string;
  from?: string;
  to?: string;
  subject?: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];
}

export interface InboxResponse {
  messages: InboxMessage[];
  expiresAt?: number | string | null;
}

export interface MailDetail extends InboxMessage {}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export interface RecentAddressItem {
  address: string;
  createdAt: string;
  lastUsedAt: string;
}

export type ReadStatusMap = Record<string, boolean>;
