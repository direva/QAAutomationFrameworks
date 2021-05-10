const { PerformanceObserver, performance } = require('perf_hooks');
const {Builder, By, Key, until} = require('selenium-webdriver');
const siteUrl = 'https://itmo.ru/ru/';

(async function test() {
    let time = performance.now();
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get(siteUrl);
      await driver.takeScreenshot();

      driver.takeScreenshot().then(
        function(image, err) {
            require('fs').writeFile('out.png', image, 'base64', function(err) {console.log(err)});
        }
    );
    } finally {
      await driver.quit();
      time = performance.now() - time;
      console.log('Время выполнения = ', time);
    }
  })();