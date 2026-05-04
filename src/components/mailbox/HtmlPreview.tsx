import DOMPurify from 'dompurify';

export function HtmlPreview({ html }: { html?: string }) {
  if (!html) return <p className="text-sm text-slate-300">{"Email n\u00E0y kh\u00F4ng c\u00F3 n\u1ED9i dung HTML."}</p>;
  return <div className="max-w-none rounded-xl border border-slate-700 p-3 text-sm" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
}
