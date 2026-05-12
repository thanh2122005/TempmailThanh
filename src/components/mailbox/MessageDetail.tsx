import { useMemo, useState } from 'react';
import { MailOpen } from 'lucide-react';
import type { MailDetail } from '../../types/api';
import type { MessageTab } from '../../types/ui';
import { formatDateTime, normalizeEmailSubject } from '../../utils/format';
import { extractOtp, messageToPlainText } from '../../utils/otp';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { ErrorState } from '../common/ErrorState';
import { LoadingSkeleton } from '../common/LoadingSkeleton';
import { HtmlPreview } from './HtmlPreview';
import { MessageTabs } from './MessageTabs';
import { OtpHighlightCard } from './OtpHighlightCard';

interface Props {
  message: MailDetail | null;
  loading: boolean;
  error: string;
  onRetry: () => void;
  onCopyOtp: (otp: string) => Promise<boolean>;
  onCopyFull: (content: string) => void;
}

export function MessageDetail({
  message,
  loading,
  error,
  onRetry,
  onCopyOtp,
  onCopyFull,
}: Props) {
  const [tab, setTab] = useState<MessageTab>('html');

  const otp = useMemo(
    () =>
      message
        ? extractOtp({ subject: message.subject, text: message.text, html: message.html })
        : null,
    [message],
  );

  if (loading) return <LoadingSkeleton className="h-64" />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (!message) {
    return (
      <Card padding="lg">
        <EmptyState
          icon={<MailOpen size={22} />}
          title="Chưa chọn email"
          message="Chọn một email ở hộp thư bên trái để xem nội dung. Nếu email chứa mã OTP, chúng tôi sẽ hiển thị mã ngay đây để copy nhanh."
        />
      </Card>
    );
  }

  const plainText = messageToPlainText({
    subject: message.subject,
    text: message.text,
    html: message.html,
  });

  return (
    <div className="space-y-4">
      {otp && (
        <OtpHighlightCard
          otp={otp}
          onCopyOtp={onCopyOtp}
          onCopyFull={() => onCopyFull(plainText)}
        />
      )}

      <Card padding="lg">
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <h3 className="break-words text-base font-semibold text-slate-100 md:text-lg">
              {normalizeEmailSubject(message.subject)}
            </h3>
            <dl className="mt-2 space-y-1 text-xs text-slate-400">
              <div className="flex gap-2">
                <dt className="w-10 shrink-0 text-slate-500">Từ</dt>
                <dd className="min-w-0 flex-1 break-words text-slate-300">
                  {message.from || 'Không rõ người gửi'}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-10 shrink-0 text-slate-500">Đến</dt>
                <dd className="min-w-0 flex-1 break-words text-slate-300">
                  {message.to || 'Không rõ người nhận'}
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-10 shrink-0 text-slate-500">Lúc</dt>
                <dd className="min-w-0 flex-1 text-slate-300">
                  {formatDateTime(message.receivedAt)}
                </dd>
              </div>
            </dl>
          </div>
          <MessageTabs active={tab} onChange={setTab} />
        </div>

        {tab === 'html' ? (
          <HtmlPreview html={message.html} />
        ) : (
          <pre className="max-h-[520px] overflow-auto whitespace-pre-wrap rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs leading-relaxed text-slate-200">
            {message.text || 'Email này không có nội dung văn bản.'}
          </pre>
        )}

        {!otp && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-3 text-xs text-slate-400">
            <span>Không phát hiện được mã OTP trong email này.</span>
            <button
              type="button"
              onClick={() => onCopyFull(plainText)}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200 transition-colors hover:bg-white/10"
            >
              Copy toàn bộ nội dung
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}
