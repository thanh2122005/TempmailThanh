import { useMemo, useState } from 'react';
import { AtSign, Wand2 } from 'lucide-react';
import { validateUsername, normalizeUsername } from '../../utils/validators';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { DomainSelector } from './DomainSelector';

interface Props {
  domains: string[];
  selectedDomain: string;
  loading: boolean;
  domainsLoading: boolean;
  domainsError: string;
  onRetryDomains: () => void;
  onSelectDomain: (domain: string) => void;
  onSubmit: (username: string, domain: string) => Promise<void>;
}

export function CustomAddressForm(props: Props) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const preview = useMemo(
    () => `${normalizeUsername(username) || 'username'}@${props.selectedDomain || 'domain.com'}`,
    [username, props.selectedDomain],
  );

  const canSubmit =
    !props.loading && !error && !!username.trim() && !!props.selectedDomain;

  const handleSubmit = async () => {
    const normalized = normalizeUsername(username);
    const validation = validateUsername(normalized);
    if (validation) {
      setError(validation);
      return;
    }
    try {
      await props.onSubmit(normalized, props.selectedDomain);
      setUsername('');
      setError('');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Lỗi tạo địa chỉ');
    }
  };

  return (
    <Card title="Tạo địa chỉ tùy chỉnh" icon={<Wand2 size={16} />}>
      <div className="space-y-3">
        <Input
          leftIcon={<AtSign size={14} />}
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(validateUsername(e.target.value) || '');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && canSubmit) void handleSubmit();
          }}
          placeholder="Nhập username"
          invalid={!!error}
        />
        <DomainSelector
          domains={props.domains}
          value={props.selectedDomain}
          loading={props.domainsLoading}
          error={props.domainsError}
          onChange={props.onSelectDomain}
          onRetry={props.onRetryDomains}
        />

        <div className="flex items-center justify-between gap-2 rounded-lg border border-dashed border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-slate-300">
          <span>Preview:</span>
          <span className="truncate font-mono text-slate-100">{preview}</span>
        </div>

        {error && <p className="text-xs text-rose-300">{error}</p>}

        <Button disabled={!canSubmit} onClick={handleSubmit} size="md" className="w-full">
          Tạo địa chỉ này
        </Button>
      </div>
    </Card>
  );
}
