const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replacements = [
    [/H.\?p thu t.\?m th.\?i mi.\?n ph./g, 'Hộp thư tạm thời miễn phí'],
    [/API c.ng khai/g, 'API công khai'],
    [/.ịa ch. hi.n t.i/g, 'Địa chỉ hiện tại'],
    [/Đang t.o .ịa ch.\.\.\./g, 'Đang tạo địa chỉ...'],
    [/Ch.a c. .ịa ch./g, 'Chưa có địa chỉ'],
    [/Kh.ng gi.i h.n ho.c API kh.ng cung c.p TTL/g, 'Không giới hạn hoặc API không cung cấp TTL'],
    [/Sao ch.p/g, 'Sao chép'],
    [/T.o ng.u nhi.n/g, 'Tạo ngẫu nhiên'],
    [/L.m m.i inbox/g, 'Làm mới inbox'],
    [/T.o .ịa ch. t.y ch.nh/g, 'Tạo địa chỉ tùy chỉnh'],
    [/Nh.p username/g, 'Nhập username'],
    [/T.o .ịa ch. n.y/g, 'Tạo địa chỉ này'],
    [/API hi.n ch.a h. tr. t.o .ịa ch. t.y ch.nh. Vui l.ng d.ng t.o ng.u nhi.n./g, 'API hiện chưa hỗ trợ tạo địa chỉ tùy chỉnh. Vui lòng dùng tạo ngẫu nhiên.'],
    [/L.i t.o .ịa ch./g, 'Lỗi tạo địa chỉ'],
    [/T.i l.i/g, 'Tải lại'],
    [/.ịa ch. g.n đ.y/g, 'Địa chỉ gần đây'],
    [/X.a t.t c./g, 'Xóa tất cả'],
    [/D.ng l.i/g, 'Dùng lại'],
    [/H.p th. đ.n/g, 'Hộp thư đến'],
    [/Đang đ.ng b.\.\.\./g, 'Đang đồng bộ...'],
    [/Đ. đ.ng b./g, 'Đã đồng bộ'],
    [/C.p nh.t/g, 'Cập nhật'],
    [/Refresh ho.c L.m m.i/g, 'Refresh hoặc Làm mới'],
    [/Sao ch.p .ịa ch. v. d.ng đ. đăng k. d.ch v.. Email s. xu.t hi.n . đ.y trong v.i gi.y./g, 'Sao chép địa chỉ và dùng để đăng ký dịch vụ. Email sẽ xuất hiện ở đây trong vài giây.'],
    [/Kh.ng c. ti.u đ./g, 'Không có tiêu đề'],
    [/Kh.ng r. ng..i g.i/g, 'Không rõ người gửi'],
    [/Kh.ng c. n.i dung/g, 'Không có nội dung'],
    [/Ch.n m.t email đ. xem n.i dung/g, 'Chọn một email để xem nội dung'],
    [/Kh.ng r. ng..i nh.n/g, 'Không rõ người nhận'],
    [/Kh.ng r. th.i gian/g, 'Không rõ thời gian'],
    [/V.n b.n/g, 'Văn bản'],
    [/Email n.y kh.ng c. n.i dung HTML./g, 'Email này không có nội dung HTML.'],
    [/Email n.y kh.ng c. n.i dung v.n b.n./g, 'Email này không có nội dung văn bản.'],
    [/Sao ch.p n.i dung/g, 'Sao chép nội dung'],
    [/T.n kh.ng đ..c đ. tr.ng/g, 'Tên không được để trống'],
    [/T.n t.i đa 40 k. t./g, 'Tên tối đa 40 ký tự'],
    [/T.n ch. đ..c d.ng a-z, 0-9, d.u ch.m, g.ch d..i, g.ch ngang/g, 'Tên chỉ được dùng a-z, 0-9, dấu chấm, gạch dưới, gạch ngang'],
    [/T.n kh.ng n.n b.t đ.u ho.c k.t th.c b.ng d.u ch.m/g, 'Tên không nên bắt đầu hoặc kết thúc bằng dấu chấm'],
    [/T.n kh.ng n.n ch.a hai d.u ch.m li.n ti.p/g, 'Tên không nên chứa hai dấu chấm liên tiếp'],
    [/Yeu cau that bai/g, 'Yêu cầu thất bại'],
    [/Het thoi gian cho API, vui long thu lai./g, 'Hết thời gian chờ API, vui lòng thử lại.'],
    [/Khong the ket noi API. Vui long kiem tra mang\/CORS./g, 'Không thể kết nối API. Vui lòng kiểm tra mạng hoặc CORS.'],
    [/API khong tra ve dia chi hop le./g, 'API không trả về địa chỉ hợp lệ.'],
    [/Khong the tai danh sach domain./g, 'Không thể tải danh sách domain.'],
    [/Khong the tai hop thu./g, 'Không thể tải hộp thư.'],
    [/Khong the tao dia chi ngau nhien./g, 'Không thể tạo địa chỉ ngẫu nhiên.'],
    [/Khong the tao dia chi tuy chinh./g, 'Không thể tạo địa chỉ tùy chỉnh.'],
    [/Khong the tai chi tiet email./g, 'Không thể tải chi tiết email.'],
    [/Loi tao dia chi/g, 'Lỗi tạo địa chỉ'],
    [/Đ. sao ch.p .ịa ch./g, 'Đã sao chép địa chỉ'],
    [/Đ. t.o .ịa ch. ng.u nhi.n/g, 'Đã tạo địa chỉ ngẫu nhiên'],
    [/Kh.ng th. t.o .ịa ch./g, 'Không thể tạo địa chỉ'],
    [/Đ. t.o .ịa ch. t.y ch.nh/g, 'Đã tạo địa chỉ tùy chỉnh'],
    [/Đ. sao ch.p n.i dung/g, 'Đã sao chép nội dung']
];

