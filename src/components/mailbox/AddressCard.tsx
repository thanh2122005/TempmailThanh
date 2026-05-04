import { Copy, RefreshCw, Shuffle } from 'lucide-react';
import type { MailboxAddressResponse } from '../../types/api';
import { getExpiryLabel } from '../../utils/time';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface Props {
  address: string;
  loading: boolean;
  error: string;
  meta: MailboxAddressResponse | null;
  onCopy: () => void;
  onRandom: () => void;
  onRefresh: () => void;
}

export function AddressCard({ address, loading, error, meta, onCopy, onRandom, onRefresh }: Props) {
  return <Card><h2 className="mb-2 text-sm font-semibold">�Địa chỉ hiện tại</h2><p className="mb-2 break-all font-mono text-sm">{loading ? '�ang t?o dĐịa chỉ...' : address || 'Chua c� dĐịa chỉ'}</p><p className="mb-3 text-xs text-slate-300">{meta ? getExpiryLabel(meta.expiresAt, meta.ttl) : 'Không giới hạn hoặc API không cung cấp TTL'}</p>{error && <p className="mb-2 text-xs text-red-300">{error}</p>}<div className="flex flex-wrap gap-2"><Button onClick={onCopy}><Copy size={14} /> Sao chép</Button><Button onClick={onRandom} disabled={loading}><Shuffle size={14} /> Tạo ngẫu nhiên</Button><Button className="bg-slate-700 hover:bg-slate-600" onClick={onRefresh}><RefreshCw size={14} /> Làm mới inbox</Button></div></Card>;
}
