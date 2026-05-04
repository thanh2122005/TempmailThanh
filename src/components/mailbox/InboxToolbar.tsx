import { RefreshCw } from 'lucide-react';
import { formatDateTime } from '../../utils/format';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export function InboxToolbar({ count, loading, lastRefreshedAt, onRefresh }: { count: number; loading: boolean; lastRefreshedAt: string; onRefresh: () => void }) {
  return <Card><div className="flex items-center justify-between"><div><h3 className="text-sm font-semibold">H?p thu d?n</h3><p className="text-xs text-slate-300">{count} email • {loading ? 'Ðang d?ng b?...' : 'Ðã d?ng b?'}</p><p className="text-xs text-slate-400">C?p nh?t: {formatDateTime(lastRefreshedAt)}</p></div><Button onClick={onRefresh}><RefreshCw size={14} /> Refresh</Button></div></Card>;
}
