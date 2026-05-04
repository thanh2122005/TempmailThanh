import DOMPurify from 'dompurify';

export function HtmlPreview({ html }: { html?: string }) {
  if (!html) return <p className="text-sm text-slate-300">Email này không có nội dung HTML.</p>;
  return <div className="max-w-none rounded-xl border border-slate-700 p-3 text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}
