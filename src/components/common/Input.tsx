import type { InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  leftIcon?: ReactNode;
  rightSlot?: ReactNode;
  invalid?: boolean;
};

export function Input({ className, leftIcon, rightSlot, invalid, ...props }: Props) {
  return (
    <div
      className={cn(
        'group flex items-center gap-2 rounded-xl border bg-white/5 pl-3 pr-2 backdrop-blur',
        'transition-colors focus-within:ring-2 focus-within:ring-indigo-400/60',
        invalid
          ? 'border-rose-400/60 focus-within:border-rose-400'
          : 'border-white/10 focus-within:border-indigo-400/60',
      )}
    >
      {leftIcon && <span className="text-slate-400">{leftIcon}</span>}
      <input
        className={cn(
          'h-10 w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500',
          className,
        )}
        {...props}
      />
      {rightSlot && <div className="shrink-0">{rightSlot}</div>}
    </div>
  );
}
