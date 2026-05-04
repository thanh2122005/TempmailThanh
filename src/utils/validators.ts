const USERNAME_REGEX = /^[a-z0-9._-]{1,40}$/;

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function validateUsername(username: string): string | null {
  const value = normalizeUsername(username);
  if (!value) return 'Tên không du?c d? tr?ng';
  if (value.length > 40) return 'Tên t?i da 40 ký t?';
  if (!USERNAME_REGEX.test(value)) return 'Tên ch? du?c dùng a-z, 0-9, d?u ch?m, g?ch du?i, g?ch ngang';
  if (value.startsWith('.') || value.endsWith('.')) return 'Tên không nên b?t d?u ho?c k?t thúc b?ng d?u ch?m';
  if (value.includes('..')) return 'Tên không nên ch?a hai d?u ch?m liên ti?p';
  return null;
}

export function isValidEmailLikeAddress(address: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address);
}
