import { test, expect } from '@playwright/test';

test.describe('Pulpit tests', () => {
    test('quick payment with correct data', async ({ page }) => {
        //Arrange
        const userId = 'testLogi';
        const userPassword = 'password';

        const receiverId = '3';
        const transferAmount = '120';
        const transferTitle = 'Zwrot';
        const expextedTransferReceiver = 'Michael Scott';

        //Act
        await page.goto('/');
        await page.getByTestId('login-input').fill(userId);
        await page.getByTestId('password-input').fill(userPassword);
        await page.getByTestId('login-button').click();

        await page.locator('#widget_1_transfer_receiver').selectOption(receiverId);
        await page.locator('#widget_1_transfer_amount').fill(transferAmount);
        await page.locator('#widget_1_transfer_title').fill(transferTitle);

        await page.getByRole('button', { name: 'wykonaj' }).click();
        await page.getByTestId('close-button').click();

        //Assert
        await expect(page.locator('#show_messages')).toHaveText(`Przelew wykonany! ${expextedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`);
    });

    test('successful phone top-up', async ({ page }) => {
        await page.goto('/');
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