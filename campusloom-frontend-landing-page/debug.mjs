import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:5173', { waitUntil: 'networkidle2' });
  
  const bodyHtml = await page.evaluate(() => document.body.innerHTML);
  console.log('BODY HTML LENGTH:', bodyHtml.length);
  if (bodyHtml.length < 1000) {
    console.log('BODY HTML:', bodyHtml);
  } else {
    console.log('BODY HTML starts with:', bodyHtml.substring(0, 500));
  }
  
  await browser.close();
})();
