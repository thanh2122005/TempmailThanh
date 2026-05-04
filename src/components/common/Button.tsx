import type { ButtonHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: Props) {
  return <button className={cn('rounded-lg px-3 py-2 text-sm font-medium bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50', className)} {...props} />;
}
