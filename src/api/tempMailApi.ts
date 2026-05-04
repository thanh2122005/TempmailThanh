import { getProvider } from './providers';

const provider = getProvider();

export const tempMailApi = {
  getDomains: () => provider.getDomains(),
  createRandomAddress: () => provider.createRandomAddress(),
  createCustomAddress: (username: string, domain: string) => provider.createCustomAddress(username, domain),
  getInbox: (address: string) => provider.getInbox(address),
  getMailDetail: (address: string, id: string) => provider.getMailDetail(address, id),
  addDomain: (domain: string) => provider.addDomain?.(domain),
};
