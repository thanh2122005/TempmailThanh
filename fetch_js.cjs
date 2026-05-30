const fs = require('fs');

async function run() {
  try {
    const r1 = await fetch('https://webmail.loveyuna.today/app');
    const text = await r1.text();
    const match = text.match(/<script type="module" crossorigin src="(.*?)">/);
    if (match) {
      const url = 'https://webmail.loveyuna.today' + match[1];
      console.log('Fetching JS from:', url);
      const r2 = await fetch(url);
      const js = await r2.text();
      fs.writeFileSync('loveyuna_app.js', js);
      console.log('Saved to loveyuna_app.js');
    } else {
      console.log('No match found for script tags.');
    }
  } catch (e) {
    console.error(e);
  }
}
run();
