import type { MouseEvent } from 'react';
import { Copy, ShieldCheck } from 'lucide-react';
import { cn } from '../../utils/cn';

interface Props {
  otp: string;
  onCopy?: (otp: string, e: MouseEvent<HTMLButtonElement>) => void;
  size?: 'xs' | 'sm';
  className?: string;
}

export function OtpChip({ otp, onCopy, size = 'sm', className }: Props) {
  const content = (
    <>
      <ShieldCheck size={size === 'xs' ? 12 : 13} className="shrink-0" />
      <span className="text-[10px] font-semibold tracking-wider text-indigo-200/80">OTP</span>
      <span
        className={cn(
          'font-mono font-semibold tracking-wider text-white',
          size === 'xs' ? 'text-[11px]' : 'text-xs',
        )}
      >
        {otp}
      </span>
      {onCopy && <Copy size={size === 'xs' ? 11 : 12} className="ml-0.5 opacity-70" />}
    </>
  );

  const shared = cn(
    'inline-flex items-center gap-1.5 rounded-full border border-indigo-400/40 bg-indigo-500/10 px-2 py-0.5 text-indigo-100',
    'transition-colors',
    size === 'xs' ? 'text-[10px]' : 'text-xs',
    className,
  );

  if (onCopy) {
    return (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onCopy(otp, e);
        }}
        className={cn(shared, 'hover:bg-indigo-500/20 hover:border-indigo-300/60')}
        title={`Sao chép OTP ${otp}`}
      >
        {content}
      </button>
    );
  }

  return <span className={shared}>{content}</span>;
}
