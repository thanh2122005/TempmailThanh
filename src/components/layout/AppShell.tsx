import type { ReactNode } from 'react';

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute -bottom-40 left-[-10%] h-[520px] w-[520px] rounded-full bg-fuchsia-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto w-full max-w-[1480px] px-3 py-4 md:px-6 md:py-6">
        {children}
      </div>
    </div>
  );
}
