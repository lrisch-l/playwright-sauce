import { expect } from '@playwright/test';
import type { Page } from '@playwright/test';
import { log } from '@support/Logger';
import { BasePage } from '@pages/BasePage';

export class LoginPage extends BasePage {
  private usernameField = this.driver.locator('#user-name');
  private passwordField = this.driver.locator('#password');
  private loginButton = this.driver.locator('#login-button');
  private inventoryList = this.driver.locator('.inventory_list');

  constructor(page: Page) {
    super(page);
  }

  async goTo(): Promise<void> {
    log.info('[LoginPage] Navigating to login page');
    await this.driver.goto('/'); // usa baseURL do playwright.config.ts
  }

  async login({ username, password }: { username: string; password: string }): Promise<void> {
    log.info(`[LoginPage] Logging in as ${username}`);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
    await expect(this.inventoryList).toBeVisible({ timeout: 5000 });
    log.info('[LoginPage] Login successful');
  }
}