import type { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Props = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: Props) {
  return <input className={cn('w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500', className)} {...props} />;
}
