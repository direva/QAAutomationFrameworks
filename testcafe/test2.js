import { Selector } from 'testcafe';
fixture `Second case`
    .page `https://itmo.ru/ru/`;

test('Second test', async t => {
    await t
        .hover('li.dropdown:first-child')
        .click("li.dropdown a[href*='master']")
        .wait(5000);

    const stepsCount = await Selector('section.incoming-steps .caption span').length;
    const expectedSteps = ['Знакомлюсь', 'Выбираю', 'Подаю', 'Сдаю', 'Обучаюсь', 'Работаю'];
    for(let i = 0; i < stepsCount; i++) {
        await Selector('section.incoming-steps .caption span')[i].innerText === expectedSteps[i]
    }
});