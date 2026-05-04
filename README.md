# TempMail MVP+

Ứng dụng Temp Mail frontend-only, dùng API công khai `mail.cskh-group.com`, tối ưu để deploy free trên Vercel.

## Giới thiệu
Project này là web app React + Vite + TypeScript + Tailwind cho hộp thư tạm thời. Ứng dụng không cần backend riêng, không cần database, không cần VPS.

## Tính năng
- Tạo email tạm ngẫu nhiên.
- Tạo email tạm tùy chỉnh `username + domain`.
- Lấy domain động từ API `/api/domains` (không hardcode domain).
- Copy địa chỉ email hiện tại.
- Refresh inbox thủ công.
- Polling inbox tự động.
- Xem danh sách email, chọn email để xem chi tiết.
- Tab HTML/Văn bản cho nội dung mail.
- Sanitize HTML bằng DOMPurify trước khi render.
- Lưu recent addresses, read/unread state, theme bằng localStorage.
- Responsive desktop/tablet/mobile.

## Tech stack
- React
- Vite
- TypeScript
- Tailwind CSS
- DOMPurify
- lucide-react

## Vì sao không cần DB
- Dữ liệu email lấy trực tiếp từ API provider.
- Trạng thái cục bộ lưu bằng localStorage.
- Không có auth/user system trong phạm vi MVP.

## Vì sao deploy free được
- App là static frontend build ra thư mục `dist`.
- Có thể deploy trực tiếp trên `*.vercel.app`.

## Cài đặt
```bash
npm install
```

## Chạy local
```bash
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Env
Tạo `.env` từ `.env.example`:

```bash
VITE_API_BASE_URL=https://mail.cskh-group.com
```

## Deploy Vercel
1. Push code lên GitHub.
2. Import project vào Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Set env: `VITE_API_BASE_URL=https://mail.cskh-group.com`.
7. Deploy.

## Deploy Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Env: `VITE_API_BASE_URL=https://mail.cskh-group.com`

## Deploy Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Env: `VITE_API_BASE_URL=https://mail.cskh-group.com`

## Cấu trúc thư mục
- `src/api`: API client + provider adapter
- `src/components`: UI components
- `src/hooks`: business hooks
- `src/pages`: page composition
- `src/utils`: helpers
- `docs`: plan/checklist/review/deploy docs

## Lưu ý API / domain mail
- Tính năng tạo địa chỉ tùy chỉnh (/api/custom) phụ thuộc hoàn toàn vào API provider. Hiện tại API thật đang trả về 404, ứng dụng đã xử lý hiển thị lỗi thân thiện thay vì crash.
- Domain mailbox lấy từ API `/api/domains`.
- Không hardcode domain kiểu `@guerrillamail.com` trong UI chính.
- Domain mail thuộc provider API, không phải tài sản domain của app.

## Bảo mật HTML email
- Render HTML email qua DOMPurify sanitize.
- Không render raw HTML chưa sanitize.

## Troubleshooting
- `npm install` timeout:
  - Dùng hướng dẫn trong `docs/LOCAL_BUILD_FIX.md`.
  - Thử registry mirror `https://registry.npmmirror.com`.
- API/CORS lỗi:
  - Kiểm tra mạng và trạng thái API provider.
- Không thấy email mới:
  - Chờ vài giây rồi bấm refresh inbox.

## Ghi chú Free 100%
- Free 100% khi dùng hosting free (ví dụ `*.vercel.app`).
- Nếu muốn domain web riêng thì cần mua domain.
- Nếu muốn domain mail riêng (`@tenban.com`) cần sở hữu domain và cấu hình mail/MX riêng.

