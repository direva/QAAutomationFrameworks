const { PerformanceObserver, performance } = require('perf_hooks');
const { chromium } = require('playwright');
const siteUrl = 'https://itmo.ru/ru/';

(async () => {
    let time = performance.now();
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(siteUrl);
    await page.click("a[href*='es.itmo']");
    await page.waitForTimeout(5000);
    const pageList = await context.pages();
    const newPage = pageList[1];
    await newPage.bringToFront();
    const actualResult = await newPage.evaluate(() => {
        const steps = document.querySelector('title');
        return steps.textContent;
    });
    const expectedResult = 'ITMO University';
    try {
        if(actualResult !== expectedResult)
            throw new Error();
    } catch(err) {
        console.log(`Ожидаемый заголовок веб-страницы ${expectedResult}, реальный - ${actualResult}`);
    }

    await browser.close();
    
    time = performance.now() - time;
    console.log('Время выполнения = ', time);
  })();