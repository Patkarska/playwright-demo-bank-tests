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
    const expectedMessage = `Przelew wykonany! ${expextedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

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
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });

  test('successful phone top-up', async ({ page }) => {
    //Arrange
    const userId = 'test1234';
    const userPassword = 'password';

    const receiverNumber = '502 xxx xxx';
    const topUpAmount = '40';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${receiverNumber}`;

    //Act
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    await page.locator('#widget_1_topup_receiver').selectOption(receiverNumber);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page
      .getByText('zapoznałem się z regulaminem i akceptuję warunki')
      .click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(
      expectedMessage,
    );
  });
});
