import { Clock3, History, Trash2 } from 'lucide-react';
import type { RecentAddressItem } from '../../types/api';
import { formatRelativeTime } from '../../utils/format';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface Props {
  items: RecentAddressItem[];
  onUse: (address: string) => void;
  onRemove: (address: string) => void;
  onClear: () => void;
}

export function RecentAddresses({ items, onUse, onRemove, onClear }: Props) {
  return (
    <Card
      title="Địa chỉ gần đây"
      icon={<History size={16} />}
      action={
        items.length > 0 ? (
          <Button onClick={onClear} variant="ghost" size="sm">
            Xóa tất cả
          </Button>
        ) : null
      }
    >
      {items.length === 0 ? (
        <p className="text-xs text-slate-400">Chưa có địa chỉ nào được lưu.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item) => (
            <li
              key={item.address}
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-2.5 transition-colors hover:border-indigo-400/40 hover:bg-white/[0.06]"
            >
              <button
                type="button"
                onClick={() => onUse(item.address)}
                className="block w-full truncate break-all text-left font-mono text-xs text-slate-100"
                title={`Mở ${item.address}`}
              >
                {item.address}
              </button>
              <div className="mt-1.5 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] text-slate-400">
                  <Clock3 size={10} /> {formatRelativeTime(item.lastUsedAt)}
                </span>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="secondary" onClick={() => onUse(item.address)}>
                    Dùng lại
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    iconOnly
                    aria-label={`Xóa ${item.address}`}
                    onClick={() => onRemove(item.address)}
                    leftIcon={<Trash2 size={14} />}
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
