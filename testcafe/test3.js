import { Selector } from 'testcafe';
fixture `Third case`
    .page `https://itmo.ru/ru/`;

test('Third test', async t => {
    await t
        .click("a[href*='es.itmo']")
        .wait(5000);

    const actualTitle = await Selector('title').innerText;
    const expectedTitle = 'ITMO University';
    await t
        .expect(actualTitle).eql(expectedTitle);

});