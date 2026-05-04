import { useMemo, useState } from 'react';
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
    () => `${username || 'username'}@${props.selectedDomain || 'domain.com'}`,
    [username, props.selectedDomain]
  );

  return (
    <Card>
      <h3 className="mb-2 text-sm font-semibold">{"T\u1EA1o \u0111\u1ECBa ch\u1EC9 t\u00F9y ch\u1EC9nh"}</h3>
      <div className="space-y-2">
        <Input
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            setError(validateUsername(e.target.value) || '');
          }}
          placeholder={"Nh\u1EADp username"}
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
          disabled={props.loading || !!error || !username.trim() || !props.selectedDomain}
          onClick={async () => {
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
            } catch (e: any) {
              setError(e instanceof Error ? e.message : 'L\u1ED7i t\u1EA1o \u0111\u1ECBa ch\u1EC9');
            }
          }}
        >
          {"T\u1EA1o \u0111\u1ECBa ch\u1EC9 n\u00E0y"}
        </Button>
      </div>
    </Card>
  );
}
