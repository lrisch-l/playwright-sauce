import { test, expect } from '@playwright/test';
import { loginAsStandardUser } from '../src/support/Login';

test('Complete purchase flow with standard user', async ({ page }) => {
  // Step 1 - Login
  await loginAsStandardUser(page);

  // Step 2 - Add item to cart
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');

  // Step 3 - Go to cart and start checkout
  await page.click('.shopping_cart_link');
  await page.click('[data-test="checkout"]');

  // Step 4–6 - Fill in personal information
  await page.fill('[data-test="firstName"]', 'Leandro');
  await page.fill('[data-test="lastName"]', 'Risch');
  await page.fill('[data-test="postalCode"]', '12354-768');

  // Step 7 - Continue to overview
  await page.click('[data-test="continue"]');

  // Step 8 - Validate item name and price
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText('$29.99');

  // Step 9 - Validate subtotal, tax, and total
  await expect(page.locator('[data-test="subtotal-label"]')).toHaveText('Item total: $29.99');
  await expect(page.locator('[data-test="tax-label"]')).toHaveText('Tax: $2.40');
  await expect(page.locator('[data-test="total-label"]')).toHaveText('Total: $32.39');

  // Step 10 - Finish order
  await page.click('[data-test="finish"]');

  // Step 11 - Validate success message
  await expect(page.locator('[data-test="pony-express"]')).toBeVisible();
  await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
  await expect(page.locator('[data-test="complete-text"]')).toHaveText(
    'Your order has been dispatched, and will arrive just as fast as the pony can get there!'
  );

  // Step 12 - Back to products
  await page.click('[data-test="back-to-products"]');
});