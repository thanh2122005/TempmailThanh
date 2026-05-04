import { useState } from 'react';
import type { MailDetail } from '../../types/api';
import { formatDateTime, normalizeEmailSubject } from '../../utils/format';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { ErrorState } from '../common/ErrorState';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { HtmlPreview } from './HtmlPreview';
import { MessageTabs } from './MessageTabs';

interface Props {
  message: MailDetail | null;
  loading: boolean;
  error: string;
  onRetry: () => void;
  onCopy: (content: string) => void;
}

export function MessageDetail({ message, loading, error, onRetry, onCopy }: Props) {
  const [tab, setTab] = useState<'html' | 'text'>('html');
  if (loading) return <LoadingSkeleton />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (!message) return <Card>Ch?n m?t email d? xem n?i dung</Card>;
  return <Card><h3 className="mb-1 text-sm font-semibold">{normalizeEmailSubject(message.subject)}</h3><p className="text-xs text-slate-300">T?: {message.from || 'Không rõ ngu?i g?i'}</p><p className="text-xs text-slate-300">Ð?n: {message.to || 'Không rõ ngu?i nh?n'}</p><p className="mb-3 text-xs text-slate-400">{formatDateTime(message.receivedAt)}</p><MessageTabs active={tab} onChange={setTab} />{tab === 'html' ? <HtmlPreview html={message.html} /> : <pre className="whitespace-pre-wrap rounded-xl border border-slate-700 p-3 text-xs">{message.text || 'Email này không có n?i dung van b?n.'}</pre>}<div className="mt-3"><Button onClick={() => onCopy(tab === 'html' ? message.html || '' : message.text || '')}>Sao chép n?i dung</Button></div></Card>;
}
