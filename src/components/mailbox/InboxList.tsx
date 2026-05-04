import type { InboxMessage, ReadStatusMap } from '../../types/api';
import { EmptyState } from '../common/EmptyState';
import { ErrorState } from '../common/ErrorState';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { InboxItem } from './InboxItem';

interface Props {
  currentAddress: string;
  messages: InboxMessage[];
  loading: boolean;
  error: string;
  selectedId: string;
  readMap: ReadStatusMap;
  onSelect: (id: string) => void;
  onRetry: () => void;
}

export function InboxList({ currentAddress, messages, loading, error, selectedId, readMap, onSelect, onRetry }: Props) {
  if (loading) return <div className="space-y-2"><LoadingSkeleton /><LoadingSkeleton /><LoadingSkeleton /></div>;
  if (error && messages.length === 0) return <ErrorState message={error} onRetry={onRetry} />;
  if (messages.length === 0) return <EmptyState message="Sao chép địa chỉ và dùng để đăng ký dịch vụ. Email sẽ xuất hiện ở đây trong vài giây." />;
  return <div className="space-y-2">{messages.map((message) => <InboxItem key={message.id} message={message} selected={selectedId === message.id} read={!!readMap[`${currentAddress}:${message.id}`]} onClick={() => onSelect(message.id)} />)}</div>;
}
