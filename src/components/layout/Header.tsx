import { ThemeToggle } from '../common/ThemeToggle';

export function Header({ onToggleTheme }: { onToggleTheme: () => void }) {
  return <header className="mb-4 flex items-center justify-between rounded-xl border border-slate-700/60 bg-slate-900/70 p-4"><div><h1 className="text-xl font-semibold">TempMail</h1><p className="text-sm text-slate-300">{"H\u1ED9p th\u01B0 t\u1EA1m th\u1EDDi mi\u1EC5n ph\u00ED"}</p></div><div className="flex items-center gap-3"><span className="rounded-full border border-slate-600 px-2 py-1 text-xs">{"API c\u00F4ng khai"}</span><ThemeToggle onToggle={onToggleTheme} /></div></header>;
}
