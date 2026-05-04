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
  if (messages.length === 0) return <EmptyState message={"Sao ch\u00E9p \u0111\u1ECBa ch\u1EC9 v\u00E0 d\u00F9ng \u0111\u1EC3 \u0111\u0103ng k\u00FD d\u1ECBch v\u1EE5. Email s\u1EBD xu\u1EA5t hi\u1EC7n \u1EDF \u0111\u00E2y trong v\u00E0i gi\u00E2y."} />;
  return <div className="space-y-2">{messages.map((message) => <InboxItem key={message.id} message={message} selected={selectedId === message.id} read={!!readMap[`${currentAddress}:${message.id}`]} onClick={() => onSelect(message.id)} />)}</div>;
}
