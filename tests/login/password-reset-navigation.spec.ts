import { expect } from '@playwright/test';
import { test } from '../../fixtures/test';

test('Open and cancel password recovery', async ({ loginPage, page }) => {
  await expect(loginPage.loginButton).toBeVisible();

  await page.getByText('Forgot your password?').click();

  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/requestPasswordResetCode$/);
  await expect(page.getByRole('heading', { name: 'Reset Password' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  await expect(
    page.getByText('Please enter your username to identify your account to reset your password')
  ).toBeVisible();
  await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Reset Password' })).toBeVisible();

  await page.getByRole('button', { name: 'Cancel' }).click();

  await expect(page).toHaveURL(/\/web\/index\.php\/auth\/login$/);
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
});
