import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  use: {
    headless: true,
    baseURL: 'https://www.saucedemo.com',
    screenshot: 'on',
    video: 'on',
    trace: 'retain-on-failure' // Enables trace viewer for failed tests
  },
});