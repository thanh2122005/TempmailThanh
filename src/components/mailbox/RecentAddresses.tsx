import { Clock3, Trash2 } from 'lucide-react';
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
  return <Card><div className="mb-2 flex items-center justify-between"><h3 className="text-sm font-semibold">�Địa chỉ gần d�y</h3><Button className="bg-slate-700 hover:bg-slate-600" onClick={onClear}>Xóa tất cả</Button></div><div className="space-y-2">{items.map((item) => <div key={item.address} className="rounded-lg border border-slate-700 p-2 text-xs"><p className="break-all font-mono">{item.address}</p><p className="mb-2 mt-1 flex items-center gap-1 text-slate-400"><Clock3 size={12} />{formatRelativeTime(item.lastUsedAt)}</p><div className="flex gap-2"><Button onClick={() => onUse(item.address)}>Dùng lại</Button><Button className="bg-slate-700 hover:bg-slate-600" onClick={() => onRemove(item.address)}><Trash2 size={12} /></Button></div></div>)}</div></Card>;
}
