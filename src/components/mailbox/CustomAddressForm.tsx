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
                setError('API hi\u1EC7n ch\u01B0a h\u1ED7 tr\u1EE3 t\u1EA1o \u0111\u1ECBa ch\u1EC9 t\u00F9y ch\u1EC9nh. Vui l\u00F2ng d\u00F9ng t\u1EA1o ng\u1EABu nhi\u00EAn.');
              } else {
                setError(e instanceof Error ? e.message : 'L\u1ED7i t\u1EA1o \u0111\u1ECBa ch\u1EC9');
              }
            }
          }}
        >
          {"T\u1EA1o \u0111\u1ECBa ch\u1EC9 n\u00E0y"}
        </Button>
      </div>
    </Card>
  );
}
