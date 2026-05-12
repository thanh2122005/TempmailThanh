import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from './Button';

interface Props {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: Props) {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-rose-400/20 bg-rose-500/5 p-4">
      <div className="flex items-start gap-2 text-sm text-rose-200">
        <AlertCircle size={18} className="mt-0.5 shrink-0" />
        <span className="leading-relaxed">{message}</span>
      </div>
      {onRetry && (
        <Button size="sm" variant="secondary" onClick={onRetry} leftIcon={<RefreshCw size={14} />}>
          Thử lại
        </Button>
      )}
    </div>
  );
}
