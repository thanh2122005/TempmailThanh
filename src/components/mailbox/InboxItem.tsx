import type { InboxMessage } from '../../types/api';
import { getMessagePreview, normalizeEmailSubject, formatRelativeTime } from '../../utils/format';

interface Props {
  message: InboxMessage;
  selected: boolean;
  read: boolean;
  onClick: () => void;
}

export function InboxItem({ message, selected, read, onClick }: Props) {
  return <button onClick={onClick} className={`w-full rounded-xl border p-3 text-left ${selected ? 'border-indigo-400 bg-indigo-500/10' : 'border-slate-700 bg-slate-900/40 hover:bg-slate-800/70'}`}><p className="text-sm font-medium">{normalizeEmailSubject(message.subject)}</p><p className="text-xs text-slate-300">{message.from || 'Không rõ người gửi'} � {formatRelativeTime(message.receivedAt)}</p><p className="mt-1 text-xs text-slate-400">{getMessagePreview(message)}</p>{!read && <span className="mt-2 inline-block rounded-full bg-indigo-500 px-2 py-0.5 text-[10px]">M?i</span>}</button>;
}
