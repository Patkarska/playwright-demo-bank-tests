import { test, expect } from '@playwright/test';

test.describe('User login', () => {
  test('successful login with the correct credentials', async ({ page }) => {
    //Arrange
    const userId = 'test1234';
    const userPassword = 'password';
    const expextedUserName = 'Jan Demobankowy';

    //Act
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(userPassword);
    await page.getByTestId('login-button').click();

    //Assert
    await expect(page.getByTestId('user-name')).toHaveText(expextedUserName);
  });

  test('unsuccessful login with short username', async ({ page }) => {
    //Arrange
    const incorrectUserId = 'test';
    const expextedErrorMessage = 'identyfikator ma min. 8 znaków';

    //Act
    await page.goto('/');
    await page.getByTestId('login-input').fill(incorrectUserId);
    await page.getByTestId('password-input').click();

    //Assert
    await expect(page.getByTestId('error-login-id')).toHaveText(
      expextedErrorMessage,
    );
  });

  test('unsuccessful login with short password', async ({ page }) => {
    //Arrange
    const userId = 'test1234';
    const incorrectUserPassword = 'pass';
    const expextedErrorMessage = 'hasło ma min. 8 znaków';

    //Act
    await page.goto('/');
    await page.getByTestId('login-input').fill(userId);
    await page.getByTestId('password-input').fill(incorrectUserPassword);
    await page.getByTestId('password-input').blur();

    //Assert
    await expect(page.getByTestId('error-login-password')).toHaveText(
      expextedErrorMessage,
    );
  });
});
