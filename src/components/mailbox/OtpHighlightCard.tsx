import { useEffect, useState } from 'react';
import { Check, Copy, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

interface Props {
  otp: string;
  onCopyOtp: (otp: string) => Promise<boolean> | boolean;
  onCopyFull?: () => void;
  fullLabel?: string;
  compact?: boolean;
}

export function OtpHighlightCard({
  otp,
  onCopyOtp,
  onCopyFull,
  fullLabel = 'Copy toàn bộ nội dung',
  compact = false,
}: Props) {
  const [justCopied, setJustCopied] = useState(false);

  useEffect(() => {
    setJustCopied(false);
  }, [otp]);

  const handleCopy = async () => {
    const ok = await onCopyOtp(otp);
    if (ok) {
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }
  };

  // Render OTP with spacing every 3 digits for readability
  const pretty =
    otp.length >= 6 ? `${otp.slice(0, Math.ceil(otp.length / 2))} ${otp.slice(Math.ceil(otp.length / 2))}` : otp;

  return (
    <div
      className={cn(
        'otp-glow relative overflow-hidden rounded-3xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/15 via-violet-500/10 to-fuchsia-500/10 p-5 shadow-[0_10px_40px_-12px_rgba(99,102,241,0.55)] backdrop-blur-md',
        compact ? 'p-4' : 'p-5 md:p-6',
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-indigo-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-fuchsia-500/15 blur-3xl"
      />

      <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.15em] text-indigo-200">
            <ShieldCheck size={13} />
            Mã xác minh
          </div>
          <p
            className={cn(
              'mt-3 select-all font-mono font-bold leading-none text-white tabular-nums tracking-[0.3em]',
              compact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl',
            )}
          >
            {pretty}
          </p>
          <p className="mt-2 text-xs text-slate-300/80">
            Tự động phát hiện từ email. Bấm "Sao chép OTP" để copy chính xác mã.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2 md:flex-col md:items-stretch">
          <Button
            variant={justCopied ? 'success' : 'primary'}
            size="lg"
            onClick={handleCopy}
            leftIcon={justCopied ? <Check size={18} /> : <Copy size={18} />}
          >
            {justCopied ? `Đã copy ${otp}` : 'Sao chép OTP'}
          </Button>
          {onCopyFull && (
            <Button variant="secondary" size="sm" onClick={onCopyFull}>
              {fullLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
