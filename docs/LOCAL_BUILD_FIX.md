# LOCAL_BUILD_FIX

Dùng các lệnh này trên máy/network ổn định hơn để hoàn tất install + build.

## 1) Dọn cache npm
```bash
npm cache clean --force
```

## 2) Cài từ registry chính
```bash
npm install --registry=https://registry.npmjs.org/ --fetch-timeout=120000 --fetch-retries=5 --no-audit --no-fund
```

## 3) Build
```bash
npm run build
```

## 4) Nếu registry chính chậm/timeout, dùng mirror
```bash
npm cache clean --force
npm install --registry=https://registry.npmmirror.com --fetch-timeout=120000 --fetch-retries=5 --no-audit --no-fund
npm run build
```

## 5) Nếu vẫn lỗi, clean reinstall
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install --registry=https://registry.npmmirror.com --fetch-timeout=120000 --fetch-retries=5 --no-audit --no-fund --legacy-peer-deps
npm run build
```

### PowerShell tương đương bước 5
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm cache clean --force
npm install --registry=https://registry.npmmirror.com --fetch-timeout=120000 --fetch-retries=5 --no-audit --no-fund --legacy-peer-deps
npm run build
```
