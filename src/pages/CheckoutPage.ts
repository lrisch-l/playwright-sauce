import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) {}

  async addItemToCart() {
    await this.page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }

  async startCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  async fillPersonalInfo(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('[data-test="firstName"]', firstName);
    await this.page.fill('[data-test="lastName"]', lastName);
    await this.page.fill('[data-test="postalCode"]', postalCode);
    await this.page.click('[data-test="continue"]');
  }

  async validateOverview() {
    await expect(this.page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await expect(this.page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');
    await expect(this.page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99');
    await expect(this.page.locator('[data-test="tax-label"]')).toHaveText('Tax: $2.40');
    await expect(this.page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');
  }

  async finishOrder() {
    await this.page.click('[data-test="finish"]');
  }

  async validateSuccessMessage() {
    await expect(this.page.locator('[data-test="pony-express"]')).toBeVisible();
    await expect(this.page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(this.page.locator('[data-test="complete-text"]')).toHaveText(
      'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
    );
  }

  async backToProducts() {
    await this.page.click('[data-test="back-to-products"]');
  }
}