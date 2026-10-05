const { chromium } = require('playwright');
const { pathToFileURL } = require('node:url');
const path = require('node:path');
(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
    await page.goto(pathToFileURL(path.resolve('scripts/social-card.html')).href);
    await page.screenshot({ path: 'img/rustyll-og.png' });
  } finally { await browser.close(); }
})();
