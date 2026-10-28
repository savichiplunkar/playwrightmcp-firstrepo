import { test, expect } from '../../src/fixtures/base';

const loginUrl = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

const login = async (page: import('@playwright/test').Page) => {
  await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
};

test.describe('OrangeHRM login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(loginUrl);
  });

  test('Successful login displays the Dashboard', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });

  test('Invalid password is rejected', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin999');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert')).toContainText('Invalid credentials');
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('Invalid username is rejected', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin123');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByRole('alert')).toContainText('Invalid credentials');
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('Empty username shows required validation', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required')).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('Empty password shows required validation', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required')).toBeVisible();
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('Both empty fields show required validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.getByText('Required')).toHaveCount(2);
    await expect(page).toHaveURL(/auth\/login/);
  });

  test('Password is masked and login page uses HTTPS', async ({ page }) => {
    await expect(page.getByRole('textbox', { name: 'Password' })).toHaveAttribute('type', 'password');
    await expect(page).toHaveURL(/^https:\/\//);
  });

  test('Login form supports keyboard focus navigation', async ({ page }) => {
    const username = page.getByRole('textbox', { name: 'Username' });
    const password = page.getByRole('textbox', { name: 'Password' });
    const loginButton = page.getByRole('button', { name: 'Login' });

    await username.focus();
    await page.keyboard.press('Tab');
    await expect(password).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(loginButton).toBeFocused();
  });

  test('Logout invalidates the session after browser Back', async ({ page }) => {
    await login(page);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    await page.locator('.oxd-userdropdown-tab').click();
    await page.getByText('Logout', { exact: true }).click();
    await expect(page).toHaveURL(/auth\/login/);

    await page.goBack();
    await expect(page).toHaveURL(/auth\/login/);
    await expect(page.getByRole('textbox', { name: 'Username' })).toBeVisible();
  });
});