walk('./src', function(filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;
        
        // Also handle cases where the characters are just '?'
        // e.g. H?p thu
        newContent = newContent.replace(/H\?p thu t\?m th\?i mi\?n ph\?/g, 'Hộp thư tạm thời miễn phí');
        newContent = newContent.replace(/\?a ch\? hi\?n t\?i/g, 'Địa chỉ hiện tại');
        newContent = newContent.replace(/Kh.ng gi\?i h\?n ho\?c API kh.ng cung c\?p TTL/g, 'Không giới hạn hoặc API không cung cấp TTL');
        newContent = newContent.replace(/Sao ch\?p/g, 'Sao chép');
        newContent = newContent.replace(/T\?o ng\?u nhi.n/g, 'Tạo ngẫu nhiên');
        newContent = newContent.replace(/L.m m\?i inbox/g, 'Làm mới inbox');
        newContent = newContent.replace(/T\?o \?a ch\? t.y ch\?nh/g, 'Tạo địa chỉ tùy chỉnh');
        newContent = newContent.replace(/Nh\?p username/g, 'Nhập username');
        newContent = newContent.replace(/T\?o \?a ch\? n.y/g, 'Tạo địa chỉ này');
        newContent = newContent.replace(/API hi\?n ch.a h\? tr\? t\?o \?a ch\? t.y ch\?nh. Vui l.ng d.ng t\?o ng\?u nhi.n./g, 'API hiện chưa hỗ trợ tạo địa chỉ tùy chỉnh. Vui lòng dùng tạo ngẫu nhiên.');
        newContent = newContent.replace(/L\?i t\?o \?a ch\?/g, 'Lỗi tạo địa chỉ');
        newContent = newContent.replace(/T\?i l\?i/g, 'Tải lại');
        newContent = newContent.replace(/\?a ch\? g\?n đ.y/g, 'Địa chỉ gần đây');
        newContent = newContent.replace(/X.a t\?t c\?/g, 'Xóa tất cả');
        newContent = newContent.replace(/D.ng l\?i/g, 'Dùng lại');
        newContent = newContent.replace(/H\?p thu đ\?n/g, 'Hộp thư đến');
        newContent = newContent.replace(/Ch\?n m\?t email đ\? xem n\?i dung/g, 'Chọn một email để xem nội dung');
        newContent = newContent.replace(/Kh.ng r\? ng..i g\?i/g, 'Không rõ người gửi');
        newContent = newContent.replace(/Kh.ng c\? n\?i dung/g, 'Không có nội dung');

        replacements.forEach(([regex, replacement]) => {
            newContent = newContent.replace(regex, replacement);
        });
        
        // Exact string replaces if regex missed some edge cases due to literal replacement chars
        newContent = newContent.replace(/H\?p thu/g, 'Hộp thư')
                               .replace(/mi\?n/g, 'miễn')
                               .replace(/\?a ch\?/g, 'Địa chỉ')
                               .replace(/Khng/g, 'Không')
                               .replace(/Lm/g, 'Làm')
                               .replace(/T\?o/g, 'Tạo')
                               .replace(/ng\?u/g, 'ngẫu')
                               .replace(/nhin/g, 'nhiên')
                               .replace(/g\?n/g, 'gần')
                               .replace(/C\?p/g, 'Cập')
                               .replace(/th\?i/g, 'thời')
                               .replace(/th\?/g, 'thể')
                               .replace(/Nh\?p/g, 'Nhập')
                               .replace(/t\?i/g, 'tại')
                               .replace(/l\?i/g, 'lại')
                               .replace(/đ\?n/g, 'đến');
                               
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log('Fixed:', filePath);
        }
    }
});
