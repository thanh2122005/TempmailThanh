import { cn } from '../../utils/cn';

interface Props {
  className?: string;
  lines?: number;
}

export function LoadingSkeleton({ className, lines = 1 }: Props) {
  if (lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/5 ring-1 ring-white/5" />
        ))}
      </div>
    );
  }
  return <div className={cn('h-16 animate-pulse rounded-2xl bg-white/5 ring-1 ring-white/5', className)} />;
}
