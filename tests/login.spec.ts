import { test, expect } from '@playwright/test';
import { loginData } from '../test-data/login.data';
import { LoginPage } from '../pages/login.page';

test.describe('User login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('successful login with the correct credentials', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const userPassword = loginData.password;
    const expextedUserName = 'Jan Demobankowy';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(userPassword);
    await loginPage.loginButton.click();

    //Assert
    await expect(loginPage.successfulLogin).toHaveText(expextedUserName);
  });

  test('unsuccessful login with short username', async ({ page }) => {
    //Arrange
    const incorrectUserId = 'test';
    const expextedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(incorrectUserId);
    await loginPage.passwordInput.click();

    //Assert
    await expect(loginPage.loginError).toHaveText(expextedErrorMessage);
  });

  test('unsuccessful login with short password', async ({ page }) => {
    //Arrange
    const userId = loginData.userId;
    const incorrectUserPassword = 'pass';
    const expextedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    const loginPage = new LoginPage(page);
    await loginPage.loginInput.fill(userId);
    await loginPage.passwordInput.fill(incorrectUserPassword);

    await page.getByTestId('password-input').blur();

    //Assert
    await expect(loginPage.passwordError).toHaveText(expextedErrorMessage);
  });
});
