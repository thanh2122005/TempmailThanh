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
  return <div className="space-y-2"><Select disabled={loading || domains.length === 0} value={value} onChange={(e) => onChange(e.target.value)}>{domains.map((domain) => <option key={domain} value={domain}>{domain}</option>)}</Select>{error && <div className="flex items-center justify-between gap-2 text-xs text-red-300"><span>{error}</span><Button onClick={onRetry}>T?i l?i</Button></div>}</div>;
}
