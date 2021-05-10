const { PerformanceObserver, performance } = require('perf_hooks');
const { chromium } = require('playwright');
const siteUrl = 'https://itmo.ru/ru/';

(async () => {
    let time = performance.now();
    const browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(siteUrl);
    await page.hover('li.dropdown');
    await page.click("li.dropdown a[href*='master']");
    await page.waitForTimeout(5000);
    
    const pageList = await context.pages();
    const newPage = pageList[1];
    await newPage.bringToFront();

    const actualResult = await newPage.evaluate(() => {
        const steps = document.querySelectorAll('section.incoming-steps .caption span');
        let stepsNames = '';
        for(step of steps)
            stepsNames = stepsNames + step.textContent + ' ';
        return stepsNames.trimEnd();
    });
    const expectedResult = 'Знакомлюсь Выбираю Подаю Сдаю Обучаюсь Работаю';
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