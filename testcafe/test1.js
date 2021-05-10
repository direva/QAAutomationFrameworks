import { Selector } from 'testcafe';
fixture `First case`
    .page `https://itmo.ru/ru/`;

test('First test', async t => {
    await t
        .takeScreenshot();
});