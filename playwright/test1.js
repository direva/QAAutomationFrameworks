const { PerformanceObserver, performance } = require('perf_hooks');
const { chromium } = require('playwright');
const siteUrl = 'https://itmo.ru/ru/';

(async () => {
  let time = performance.now();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(siteUrl);
  await page.screenshot({ path: `test.png` });
  await browser.close();
  time = performance.now() - time;
  console.log('Время выполнения = ', time);
})();