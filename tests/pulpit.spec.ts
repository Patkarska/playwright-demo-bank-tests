import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test('quick payment with correct data', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('test1234');
        await page.getByTestId('password-input').fill('test1234');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption('3');
        await page.locator('#widget_1_transfer_amount').fill('120');
        await page.locator('#widget_1_transfer_title').fill('Zwrot');

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();
      
        await expect(page.locator('#show_messages')).toHaveText('Przelew wykonany! Michael Scott - 120,00PLN - Zwrot');
    });

    test('successful phone top-up', async ({ page }) => {
        await page.goto('https://demo-bank.vercel.app/');
        await page.getByTestId('login-input').fill('test1234');
        await page.getByTestId('password-input').fill('test1234');
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_topup_receiver').selectOption('502 xxx xxx');
        await page.locator('#widget_1_topup_amount').fill('40');
        await page.getByText('zapoznałem się z regulaminem i akceptuję warunki').click();
        await page.getByRole('button', { name: 'doładuj telefon' }).click();
        await page.getByTestId('close-button').click();

        await expect(page.locator('#show_messages')).toHaveText('Doładowanie wykonane! 40,00PLN na numer 502 xxx xxx');
    });
});