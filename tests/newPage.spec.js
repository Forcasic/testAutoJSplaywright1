const { test, expect } = require('@playwright/test');

test('Open new tab', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com');

    await page.fill('#user-name', 'standard_user'); // Вводим логин
    await page.fill('#password', 'secret_sauce');   // Вводим пароль
    await page.click('#login-button');             // Нажимаем кнопку "Login"

    const [newPage] = await Promise.all([
        context.waitForEvent('page'), // Ждем новую вкладку
        page.click('#page_wrapper > footer > ul > li.social_linkedin > a') // Кликаем по ссылке
    ]);

    await newPage.waitForLoadState();
    expect(await newPage.title()).toContain('LinkedIn');
});

/*
const [popup] = await Promise.all([
  context.waitForEvent('page'), // Ждем появления popup
  page.click('#open-popup') // Кликаем по кнопке
]);

await popup.waitForLoadState(); 
console.log(await popup.url()); // Выводим URL popup'а
*/


/*
await newPage.close();

const pages = context.pages();
await pages[1].bringToFront(); // Переключаемся на вторую вкладку
*/

test('Handle JavaScript Alerts', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

    // Перехват alert
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS Alert');
        await dialog.accept();
    });
    await page.click('button:has-text("Click for JS Alert")');

    // Перехват confirm
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS Confirm');
        await dialog.accept(); // Можно заменить на dismiss() для "Cancel"
    });
    await page.click('button:has-text("Click for JS Confirm")');

    // Перехват prompt
    page.once('dialog', async dialog => {
        expect(dialog.message()).toContain('I am a JS prompt');
        await dialog.accept('Playwright'); // Вводим текст
    });
    await page.click('button:has-text("Click for JS Prompt")');
});

test('Hover, Right Click and Double Click', async ({ page }) => {
    await page.goto('https://swisnl.github.io/jQuery-contextMenu/demo.html');

    // Правый клик
    await page.locator('.context-menu-one').click({ button: 'right' });
    await expect(page.locator('.context-menu-list')).toBeVisible();

    // Наведение (hover)
    await page.locator('.context-menu-item span:has-text("Edit")').hover();
    await expect(page.locator('body > ul > li.context-menu-item.context-menu-icon.context-menu-icon-edit.context-menu-visible'))
        .toHaveCSS('background-color', 'rgb(41, 128, 185)');

    // Двойной клик (проверить на другом сайте)
});


test('Select option from dropdown', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/dropdown');

    // Выбираем "Option 2"
    await page.locator('#dropdown').selectOption('2');

    // Проверяем, что выбрано правильно
    await expect(page.locator('#dropdown')).toHaveValue('2');
});