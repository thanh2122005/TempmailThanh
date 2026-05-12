import type { ReactNode } from 'react';

interface Props {
  left: ReactNode;
  middle: ReactNode;
  right: ReactNode;
}

export function ThreePaneLayout({ left, middle, right }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-[300px_minmax(320px,380px)_1fr] lg:gap-5 xl:grid-cols-[320px_minmax(340px,420px)_1fr]">
      <aside className="space-y-4">{left}</aside>
      <section className="space-y-4">{middle}</section>
      <section className="min-w-0 space-y-4">{right}</section>
    </div>
  );
}
