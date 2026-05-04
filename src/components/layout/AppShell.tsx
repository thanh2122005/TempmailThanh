import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto min-h-screen w-full max-w-[1400px] px-3 py-4 md:px-5">{children}</div>;
}
