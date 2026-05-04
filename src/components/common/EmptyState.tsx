import { Inbox } from 'lucide-react';

export function EmptyState({ message }: { message: string }) {
  return <div className="rounded-xl border border-slate-700/50 p-6 text-center text-sm text-slate-300"><Inbox className="mx-auto mb-2" size={18} />{message}</div>;
}
