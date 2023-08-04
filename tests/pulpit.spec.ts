import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('Pulpit tests', () => {
  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverId = '3';
    const transferAmount = '120';
    const transferTitle = 'Zwrot';
    const expextedTransferReceiver = 'Michael Scott';
    const expectedMessage = `Przelew wykonany! ${expextedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
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
    const receiverNumber = '502 xxx xxx';
    const topUpAmount = '40';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${receiverNumber}`;

    //Act
    await page.locator('#widget_1_topup_receiver').selectOption(receiverNumber);
    await page.locator('#widget_1_topup_amount').fill(topUpAmount);
    await page
      .getByText('zapoznałem się z regulaminem i akceptuję warunki')
      .click();
    await page.getByRole('button', { name: 'doładuj telefon' }).click();
    await page.getByTestId('close-button').click();

    //Assert
    await expect(page.locator('#show_messages')).toHaveText(expectedMessage);
  });
});
