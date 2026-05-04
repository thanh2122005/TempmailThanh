import { RefreshCw } from 'lucide-react';
import { formatDateTime } from '../../utils/format';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export function InboxToolbar({ count, loading, lastRefreshedAt, onRefresh }: { count: number; loading: boolean; lastRefreshedAt: string; onRefresh: () => void }) {
  return <Card><div className="flex items-center justify-between"><div><h3 className="text-sm font-semibold">{"H\u1ED9p th\u01B0 \u0111\u1EBFn"}</h3><p className="text-xs text-slate-300">{count} email {"\u2022"} {loading ? '\u0110ang \u0111\u1ED3ng b\u1ED9...' : '\u0110\u00E3 \u0111\u1ED3ng b\u1ED9'}</p><p className="text-xs text-slate-400">{"C\u1EADp nh\u1EADt"}: {formatDateTime(lastRefreshedAt)}</p></div><Button onClick={onRefresh}><RefreshCw size={14} /> Refresh</Button></div></Card>;
}
