import { useState } from 'react';

export function useClipboard() {
  const [copied, setCopied] = useState(false);

  async function copy(text: string): Promise<boolean> {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
      return true;
    } catch {
      return false;
    }
  }

  return { copy, copied };
}
