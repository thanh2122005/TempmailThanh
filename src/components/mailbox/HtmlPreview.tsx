import DOMPurify from 'dompurify';

export function HtmlPreview({ html }: { html?: string }) {
  if (!html) {
    return (
      <p className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-slate-400">
        Email này không có nội dung HTML.
      </p>
    );
  }
  const clean = DOMPurify.sanitize(html, {
    FORBID_TAGS: ['style', 'script'],
    FORBID_ATTR: ['onerror', 'onload'],
  });
  return (
    <div
      className="email-html max-w-none rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
