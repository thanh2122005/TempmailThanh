const USERNAME_REGEX = /^[a-z0-9._-]{1,40}$/;

export function normalizeUsername(username: string): string {
  return username.trim().toLowerCase();
}

export function validateUsername(username: string): string | null {
  const value = normalizeUsername(username);
  if (!value) return 'T\u00EAn kh\u00F4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng';
  if (value.length > 40) return 'T\u00EAn t\u1ED1i \u0111a 40 k\u00FD t\u1EF1';
  if (!USERNAME_REGEX.test(value)) return 'T\u00EAn ch\u1EC9 \u0111\u01B0\u1EE3c d\u00F9ng a-z, 0-9, d\u1EA5u ch\u1EA5m, g\u1EA1ch d\u01B0\u1EDBi, g\u1EA1ch ngang';
  if (value.startsWith('.') || value.endsWith('.')) return 'T\u00EAn kh\u00F4ng n\u00EAn b\u1EAFt \u0111\u1EA7u ho\u1EB7c k\u1EBFt th\u00FAc b\u1EB1ng d\u1EA5u ch\u1EA5m';
  if (value.includes('..')) return 'T\u00EAn kh\u00F4ng n\u00EAn ch\u1EE9a hai d\u1EA5u ch\u1EA5m li\u00EAn ti\u1EBFp';
  return null;
}

export function isValidEmailLikeAddress(address: string): boolean {
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(address);
}
