const domainsToAdd = [
  'thanhdevvn.cyou',
  'thanhdevn.bond',
  'thanhdev.cyou',
  'thanhgpt.cyou',
  'thanhgpt.bond'
];

async function addDomains() {
  console.log('Bắt đầu thêm domain vào hệ thống...');
  for (const domain of domainsToAdd) {
    try {
      const res = await fetch('https://mail.cskh-group.com/api/domains/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ domain })
      });
      
      if (res.ok) {
        console.log(`✅ Đã thêm thành công: ${domain}`);
      } else {
        const errText = await res.text();
        console.log(`❌ Lỗi khi thêm ${domain}: ${res.status} - ${errText}`);
      }
    } catch (error) {
      console.log(`❌ Lỗi kết nối khi thêm ${domain}: ${error.message}`);
    }
  }
  console.log('Hoàn tất!');
}

addDomains();
