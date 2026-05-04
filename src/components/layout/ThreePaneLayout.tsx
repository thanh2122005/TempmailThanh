import type { ReactNode } from 'react';

export function ThreePaneLayout({ left, middle, right }: { left: ReactNode; middle: ReactNode; right: ReactNode }) {
  return <div className="grid gap-4 lg:grid-cols-[320px_420px_1fr]"> <div className="space-y-4">{left}</div><div className="space-y-4">{middle}</div><div className="space-y-4">{right}</div></div>;
}
