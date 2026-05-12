import { MailCheck } from 'lucide-react';
import { ThemeToggle } from '../common/ThemeToggle';
import type { ThemeMode } from '../../types/ui';

interface Props {
  theme: ThemeMode;
  onToggleTheme: () => void;
  polling?: boolean;
  lastRefreshedAt?: string;
}

function formatClock(value?: string): string {
  if (!value) return '--:--';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return '--:--';
  return d.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function Header({ theme, onToggleTheme, polling, lastRefreshedAt }: Props) {
  return (
    <header className="mb-5 flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-3 pl-4 shadow-[0_8px_32px_-12px_rgba(2,6,23,0.6)] backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-4 md:pl-5">
      <div className="flex items-center gap-3">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/30">
          <MailCheck size={22} />
          <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-slate-900" />
        </div>
        <div className="min-w-0">
          <h1 className="bg-gradient-to-r from-slate-50 to-slate-300 bg-clip-text text-lg font-semibold leading-none text-transparent md:text-xl">
            TempMail
          </h1>
          <p className="mt-1 text-[11px] text-slate-400 md:text-xs">
            Hộp thư tạm thời &middot; Copy OTP chỉ với 1 click
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300"
          title={lastRefreshedAt ? `Cập nhật: ${formatClock(lastRefreshedAt)}` : undefined}
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span
              className={`absolute inline-flex h-full w-full rounded-full ${
                polling ? 'animate-ping bg-emerald-400/70' : 'bg-emerald-400/40'
              }`}
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {polling ? 'Đang đồng bộ...' : `Đã đồng bộ · ${formatClock(lastRefreshedAt)}`}
        </span>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </header>
  );
}
