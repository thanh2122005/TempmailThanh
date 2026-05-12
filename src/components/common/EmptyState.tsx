import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Props {
  message: string;
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ message, title, icon, action, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center',
        className,
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
        {icon || <Inbox size={22} />}
      </div>
      {title && <h4 className="text-sm font-semibold text-slate-200">{title}</h4>}
      <p className="max-w-sm text-xs leading-relaxed text-slate-400">{message}</p>
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
