const { PerformanceObserver, performance } = require('perf_hooks');
const puppeteer = require('puppeteer');

const siteUrl = 'https://itmo.ru/ru/';

(async () => {
    let time = performance.now();
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'] });
    const page = await browser.newPage();
    await page.goto(siteUrl);
    await page.screenshot();  
    await browser.close();

    time = performance.now() - time;
    console.log('Время выполнения = ', time);
  })();