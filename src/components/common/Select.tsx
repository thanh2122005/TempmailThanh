import type { SelectHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Props = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...props }: Props) {
  return <select className={cn('w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm', className)} {...props} />;
}
