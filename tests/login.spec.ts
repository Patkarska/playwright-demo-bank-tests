import { test, expect } from '@playwright/test';

test.describe('User login', () => {
  test('successful login with the correct credentials', async ({ page }) => {
    //Arrange
    const userId = 'testLogi';
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
    await page.goto('/');
    await page.getByTestId('login-input').fill('test');
    await page.getByTestId('password-input').click();

    await expect(page.getByTestId('error-login-id')).toHaveText(
      'identyfikator ma min. 8 znaków',
    );
  });

  test('unsuccessful login with short password', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('login-input').fill('test1234');
    await page.getByTestId('password-input').fill('pass');
    await page.getByTestId('password-input').blur();

    await expect(page.getByTestId('error-login-password')).toHaveText(
      'hasło ma min. 8 znaków',
    );
  });
});
