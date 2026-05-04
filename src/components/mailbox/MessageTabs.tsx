import type { MessageTab } from '../../types/ui';

export function MessageTabs({ active, onChange }: { active: MessageTab; onChange: (tab: MessageTab) => void }) {
  return <div className="mb-3 flex gap-2 text-sm"><button className={`rounded-lg px-3 py-1 ${active === 'html' ? 'bg-indigo-500' : 'bg-slate-700'}`} onClick={() => onChange('html')}>HTML</button><button className={`rounded-lg px-3 py-1 ${active === 'text' ? 'bg-indigo-500' : 'bg-slate-700'}`} onClick={() => onChange('text')}>Văn bản</button></div>;
}
