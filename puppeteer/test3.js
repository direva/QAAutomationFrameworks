const { PerformanceObserver, performance } = require('perf_hooks');
const puppeteer = require('puppeteer');

const siteUrl = 'https://itmo.ru/ru/';
const width = 1024, height = 1600;
const expectedResult = 'ITMO University';

(async () => {
    let time = performance.now();
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { 'width': width, 'height': height },
        args: ['--start-maximized'] });
    const page = await browser.newPage();

    await page.goto(siteUrl);
    await page.click("a[href*='es.itmo']");
    await page.waitForTimeout(5000);

    const pageList = await browser.pages();
    const newPage = pageList[2];
    await newPage.bringToFront();    
    const actualResult = await newPage.evaluate(() => {
        const steps = document.querySelector('title');
        return steps.textContent;
    });

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