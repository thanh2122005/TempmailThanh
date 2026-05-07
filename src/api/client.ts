export class ApiRequestError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

const BASE_URL = '';

async function parseJsonSafe(response: Response): Promise<unknown> {
  try {
    return await response.json();
  } catch {
    return {};
  }
}

export async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers || {}),
      },
      signal: controller.signal,
    });

    const data = await parseJsonSafe(response);

    if (!response.ok) {
      const message =
        typeof data === 'object' && data && 'message' in data
          ? String((data as Record<string, unknown>).message)
          : `Y\u00EAu c\u1EA7u th\u1EA5t b\u1EA1i (${response.status})`;
      throw new ApiRequestError(message, response.status);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiRequestError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiRequestError('H\u1EBFt th\u1EDDi gian ch\u1EDD API, vui l\u00F2ng th\u1EED l\u1EA1i.');
    }
    throw new ApiRequestError('Kh\u00F4ng th\u1EC3 k\u1EBFt n\u1ED1i API. Vui l\u00F2ng ki\u1EC3m tra m\u1EA1ng ho\u1EB7c CORS.');
  } finally {
    clearTimeout(timeoutId);
  }
}
