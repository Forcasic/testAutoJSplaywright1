const { test, expect } = require('@playwright/test');

test('Google Search', async ({ page }) => {
    await page.goto('https://www.google.com');

    // Находим поле поиска и вводим текст
    await page.fill('textarea[name="q"]', 'Playwright');
    await page.press('textarea[name="q"]', 'Enter');

    // Проверяем, что в результатах есть Playwright
    await page.waitForSelector('text=Playwright');
    expect(await page.locator('text=Playwright').isVisible()).toBeTruthy();
});
