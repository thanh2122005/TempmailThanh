# API Contract

## Base URL
- `VITE_API_BASE_URL` (m?c d?nh: `https://mail.cskh-group.com`)

## Endpoints s? d?ng

### 1) GET `/api/domains`
- M?c dích: l?y domain kh? d?ng.
- Response d? ki?n: `{ "domains": string[] }`
- Fallback: n?u `domains` không ph?i m?ng -> tr? m?ng r?ng + báo l?i.

### 2) POST `/api/new`
- M?c dích: t?o d?a ch? ng?u nhiên.
- Body: không b?t bu?c.
- Response: `{ address, expiresAt?, ttl? }`
- Fallback: thi?u `address` -> throw l?i h?p l? d? li?u.

### 3) POST `/api/custom`
- M?c dích: t?o d?a ch? tùy ch?nh.
- Body: `{ username: string, domain: string }`
- Validate username tru?c khi g?i API.
- Response: `{ address, expiresAt?, ttl? }`

### 4) GET `/api/inbox/:address`
- M?c dích: l?y inbox.
- Luu ý: `address` ph?i `encodeURIComponent(address)`.
- Response: `{ messages: InboxMessage[], expiresAt? }`
- Fallback: thi?u `messages` -> dùng `[]`.

### 5) GET `/api/mail/:address/:id`
- M?c dích: l?y chi ti?t mail.
- Luu ý:
  - `address` ph?i `encodeURIComponent(address)`
  - `id` ph?i `encodeURIComponent(id)`
- Response: Mail detail object.

### 6) POST `/api/domains/add` (optional)
- M?c dích: thêm domain m?i (nâng cao).
- Không dua vào UI m?c d?nh MVP.

## Error handling
- Timeout 15 giây b?ng `AbortController`.
- HTTP l?i: parse message t? response n?u có.
- Network/CORS l?i: tr? thông di?p ti?ng Vi?t thân thi?n.
- JSON l?i: fallback object r?ng, không crash.

## Quy t?c an toàn d? li?u
- Không gi? d?nh field luôn t?n t?i.
- Chu?n hóa fallback cho `subject`, `from`, `receivedAt` ? UI layer.
