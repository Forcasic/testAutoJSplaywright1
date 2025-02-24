const { test, expect } = require('@playwright/test');

test('Login Test on demo', async ({ page }) => {
    await page.goto('https://demovhpgo.com/'); // Открываем сайт

    await page.click('#home-content > section.responsive-two-columns.policy-links > div > div.links > div:nth-child(1) > label > rsx > font > font');

    // Проверяем, что вход успешный (например, есть заголовок "Products")
    await page.locator('#contentBody > main').waitFor();
    await expect(page.locator('#privacyPolicy > div:nth-child(2) > h3:nth-child(2)'))
        .toBeVisible();
});
