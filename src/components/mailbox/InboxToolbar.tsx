import { Inbox, RefreshCw } from 'lucide-react';
import { formatDateTime } from '../../utils/format';
import { Button } from '../common/Button';

interface Props {
  count: number;
  loading: boolean;
  lastRefreshedAt: string;
  onRefresh: () => void;
}

export function InboxToolbar({ count, loading, lastRefreshedAt, onRefresh }: Props) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 pl-4 backdrop-blur">
      <div className="flex min-w-0 items-center gap-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 ring-1 ring-inset ring-indigo-500/20">
          <Inbox size={16} />
        </div>
        <div className="min-w-0">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-100">
            Hộp thư đến
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-slate-300">
              {count} email
            </span>
          </h3>
          <p className="mt-0.5 truncate text-[11px] text-slate-400">
            {loading ? 'Đang đồng bộ...' : `Cập nhật ${formatDateTime(lastRefreshedAt)}`}
          </p>
        </div>
      </div>
      <Button
        size="sm"
        variant="secondary"
        onClick={onRefresh}
        loading={loading}
        leftIcon={<RefreshCw size={14} />}
      >
        Refresh
      </Button>
    </div>
  );
}
