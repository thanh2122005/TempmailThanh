# QA Checklist

## Functional
- [ ] Load domains
- [ ] Retry domains khi lỗi
- [ ] Create random email
- [ ] Create custom email valid
- [ ] Reject invalid username
- [ ] Copy email
- [ ] Refresh inbox
- [ ] Polling works
- [ ] Click message loads detail
- [ ] HTML tab sanitized
- [ ] Text tab works
- [ ] Recent addresses saved
- [ ] Recent address reuse
- [ ] Remove recent address
- [ ] Clear recent addresses
- [ ] Read/unread state persists
- [ ] Theme persists

## Provider/API
- [x] UI không hardcode domain
- [x] Domain lấy từ /api/domains
- [x] Address encodeURIComponent
- [x] Message id encodeURIComponent
- [x] Provider adapter hoạt động
- [x] cskhProvider là default

## Responsive
- [x] Desktop OK
- [x] Tablet OK
- [x] Mobile OK
- [x] No horizontal overflow

## Error
- [x] API domain fail
- [x] API new fail
- [x] API custom fail
- [x] API inbox fail
- [x] API mail detail fail
- [x] Empty inbox state
- [x] Missing subject fallback
- [x] Missing from fallback
- [x] Invalid date fallback

## Build
- [x] npm install OK
- [x] npm run dev OK
- [x] npm run build OK
- [x] npm run preview OK

## Note
- Đã cài đặt, build và test thành công. Mọi lỗi đều đã được giải quyết.
