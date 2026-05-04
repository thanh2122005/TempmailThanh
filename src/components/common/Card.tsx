import type { HTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Props = HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: Props) {
  return <div className={cn('rounded-xl border border-slate-700/60 bg-slate-900/70 p-4 shadow-sm', className)} {...props} />;
}
