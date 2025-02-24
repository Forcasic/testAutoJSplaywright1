import { test, expect } from '@playwright/test';

test.describe('API Тестирование с Playwright', () => {

    test('Получение списка пользователей', async ({ request }) => {
        const response = await request.get('https://reqres.in/api/users?page=2');

        // Проверяем, что запрос успешен
        expect(response.status()).toBe(200);

        // Разбираем JSON и проверяем структуру данных
        const data = await response.json();
        expect(data).toHaveProperty('data');
        expect(data.data.length).toBeGreaterThan(0);
    });

    test('Создание нового пользователя', async ({ request }) => {
        const response = await request.post('https://reqres.in/api/users', {
            data: {
                name: 'John Doe',
                job: 'QA Engineer'
            }
        });

        // Проверяем, что пользователь создан
        expect(response.status()).toBe(201);

        // Разбираем JSON-ответ
        const data = await response.json();
        expect(data).toHaveProperty('name', 'John Doe');
        expect(data).toHaveProperty('job', 'QA Engineer');
    });


    test('Мокирование API-запроса в браузере', async ({ page }) => {
        await page.route('https://reqres.in/api/users/2', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    data: {
                        id: 2,
                        first_name: 'Mocked',
                        last_name: 'User',
                        email: 'mocked@example.com'
                    }
                })
            });
        });

        await page.goto('https://reqres.in/'); // Любая страница, откуда можно выполнить fetch

        const response = await page.evaluate(async () => {
            const res = await fetch('https://reqres.in/api/users/2');
            return res.json();
        });

        expect(response.data.first_name).toBe('Mocked'); // Проверяем, что мок сработал
    });

});
