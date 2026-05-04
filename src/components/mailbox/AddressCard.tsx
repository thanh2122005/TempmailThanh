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
  return <Card><h2 className="mb-2 text-sm font-semibold">{"\u0110\u1ECBa ch\u1EC9 hi\u1EC7n t\u1EA1i"}</h2><p className="mb-2 break-all font-mono text-sm">{loading ? '\u0110ang t\u1EA1o \u0111\u1ECBa ch\u1EC9...' : address || 'Ch\u01B0a c\u00F3 \u0111\u1ECBa ch\u1EC9'}</p><p className="mb-3 text-xs text-slate-300">{meta ? getExpiryLabel(meta.expiresAt, meta.ttl) : 'Kh\u00F4ng gi\u1EDBi h\u1EA1n ho\u1EB7c API kh\u00F4ng cung c\u1EA5p TTL'}</p>{error && <p className="mb-2 text-xs text-red-300">{error}</p>}<div className="flex flex-wrap gap-2"><Button onClick={onCopy}><Copy size={14} /> {"Sao ch\u00E9p"}</Button><Button onClick={onRandom} disabled={loading}><Shuffle size={14} /> {"T\u1EA1o ng\u1EABu nhi\u00EAn"}</Button><Button className="bg-slate-700 hover:bg-slate-600" onClick={onRefresh}><RefreshCw size={14} /> {"L\u00E0m m\u1EDBi inbox"}</Button></div></Card>;
}
