const { test, expect } = require('@playwright/test');

test('Login Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); // Открываем сайт

    await page.fill('#user-name', 'standard_user'); // Вводим логин
    await page.fill('#password', 'secret_sauce');   // Вводим пароль
    await page.click('#login-button');             // Нажимаем кнопку "Login"

    // Проверяем, что вход успешный (например, есть заголовок "Products")
    await expect(page.locator('.title')).toHaveText('Products');
});
