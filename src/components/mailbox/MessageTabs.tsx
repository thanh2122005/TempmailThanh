import type { MessageTab } from '../../types/ui';
import { cn } from '../../utils/cn';

interface Props {
  active: MessageTab;
  onChange: (tab: MessageTab) => void;
}

const TABS: Array<{ key: MessageTab; label: string }> = [
  { key: 'html', label: 'HTML' },
  { key: 'text', label: 'Văn bản' },
];

export function MessageTabs({ active, onChange }: Props) {
  return (
    <div
      role="tablist"
      aria-label="Chế độ xem nội dung email"
      className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1 text-sm backdrop-blur"
    >
      {TABS.map((tab) => {
        const selected = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={selected}
            className={cn(
              'rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
              selected
                ? 'bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow'
                : 'text-slate-300 hover:text-white',
            )}
            onClick={() => onChange(tab.key)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
