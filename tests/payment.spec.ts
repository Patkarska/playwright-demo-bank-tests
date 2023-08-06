import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';
import { PaymentPage } from '../pages/payment.page';
import { PulpitPage } from '../pages/pulpit.page';

test.describe('Payments tests', () => {
  let paymentPage: PaymentPage;

  test.beforeEach(async ({ page }) => {
    const userId = loginData.userId;
    const userPassword = loginData.password;

    await page.goto('/');
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    const pulpitPage = new PulpitPage(page);
    await pulpitPage.sideMenuComponent.sidePaymentButton.click();

    paymentPage = new PaymentPage(page);
  });

  test('simple payment', async ({ page }) => {
    //Arrange
    const transferReceiver = 'Jan Nowak';
    const transferAccount = '12 3534 5345 6364 5345 3453 53456';
    const transferAmount = '150';
    const expectedMessage = `Przelew wykonany! ${transferAmount},00PLN dla ${transferReceiver}`;

    //Act
    await paymentPage.transferReceiverInput.fill(transferReceiver);
    await paymentPage.transferAccountInput.fill(transferAccount);
    await paymentPage.transferAmountInput.fill(transferAmount);
    await paymentPage.paymentButton.click();

    await paymentPage.closeButton.click();

    //Assert
    await expect(paymentPage.successfulPayment).toHaveText(expectedMessage);
  });
});
