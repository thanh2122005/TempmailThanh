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
  return <Card><h2 className="mb-2 text-sm font-semibold">Ð?a ch? hi?n t?i</h2><p className="mb-2 break-all font-mono text-sm">{loading ? 'Ðang t?o d?a ch?...' : address || 'Chua có d?a ch?'}</p><p className="mb-3 text-xs text-slate-300">{meta ? getExpiryLabel(meta.expiresAt, meta.ttl) : 'Không gi?i h?n ho?c API không cung c?p TTL'}</p>{error && <p className="mb-2 text-xs text-red-300">{error}</p>}<div className="flex flex-wrap gap-2"><Button onClick={onCopy}><Copy size={14} /> Sao chép</Button><Button onClick={onRandom} disabled={loading}><Shuffle size={14} /> T?o ng?u nhiên</Button><Button className="bg-slate-700 hover:bg-slate-600" onClick={onRefresh}><RefreshCw size={14} /> Làm m?i inbox</Button></div></Card>;
}
