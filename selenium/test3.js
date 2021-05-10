const { PerformanceObserver, performance } = require('perf_hooks');
const {Builder, By, Key, until} = require('selenium-webdriver');
const siteUrl = 'https://itmo.ru/ru/';
const expectedResult = 'ITMO University';

(async function test() {
    let time = performance.now();
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(siteUrl);
      await (await driver.findElement(By.css("a[href*='es.itmo']"))).click();
      await new Promise(resolve => setTimeout(() => resolve(), 10000));
      let tabs = await driver.getAllWindowHandles();
      await driver.switchTo().window(tabs[1]);
      const el = await driver.findElement(By.css('title'));
      const actualResult = await el.getText();

      try {
          if(actualResult.toLowerCase() !== expectedResult.toLowerCase())
              throw new Error();
      } catch(err) {
          console.log(`Ожидаемый заголовок веб-страницы ${expectedResult}, реальный - ${actualResult}`);
      }
    } finally {
      await driver.quit();
      time = performance.now() - time;
      console.log('Время выполнения = ', time);
    }
  })();