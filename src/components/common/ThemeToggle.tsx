import { SunMoon } from 'lucide-react';
import { Button } from './Button';

export function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return <Button className="bg-slate-700 hover:bg-slate-600" onClick={onToggle}><SunMoon size={16} /></Button>;
}
