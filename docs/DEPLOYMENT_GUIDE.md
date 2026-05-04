# Deployment Guide

## Vercel
1. Push code lên GitHub.
2. Import project vào Vercel.
3. Framework preset: Vite.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Env: `VITE_API_BASE_URL=https://mail.cskh-group.com`.
7. Deploy.
8. Dùng subdomain free d?ng `ten-web.vercel.app`.

## Netlify
- Build command: `npm run build`
- Publish directory: `dist`
- Env: `VITE_API_BASE_URL=https://mail.cskh-group.com`

## Cloudflare Pages
- Build command: `npm run build`
- Output directory: `dist`
- Env: `VITE_API_BASE_URL=https://mail.cskh-group.com`

## Ghi chú
- Không c?n DB.
- Không c?n VPS.
- Không c?n backend riêng.
- Không c?n domain riêng (optional, có th? t?n phí).
