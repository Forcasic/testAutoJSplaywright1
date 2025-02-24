const { test, expect } = require('@playwright/test');

test('Login Test', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/'); // Открываем сайт


    //CSS-селекторы
    await page.click('#user-name');  // По ID
    await page.click('.login_logo');   // По классу
    await page.click('div > form > input');   // Вложенные элементы

    //Текстовый поиск
    await page.click('text=Login');  // Нажать на кнопку с текстом "Войти"

    //Атрибуты
    await page.click('input[name="login-button"]');  // Найти по атрибуту name.

    //Роли (Accessibility)
    await page.getByRole('button', { name: 'Login' }).click();




    await page.fill('#user-name', 'standard_user'); // Вводим логин
    await page.fill('#password', 'secret_sauce');   // Вводим пароль
    await page.click('#login-button');             // Нажимаем кнопку "Login"

    // Проверяем, что вход успешный (например, есть заголовок "Products")
    await expect(page.locator('.title')).toHaveText('Products');
});
