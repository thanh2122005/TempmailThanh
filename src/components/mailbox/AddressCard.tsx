import { Copy, Mail, RefreshCw, Shuffle } from 'lucide-react';
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
  return (
    <Card
      title="Địa chỉ hiện tại"
      subtitle={meta ? getExpiryLabel(meta.expiresAt, meta.ttl) : 'Không giới hạn hoặc API không cung cấp TTL'}
      icon={<Mail size={16} />}
    >
      <button
        type="button"
        onClick={onCopy}
        disabled={!address || loading}
        title={address ? 'Bấm để copy địa chỉ' : undefined}
        className="group mb-3 flex w-full items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-left transition-colors hover:border-indigo-400/40 hover:bg-white/10 disabled:cursor-not-allowed"
      >
        <span className="min-w-0 truncate break-all font-mono text-sm text-slate-100">
          {loading ? 'Đang tạo địa chỉ...' : address || 'Chưa có địa chỉ'}
        </span>
        <Copy
          size={14}
          className="shrink-0 text-slate-400 opacity-60 transition-opacity group-hover:text-indigo-300 group-hover:opacity-100"
        />
      </button>

      {error && (
        <p className="mb-3 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button onClick={onCopy} size="sm" leftIcon={<Copy size={14} />} disabled={!address}>
          Sao chép
        </Button>
        <Button
          onClick={onRandom}
          size="sm"
          variant="secondary"
          loading={loading}
          leftIcon={<Shuffle size={14} />}
        >
          Tạo ngẫu nhiên
        </Button>
        <Button
          onClick={onRefresh}
          size="sm"
          variant="ghost"
          leftIcon={<RefreshCw size={14} />}
        >
          Làm mới inbox
        </Button>
      </div>
    </Card>
  );
}
