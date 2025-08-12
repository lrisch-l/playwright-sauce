import { expect } from '@playwright/test';
import type { Locator, Page } from '@playwright/test';
import { log } from '@support/Logger';

export abstract class BasePage {
  protected driver: Page;

  constructor(page: Page) {
    this.driver = page;
  }

  async waitForElementEnabled(locator: Locator, timeout = 5000) {
    try {
      await expect(locator).toBeEnabled({ timeout });
    } catch (error) {
      log.warn(`[${this.constructor.name}] Element not enabled: ${locator}`);
    }
  }

  async waitForDisappearance(locator: Locator, timeouts = { show: 5000, hide: 15000 }) {
    log.debug(`[${this.constructor.name}] Waiting for element to disappear...`);
    await locator.first().waitFor({ state: 'visible', timeout: timeouts.show });
    await expect(locator).toHaveCount(0);
  }

  async getText(locator: Locator): Promise<string> {
    const value = await locator.getAttribute('value');
    return value ?? (await locator.textContent()) ?? '';
  }

  async waitForLoading(timeouts = { show: 15000 }) {
    await this.driver.waitForLoadState('domcontentloaded', { timeout: timeouts.show });
  }
}