# Providers README

- `cskh-group` la provider chinh duoc implement day du trong MVP.
- UI chi goi qua `src/api/tempMailApi.ts` va `TempMailProvider` interface.
- Khong hardcode domain trong UI, domain chi lay tu `/api/domains`.
- Co the them Mail.tm / Mail.gw / Guerrilla Mail sau nay bang adapter moi.
- Khi doi provider, chi can sua lop provider, khong sua component UI.
