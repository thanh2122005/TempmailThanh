import { MultiProvider } from './multiProvider';
import type { TempMailProvider } from './types';

const defaultProvider: TempMailProvider = new MultiProvider();

export function getProvider(): TempMailProvider {
  return defaultProvider;
}

export { defaultProvider };
