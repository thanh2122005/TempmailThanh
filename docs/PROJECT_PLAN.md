# Project Plan

## M?c tiêu s?n ph?m
Xây d?ng web app Temp Mail frontend-only, production-ready m?c MVP+, dùng API công khai `mail.cskh-group.com`, ch?y free trên Vercel.

## Tech stack
- React + Vite + TypeScript
- Tailwind CSS
- DOMPurify
- lucide-react
- localStorage

## Vì sao không c?n DB
- D? li?u mailbox du?c cung c?p hoàn toàn t? API provider.
- Tr?ng thái c?c b? (theme, recent addresses, read status) luu localStorage.
- Không có yêu c?u user/account riêng.

## Vì sao ch? c?n Vercel free hosting
- App là static frontend.
- Không có backend runtime, cron, database.
- Build output t? Vite có th? serve tr?c ti?p trên Vercel free tier.

## Ki?n trúc frontend-only
- UI g?i API qua `tempMailApi` wrapper.
- `TempMailProvider` adapter tách l?p provider.
- State chính d?t trong custom hooks.
- Local persistence qua l?p storage an toàn.

## Module chính
- API client + provider
- Core hooks (temp mail, polling, recent, theme, toast)
- Mailbox UI (address/inbox/detail)
- Common UI components
- Utility (format/time/validators/storage)

## Lu?ng ngu?i dùng
1. Vào app -> load theme + recent + domains.
2. T?o d?a ch? ng?u nhiên (ho?c dùng d?a ch? dã luu).
3. Nh?n mail trong inbox, polling t? d?ng.
4. Ch?n mail xem chi ti?t HTML/Text dã sanitize.

## R?i ro k? thu?t
- API ch?m/l?i t?m th?i.
- D? li?u response thi?u field.
- Polling gây race condition.
- HTML email ch?a script d?c h?i.

## Cách x? lý r?i ro
- Timeout + thông báo l?i ti?ng Vi?t + retry.
- Fallback d? li?u khi thi?u field.
- Guard request race b?ng request key + cleanup interval.
- Sanitize HTML b?ng DOMPurify tru?c khi render.
