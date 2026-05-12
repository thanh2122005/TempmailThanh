/**
 * OTP / verification-code extraction.
 *
 * Strategy:
 *  1. Build a text corpus from subject + plain text + text extracted from HTML.
 *  2. Enumerate numeric candidates of 4–8 digits (including split "123 456" / "123-456").
 *  3. Score each candidate based on:
 *       - Proximity to OTP-related keywords (English + Vietnamese)
 *       - Preferred lengths (6 digits > 4/5 > 7/8)
 *       - Appearing in the subject line
 *       - Penalty for looking like a year (19xx/20xx) without a keyword
 *       - Penalty for being part of a date / timestamp fragment (surrounded by / - .)
 *  4. Require a minimum score, else return null.
 */

export interface OtpExtractionInput {
  subject?: string | null;
  text?: string | null;
  html?: string | null;
}

const KEYWORDS: readonly string[] = [
  // English
  'otp',
  'verification code',
  'verify code',
  'verification',
  'security code',
  'login code',
  'confirmation code',
  'confirm code',
  'passcode',
  'one time password',
  'one-time password',
  'one time code',
  'one-time code',
  'access code',
  'auth code',
  'authentication code',
  'pin code',
  'your code',
  'your pin',
  'sign in code',
  'sign-in code',
  // Vietnamese (accent-stripped, since we normalize)
  'ma otp',
  'ma xac minh',
  'ma xac thuc',
  'ma xac nhan',
  'ma dang nhap',
  'ma bao mat',
  'ma kich hoat',
  'ma pin',
  'ma so xac minh',
  'ma code',
  'ma kiem tra',
];

const MIN_SCORE = 4;

/** Convert an HTML string to clean plain text. */
function htmlToPlainText(html: string): string {
  if (!html) return '';
  try {
    if (typeof DOMParser !== 'undefined') {
      const doc = new DOMParser().parseFromString(html, 'text/html');
      doc.querySelectorAll('script, style, noscript').forEach((el) => el.remove());
      // Insert newlines for block-level elements so numbers don't glue to surrounding text.
      doc.querySelectorAll('br').forEach((el) => el.replaceWith('\n'));
      doc.querySelectorAll('p, div, li, tr, td, th, h1, h2, h3, h4, h5, h6').forEach((el) => {
        el.append('\n');
      });
      return (doc.body?.textContent || '').replace(/\u00a0/g, ' ');
    }
  } catch {
    // fall through to regex fallback
  }
  return html.replace(/<[^>]+>/g, ' ');
}

/** Lowercase and strip diacritics so Vietnamese keywords match regardless of accent. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\u00a0/g, ' ');
}

interface Candidate {
  value: string;
  index: number;
  length: number;
  score: number;
}

function scoreCandidate(
  candidate: Omit<Candidate, 'score'>,
  fullText: string,
  normalized: string,
  subjectLength: number,
): number {
  const { value, index, length } = candidate;
  let score = 0;

  // Length preference — 6 digits is the most common OTP length.
  if (length === 6) score += 4;
  else if (length === 4) score += 3;
  else if (length === 5) score += 3;
  else if (length === 7) score += 2;
  else if (length === 8) score += 2;

  // Bonus when the candidate lives inside the subject line.
  if (index < subjectLength) score += 5;

  // Keyword proximity.
  const tight = normalized.slice(Math.max(0, index - 80), index + length + 80);
  const broad = normalized.slice(Math.max(0, index - 240), index + length + 240);

  let tightHit = false;
  for (const kw of KEYWORDS) {
    if (tight.includes(kw)) {
      tightHit = true;
      break;
    }
  }
  if (tightHit) {
    score += 9;
  } else {
    for (const kw of KEYWORDS) {
      if (broad.includes(kw)) {
        score += 3;
        break;
      }
    }
  }

  // Penalty: looks like a date/time fragment (surrounded by / - .).
  const prev = fullText[index - 1];
  const next = fullText[index + length];
  const dateChars = new Set(['/', '-', '.']);
  if ((prev && dateChars.has(prev)) || (next && dateChars.has(next))) {
    score -= 4;
  }

  // Penalty: looks like a year and has no nearby keyword.
  if (length === 4) {
    const n = Number(value);
    if (n >= 1900 && n <= 2099 && !tightHit) {
      score -= 5;
    }
  }

  // Penalty: looks like a phone-number segment "0987 654 321"
  // i.e. a sibling 3–4 digit group right next to us separated only by a single space.
  const phoneContext = fullText.slice(Math.max(0, index - 12), index + length + 12);
  if (/\b\d{3,4}\s\d{3,4}\s\d{3,4}\b/.test(phoneContext)) {
    score -= 3;
  }

  // Penalty: all same digit (e.g. "000000") is almost certainly not real.
  if (/^(\d)\1+$/.test(value)) {
    score -= 4;
  }

  return score;
}

function collectCandidates(fullText: string): Candidate[] {
  const out: Candidate[] = [];
  const seenAt = new Set<number>();

  // Split OTP patterns like "123 456" or "123-456" → stitched value.
  const splitRe = /\b(\d{3,4})[\s\-\u00b7\u2022](\d{3,4})\b/g;
  let m: RegExpExecArray | null;
  while ((m = splitRe.exec(fullText)) !== null) {
    const combined = m[1] + m[2];
    if (combined.length >= 4 && combined.length <= 8) {
      out.push({ value: combined, index: m.index, length: m[0].length, score: 0 });
      seenAt.add(m.index);
    }
  }

  // Standard contiguous 4–8 digit groups.
  const numRe = /\b\d{4,8}\b/g;
  while ((m = numRe.exec(fullText)) !== null) {
    if (seenAt.has(m.index)) continue;
    out.push({ value: m[0], index: m.index, length: m[0].length, score: 0 });
  }

  return out;
}

/**
 * Extract the most likely OTP / verification code from an email.
 * Returns the digit-only string (e.g. "997325") or null when nothing convincing is found.
 */
export function extractOtp(input: OtpExtractionInput): string | null {
  const subject = (input.subject || '').trim();
  const text = (input.text || '').trim();
  const htmlText = input.html ? htmlToPlainText(input.html).trim() : '';

  // Subject first so subject-based candidates get a low index.
  const parts: string[] = [];
  if (subject) parts.push(subject);
  const bodyParts: string[] = [];
  if (text) bodyParts.push(text);
  if (htmlText && htmlText !== text) bodyParts.push(htmlText);
  const body = bodyParts.join('\n\n');
  if (body) parts.push(body);

  const fullText = parts.join('\n\n');
  if (!fullText) return null;

  const subjectLength = subject.length;
  const normalized = normalize(fullText);

  const candidates = collectCandidates(fullText);
  if (candidates.length === 0) return null;

  for (const c of candidates) {
    c.score = scoreCandidate(c, fullText, normalized, subjectLength);
  }

  candidates.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.index - b.index;
  });

  const best = candidates[0];
  if (best.score < MIN_SCORE) return null;
  return best.value;
}

/** Convenience for summarising a message down to just its plain text. */
export function messageToPlainText(input: OtpExtractionInput): string {
  const parts: string[] = [];
  const subject = (input.subject || '').trim();
  if (subject) parts.push(subject);
  const text = (input.text || '').trim();
  if (text) parts.push(text);
  const html = (input.html || '').trim();
  if (html) {
    const htmlText = htmlToPlainText(html).trim();
    if (htmlText && htmlText !== text) parts.push(htmlText);
  }
  return parts.join('\n\n');
}
