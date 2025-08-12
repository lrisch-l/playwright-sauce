import type { Page } from '@playwright/test';
import { log } from '@support/Logger';
import { BasePage } from '@pages/BasePage';

export class LoginPage extends BasePage {
  private usernameField = this.driver.locator('#user-name');
  private passwordField = this.driver.locator('#password');
  private loginButton = this.driver.locator('#login-button');
  private inventoryList = this.driver.locator('.inventory_list');
  private errorMessage = this.driver.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async goTo(): Promise<void> {
    log.info('[LoginPage] Navigating to login page');
    await this.driver.goto('/');
  }

  async login({ username, password }: { username: string; password: string }): Promise<void> {
    log.info(`[LoginPage] Logging in as ${username}`);
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string | null> {
    const isVisible = await this.errorMessage.isVisible();
    if (isVisible) {
      const message = await this.errorMessage.textContent();
      log.warn(`[LoginPage] Login error: ${message}`);
      return message?.trim() ?? null;
    }
    return null;
  }

  async isLoggedIn(): Promise<boolean> {
    return await this.inventoryList.isVisible();
  }
}