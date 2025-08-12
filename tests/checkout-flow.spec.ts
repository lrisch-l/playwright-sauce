import { test } from '@playwright/test';
import { loginAsStandardUser } from '../src/support/Login';
import { CheckoutPage } from '../src/pages/CheckoutPage';

test('Complete purchase flow with standard user', async ({ page }) => {
  const checkout = new CheckoutPage(page);

  await loginAsStandardUser(page);
  await checkout.addItemToCart();
  await checkout.goToCart();
  await checkout.startCheckout();
  await checkout.fillPersonalInfo('Leandro', 'Risch', '12354-768');
  await checkout.validateOverview();
  await checkout.finishOrder();
  await checkout.validateSuccessMessage();
  await checkout.backToProducts();
});