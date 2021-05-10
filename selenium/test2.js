const { PerformanceObserver, performance } = require('perf_hooks');
const {Builder, By, Key, until} = require('selenium-webdriver');
const siteUrl = 'https://itmo.ru/ru/';
const expectedResult = 'Знакомлюсь Выбираю Подаю Сдаю Обучаюсь Работаю';

(async function test() {
    let time = performance.now();
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(siteUrl);
      await (await driver.findElement(By.css('li.dropdown'))).click();
      await (await driver.findElement(By.css("li.dropdown a[href*='master']"))).click();
      //await driver.manage().setTimeouts( { implicit: 5000 } );
      await new Promise(resolve => setTimeout(() => resolve(), 10000));
      let tabs = await driver.getAllWindowHandles();
      await driver.switchTo().window(tabs[1]);
      const steps = await driver.findElements(By.css('section.incoming-steps .caption span'));
      let stepsNames = '';
      for(step of steps)
          stepsNames = stepsNames + await step.getText() + ' ';
      const actualResult = stepsNames.trimEnd();

      try {
          if(actualResult.toLowerCase() !== expectedResult.toLowerCase())
              throw new Error();
      } catch(err) {
          console.log(`Ожидаемая последовательность шагов ${expectedResult}, на странице - ${actualResult}`);
      }
    } finally {
      await driver.quit();
      time = performance.now() - time;
      console.log('Время выполнения = ', time);
    }
  })();