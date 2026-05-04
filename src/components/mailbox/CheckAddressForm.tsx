import { useState } from 'react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Input } from '../common/Input';

interface Props {
  onCheck: (address: string) => void;
}

export function CheckAddressForm({ onCheck }: Props) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = address.trim();
    if (!trimmed || !trimmed.includes('@')) {
      setError('\u0110\u1ECBa ch\u1EC9 email kh\u00F4ng h\u1EE3p l\u1EC7');
      return;
    }
    setError('');
    onCheck(trimmed);
    setAddress('');
  };

  return (
    <Card>
      <h3 className="mb-2 text-sm font-semibold">{"Ki\u1EC3m tra \u0111\u1ECBa ch\u1EC9 c\u00F3 s\u1EB5n"}</h3>
      <div className="space-y-2">
        <Input
          value={address}
          onChange={(e) => { setAddress(e.target.value); setError(''); }}
          placeholder="user@domain.com"
        />
        {error && <p className="text-xs text-red-300">{error}</p>}
        <Button onClick={handleSubmit} disabled={!address.trim()}>
          {"M\u1EDF inbox n\u00E0y"}
        </Button>
      </div>
    </Card>
  );
}
