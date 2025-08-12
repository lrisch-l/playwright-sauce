import { test } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { user } from '../src/data/User';

test('Standard user can log in successfully', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goTo();
  await login.login(user.standard);
});