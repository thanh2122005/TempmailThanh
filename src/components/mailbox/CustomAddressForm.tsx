import { useMemo, useState } from 'react';
import { validateUsername } from '../../utils/validators';
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
    () => `${username || 'username'}@${props.selectedDomain || 'domain.com'}`,
    [username, props.selectedDomain]
  );

  return (
    <Card>
      <h3 className="mb-2 text-sm font-semibold">Tạo địa chỉ tùy chỉnh</h3>
      <div className="space-y-2">
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(validateUsername(e.target.value) || '');
          }}
          placeholder="Nhập username"
        />
        <DomainSelector
          domains={props.domains}
          value={props.selectedDomain}
          loading={props.domainsLoading}
          error={props.domainsError}
          onChange={props.onSelectDomain}
          onRetry={props.onRetryDomains}
        />
        <p className="text-xs text-slate-300">
          Preview: <span className="font-mono">{preview}</span>
        </p>
        {error && <p className="text-xs text-red-300">{error}</p>}
        <Button
          disabled={props.loading || !!error || !props.selectedDomain}
          onClick={async () => {
            try {
              await props.onSubmit(username, props.selectedDomain);
              setUsername('');
              setError('');
            } catch (e: any) {
              if (
                e?.status === 404 ||
                (e?.message && (e.message.includes('404') || e.message.includes('Cannot POST')))
              ) {
                setError('API hiện chưa hỗ trợ tạo địa chỉ tùy chỉnh. Vui lòng dùng tạo ngẫu nhiên.');
              } else {
                setError(e instanceof Error ? e.message : 'Lỗi tạo địa chỉ');
              }
            }
          }}
        >
          Tạo địa chỉ này
        </Button>
      </div>
    </Card>
  );
}
