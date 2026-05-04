const USERNAME_REGEX = /^[a-z0-9._-]{1,40}$/;

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function validateUsername(username: string): string | null {
  const value = normalizeUsername(username);
  if (!value) return 'T�n kh�ng du?c d? tr?ng';
  if (value.length > 40) return 'T�n tại da 40 k� t?';
  if (!USERNAME_REGEX.test(value)) return 'T�n ch? du?c d�ng a-z, 0-9, d?u ch?m, g?ch du?i, g?ch ngang';
  if (value.startsWith('.') || value.endsWith('.')) return 'T�n kh�ng n�n b?t d?u ho?c k?t th�c b?ng d?u ch?m';
  if (value.includes('..')) return 'Tên không nên chứa hai dấu chấm liên tiếp';
  return null;
}

export function isValidEmailLikeAddress(address: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address);
}
