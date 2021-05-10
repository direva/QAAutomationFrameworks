const { PerformanceObserver, performance } = require('perf_hooks');
const puppeteer = require('puppeteer');

const siteUrl = 'https://itmo.ru/ru/';
const width = 1024, height = 1600;
const expectedResult = 'Знакомлюсь Выбираю Подаю Сдаю Обучаюсь Работаю';

(async () => {
    let time = performance.now();
    const browser = await puppeteer.launch({ 
        headless: false,
        defaultViewport: { 'width': width, 'height': height },
        args: ['--start-maximized'] });
    const page = await browser.newPage();

    await page.goto(siteUrl);
    await page.hover('li.dropdown');
    await page.click("li.dropdown a[href*='master']");
    await page.waitForTimeout(5000);

    const pageList = await browser.pages();
    const newPage = pageList[2];
    await newPage.bringToFront();    
    const actualResult = await newPage.evaluate(() => {
        const steps = document.querySelectorAll('section.incoming-steps .caption span');
        let stepsNames = '';
        for(step of steps)
            stepsNames = stepsNames + step.textContent + ' ';
        return stepsNames.trimEnd();
    });

    try {
        if(actualResult !== expectedResult)
            throw new Error();
    } catch(err) {
        console.log(`Ожидаемая последовательность шагов ${expectedResult}, на странице - ${actualResult}`);
    }

    await browser.close();

    time = performance.now() - time;
    console.log('Время выполнения = ', time);
  })();