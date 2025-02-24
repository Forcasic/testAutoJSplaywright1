const { test, expect } = require('@playwright/test');
const path = require('path');

test('Upload file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/upload');

    // Загружаем файл
    await page.locator('#file-upload').setInputFiles(path.join(__dirname, 'example.png'));
    await page.locator('#file-submit').click();

    // Проверяем, что файл загружен
    await expect(page.locator('#uploaded-files')).toHaveText('example.png');
});


test('Download file', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/download');

    // Перехватываем скачивание
    const downloadPromise = page.waitForEvent('download');
    await page.locator('a[href="download/some-file.txt"]').click();
    const download = await downloadPromise;

    // Сохраняем файл локально
    const filePath = await download.path();
    console.log('Файл скачан:', filePath);

    // Проверяем, что файл существует
    expect(filePath).not.toBeNull();
});
