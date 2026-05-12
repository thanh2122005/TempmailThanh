import { Moon, Sun } from 'lucide-react';
import { Button } from './Button';

interface Props {
  theme?: 'dark' | 'light';
  onToggle: () => void;
}

export function ThemeToggle({ theme = 'dark', onToggle }: Props) {
  return (
    <Button
      variant="secondary"
      size="md"
      iconOnly
      aria-label="Đổi giao diện"
      title="Đổi giao diện"
      onClick={onToggle}
      leftIcon={theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
    />
  );
}
