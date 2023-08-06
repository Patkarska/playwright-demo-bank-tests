import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Pulpit tests', () => {
  let pulpitPage: PulpitPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.login(userId, userPassword);
    pulpitPage = new PulpitPage(page);
  });

  test('quick payment with correct data', async ({ page }) => {
    //Arrange
    const receiverId = '3';
    const transferAmount = '120';
    const transferTitle = 'Zwrot';
    const expextedTransferReceiver = 'Michael Scott';
    const expectedMessage = `Przelew wykonany! ${expextedTransferReceiver} - ${transferAmount},00PLN - ${transferTitle}`;

    //Act
    await pulpitPage.quickPayment(receiverId, transferAmount, transferTitle);

    //Assert
    await expect(pulpitPage.successfulPayment).toHaveText(expectedMessage);
  });

  test('successful phone top-up', async ({ page }) => {
    //Arrange
    const receiverNumber = '502 xxx xxx';
    const topUpAmount = '40';
    const expectedMessage = `Doładowanie wykonane! ${topUpAmount},00PLN na numer ${receiverNumber}`;

    //Act
    await pulpitPage.phoneTopUpPayment(receiverNumber, topUpAmount);

    //Assert
    await expect(pulpitPage.successfulPayment).toHaveText(expectedMessage);
  });
});
