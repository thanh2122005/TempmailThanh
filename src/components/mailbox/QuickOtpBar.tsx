import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Sparkles } from 'lucide-react';
import type { InboxMessage } from '../../types/api';
import { extractOtp } from '../../utils/otp';
import { formatRelativeTime, normalizeEmailSubject } from '../../utils/format';
import { cn } from '../../utils/cn';
import { Button } from '../common/Button';

interface Props {
  messages: InboxMessage[];
  onCopyOtp: (otp: string) => Promise<boolean> | boolean;
  onOpenMessage?: (id: string) => void;
}

interface LatestOtp {
  otp: string;
  message: InboxMessage;
}

export function QuickOtpBar({ messages, onCopyOtp, onOpenMessage }: Props) {
  const [justCopied, setJustCopied] = useState(false);

  const latest = useMemo<LatestOtp | null>(() => {
    for (const msg of messages) {
      const otp = extractOtp({ subject: msg.subject, text: msg.text, html: msg.html });
      if (otp) return { otp, message: msg };
    }
    return null;
  }, [messages]);

  useEffect(() => {
    setJustCopied(false);
  }, [latest?.otp]);

  if (!latest) return null;

  const pretty =
    latest.otp.length >= 6
      ? `${latest.otp.slice(0, Math.ceil(latest.otp.length / 2))} ${latest.otp.slice(
          Math.ceil(latest.otp.length / 2),
        )}`
      : latest.otp;

  const handleCopy = async () => {
    const ok = await onCopyOtp(latest.otp);
    if (ok) {
      setJustCopied(true);
      setTimeout(() => setJustCopied(false), 1500);
    }
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-fuchsia-500/10 p-4 shadow-[0_10px_30px_-16px_rgba(99,102,241,0.7)] backdrop-blur',
      )}
    >
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-indigo-500/25 blur-2xl" />
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-200 ring-1 ring-inset ring-indigo-400/40">
          <Sparkles size={18} />
        </div>

        <button
          type="button"
          onClick={() => onOpenMessage?.(latest.message.id)}
          className="min-w-0 flex-1 text-left"
        >
          <p className="text-[11px] font-medium uppercase tracking-wider text-indigo-200/80">
            OTP mới nhất
          </p>
          <p className="truncate font-mono text-2xl font-bold tracking-[0.25em] text-white">
            {pretty}
          </p>
          <p className="mt-0.5 truncate text-[11px] text-slate-300/80">
            {normalizeEmailSubject(latest.message.subject)} · {formatRelativeTime(latest.message.receivedAt)}
          </p>
        </button>

        <Button
          variant={justCopied ? 'success' : 'primary'}
          size="sm"
          onClick={handleCopy}
          leftIcon={justCopied ? <Check size={14} /> : <Copy size={14} />}
          className="shrink-0"
        >
          {justCopied ? 'Đã copy' : 'Copy ngay'}
        </Button>
      </div>
    </div>
  );
}
