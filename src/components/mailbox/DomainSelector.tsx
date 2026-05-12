import { Select } from '../common/Select';
import { Button } from '../common/Button';

interface Props {
  domains: string[];
  value: string;
  loading: boolean;
  error: string;
  onChange: (value: string) => void;
  onRetry: () => void;
}

export function DomainSelector({ domains, value, loading, error, onChange, onRetry }: Props) {
  return (
    <div className="space-y-2">
      <Select
        disabled={loading || domains.length === 0}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {loading && <option>Đang tải domain...</option>}
        {!loading && domains.length === 0 && <option>Chưa có domain</option>}
        {domains.map((domain) => (
          <option key={domain} value={domain}>
            @{domain}
          </option>
        ))}
      </Select>
      {error && (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-xs text-rose-200">
          <span className="min-w-0 truncate">{error}</span>
          <Button onClick={onRetry} size="sm" variant="secondary">
            Tải lại
          </Button>
        </div>
      )}
    </div>
  );
}
