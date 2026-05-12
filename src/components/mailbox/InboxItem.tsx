import { useMemo } from 'react';
import { UserCircle2 } from 'lucide-react';
import type { InboxMessage } from '../../types/api';
import { getMessagePreview, normalizeEmailSubject, formatRelativeTime } from '../../utils/format';
import { extractOtp } from '../../utils/otp';
import { cn } from '../../utils/cn';
import { OtpChip } from './OtpChip';

interface Props {
  message: InboxMessage;
  selected: boolean;
  read: boolean;
  onClick: () => void;
  onCopyOtp?: (otp: string) => void;
}

function extractSenderName(from?: string): string {
  if (!from) return 'Không rõ người gửi';
  const match = from.match(/^\s*"?([^"<]+?)"?\s*<[^>]+>\s*$/);
  return (match?.[1] || from).trim();
}

function initials(name: string): string {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || '')
    .join('');
  return letters || '?';
}

export function InboxItem({ message, selected, read, onClick, onCopyOtp }: Props) {
  const sender = extractSenderName(message.from);
  const otp = useMemo(
    () => extractOtp({ subject: message.subject, text: message.text, html: message.html }),
    [message.subject, message.text, message.html],
  );

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'group relative w-full overflow-hidden rounded-2xl border p-3 text-left transition-all',
        selected
          ? 'border-indigo-400/60 bg-indigo-500/10 shadow-[0_0_0_1px_rgba(129,140,248,0.3)]'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]',
      )}
    >
      {!read && !selected && (
        <span className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-indigo-400 via-violet-400 to-fuchsia-400" />
      )}
      <div className="flex gap-3">
        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ring-1 ring-inset',
            selected
              ? 'bg-indigo-500/25 text-indigo-100 ring-indigo-400/30'
              : 'bg-white/5 text-slate-200 ring-white/10',
          )}
          aria-hidden
        >
          {sender === 'Không rõ người gửi' ? (
            <UserCircle2 size={18} />
          ) : (
            <span className="select-none">{initials(sender)}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p
              className={cn(
                'min-w-0 flex-1 truncate text-xs',
                read ? 'text-slate-400' : 'font-semibold text-slate-100',
              )}
            >
              {sender}
            </p>
            <span className="shrink-0 text-[10px] text-slate-500">
              {formatRelativeTime(message.receivedAt)}
            </span>
          </div>
          <p
            className={cn(
              'mt-0.5 truncate text-sm',
              read ? 'text-slate-300' : 'font-semibold text-slate-50',
            )}
          >
            {normalizeEmailSubject(message.subject)}
          </p>
          <p className="mt-1 line-clamp-2 text-xs text-slate-400">
            {getMessagePreview(message)}
          </p>
          {otp && (
            <div className="mt-2 flex items-center gap-1.5">
              <OtpChip otp={otp} onCopy={onCopyOtp ? (val) => onCopyOtp(val) : undefined} />
              {!read && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
                  Mới
                </span>
              )}
            </div>
          )}
          {!otp && !read && (
            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-medium text-indigo-200 ring-1 ring-inset ring-indigo-400/30">
              Mới
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
