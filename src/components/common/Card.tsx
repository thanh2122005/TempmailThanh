import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../utils/cn';

type Props = HTMLAttributes<HTMLDivElement> & {
  title?: ReactNode;
  subtitle?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
};

const PAD: Record<NonNullable<Props['padding']>, string> = {
  none: 'p-0',
  sm: 'p-3',
  md: 'p-4 md:p-5',
  lg: 'p-5 md:p-6',
};

export function Card({
  className,
  title,
  subtitle,
  icon,
  action,
  padding = 'md',
  children,
  ...props
}: Props) {
  const hasHeader = !!(title || subtitle || action);
  return (
    <div
      className={cn(
        'relative rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md',
        'shadow-[0_8px_32px_-12px_rgba(2,6,23,0.6)]',
        'ring-1 ring-white/5',
        'transition-colors',
        PAD[padding],
        className,
      )}
      {...props}
    >
      {hasHeader && (
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-start gap-2.5">
            {icon && (
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5 text-indigo-300 ring-1 ring-white/10">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              {title && (
                <h3 className="truncate text-sm font-semibold text-slate-100">{title}</h3>
              )}
              {subtitle && (
                <p className="mt-0.5 truncate text-xs text-slate-400">{subtitle}</p>
              )}
            </div>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
}
