async function run() {
  const r1 = await fetch('https://webmail.loveyuna.today/app');
  const data = await r1.text();
  const match = data.match(/<script type="module" crossorigin src="(.*?)">/);
  if(match) {
    const jsUrl = 'https://webmail.loveyuna.today' + match[1];
    console.log('JS URL:', jsUrl);
    const r2 = await fetch(jsUrl);
    const jsData = await r2.text();
    require('fs').writeFileSync('loveyuna_app.js', jsData);
    console.log('Saved to loveyuna_app.js, size:', jsData.length);
  } else {
    console.log('No script found');
  }
}
run();
