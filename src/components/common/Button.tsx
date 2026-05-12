import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  iconOnly?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30 hover:brightness-110 active:brightness-95 focus-visible:ring-indigo-400',
  secondary:
    'bg-white/5 text-slate-100 border border-white/10 hover:bg-white/10 active:bg-white/15 focus-visible:ring-white/30',
  ghost:
    'bg-transparent text-slate-200 hover:bg-white/5 active:bg-white/10 focus-visible:ring-white/20',
  danger:
    'bg-gradient-to-tr from-rose-500 to-red-500 text-white shadow-lg shadow-rose-500/30 hover:brightness-110 active:brightness-95 focus-visible:ring-rose-400',
  success:
    'bg-gradient-to-tr from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/30 hover:brightness-110 active:brightness-95 focus-visible:ring-emerald-400',
};

const SIZES: Record<ButtonSize, string> = {
  sm: 'h-8 text-xs px-3 gap-1.5',
  md: 'h-10 text-sm px-4 gap-2',
  lg: 'h-12 text-base px-5 gap-2',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  leftIcon,
  rightIcon,
  iconOnly,
  children,
  type = 'button',
  ...props
}: Props) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(
        'relative inline-flex shrink-0 items-center justify-center rounded-xl font-medium',
        'transition-all duration-150 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        SIZES[size],
        iconOnly && (size === 'sm' ? 'w-8 px-0' : size === 'lg' ? 'w-12 px-0' : 'w-10 px-0'),
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={size === 'sm' ? 14 : 16} /> : leftIcon}
      {!iconOnly && <span className="truncate">{children}</span>}
      {!loading && !iconOnly && rightIcon}
    </button>
  );
}
