import { useState } from 'react';
import { Mail, Search } from 'lucide-react';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { isValidEmailLikeAddress } from '../../utils/validators';

interface Props {
  onCheck: (address: string) => void;
}

export function CheckAddressForm({ onCheck }: Props) {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    const trimmed = address.trim();
    if (!isValidEmailLikeAddress(trimmed)) {
      setError('Địa chỉ email không hợp lệ');
      return;
    }
    setError('');
    onCheck(trimmed);
    setAddress('');
  };

  return (
    <Card title="Kiểm tra địa chỉ có sẵn" icon={<Search size={16} />}>
      <div className="space-y-3">
        <Input
          leftIcon={<Mail size={14} />}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setError('');
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          placeholder="user@domain.com"
          invalid={!!error}
        />
        {error && <p className="text-xs text-rose-300">{error}</p>}
        <Button
          onClick={handleSubmit}
          size="md"
          variant="secondary"
          disabled={!address.trim()}
          className="w-full"
        >
          Mở inbox này
        </Button>
      </div>
    </Card>
  );
}
