import { cn } from '../../utils/cn';
import type { ToastItem } from '../../types/ui';

export function Toast({ items, onClose }: { items: ToastItem[]; onClose: (id: string) => void }) {
  return <div className="fixed right-4 top-4 z-50 space-y-2">{items.map((item) => <button key={item.id} onClick={() => onClose(item.id)} className={cn('block rounded-lg px-3 py-2 text-left text-sm shadow', item.type === 'success' && 'bg-emerald-600', item.type === 'error' && 'bg-red-600', item.type === 'info' && 'bg-slate-700')}>{item.message}</button>)}</div>;
}
