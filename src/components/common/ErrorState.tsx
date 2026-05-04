import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface Props { message: string; onRetry?: () => void }

export function ErrorState({ message, onRetry }: Props) {
  return <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 text-sm"><div className="mb-2 flex items-center gap-2"><AlertCircle size={16} />{message}</div>{onRetry && <Button onClick={onRetry}>Thu lai</Button>}</div>;
}
