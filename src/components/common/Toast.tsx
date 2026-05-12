import { CheckCircle2, Info, X, XCircle } from 'lucide-react';
import type { ToastItem } from '../../types/ui';
import { cn } from '../../utils/cn';

interface Props {
  items: ToastItem[];
  onClose: (id: string) => void;
}

export function Toast({ items, onClose }: Props) {
  if (items.length === 0) return null;
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(calc(100vw-2rem),360px)] flex-col gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          role="status"
          className={cn(
            'pointer-events-auto flex items-start gap-3 rounded-xl border px-3.5 py-3 text-sm shadow-2xl backdrop-blur-md',
            'animate-[fadeIn_0.18s_ease-out]',
            item.type === 'success' &&
              'border-emerald-400/30 bg-emerald-500/15 text-emerald-100',
            item.type === 'error' && 'border-rose-400/30 bg-rose-500/15 text-rose-100',
            item.type === 'info' && 'border-white/10 bg-slate-900/70 text-slate-100',
          )}
        >
          <span className="mt-0.5 shrink-0">
            {item.type === 'success' && <CheckCircle2 size={18} />}
            {item.type === 'error' && <XCircle size={18} />}
            {item.type === 'info' && <Info size={18} />}
          </span>
          <span className="flex-1 leading-snug">{item.message}</span>
          <button
            type="button"
            aria-label="Đóng"
            onClick={() => onClose(item.id)}
            className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
