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
  if (!message) return <Card>{"Ch\u1ECDn m\u1ED9t email \u0111\u1EC3 xem n\u1ED9i dung"}</Card>;
  return <Card><h3 className="mb-1 text-sm font-semibold">{normalizeEmailSubject(message.subject)}</h3><p className="text-xs text-slate-300">{"T\u1EEB"}: {message.from || 'Kh\u00F4ng r\u00F5 ng\u01B0\u1EDDi g\u1EEDi'}</p><p className="text-xs text-slate-300">{"\u0110\u1EBFn"}: {message.to || 'Kh\u00F4ng r\u00F5 ng\u01B0\u1EDDi nh\u1EADn'}</p><p className="mb-3 text-xs text-slate-400">{formatDateTime(message.receivedAt)}</p><MessageTabs active={tab} onChange={setTab} />{tab === 'html' ? <HtmlPreview html={message.html} /> : <pre className="whitespace-pre-wrap rounded-xl border border-slate-700 p-3 text-xs">{message.text || 'Email n\u00E0y kh\u00F4ng c\u00F3 n\u1ED9i dung v\u0103n b\u1EA3n.'}</pre>}<div className="mt-3"><Button onClick={() => onCopy(tab === 'html' ? message.html || '' : message.text || '')}>{"Sao ch\u00E9p n\u1ED9i dung"}</Button></div></Card>;
}
