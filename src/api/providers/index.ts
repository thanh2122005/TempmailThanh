import { CskhTempMailProvider } from './cskhProvider';
import type { TempMailProvider } from './types';

const defaultProvider: TempMailProvider = new CskhTempMailProvider();

export function getProvider(): TempMailProvider {
  return defaultProvider;
}

export { defaultProvider };
