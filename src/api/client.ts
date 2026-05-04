export class ApiRequestError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://mail.cskh-group.com';

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
          : `Yeu cau that bai (${response.status})`;
      throw new ApiRequestError(message, response.status);
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiRequestError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiRequestError('Het thoi gian cho API, vui long thu lai.');
    }
    throw new ApiRequestError('Khong the ket noi API. Vui long kiem tra mang/CORS.');
  } finally {
    clearTimeout(timeoutId);
  }
}
