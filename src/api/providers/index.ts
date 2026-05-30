import { LoveYunaProvider } from './loveyunaProvider';
import type { TempMailProvider } from './types';

const defaultProvider: TempMailProvider = new LoveYunaProvider();

export function getProvider(): TempMailProvider {
  return defaultProvider;
}

export { defaultProvider };
