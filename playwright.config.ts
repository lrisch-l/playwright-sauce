import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }]
  ],
  projects: [
    {
      name: 'Chrome',
      use: {
        channel: 'chrome', // Uses installed Chrome
        headless: true,
        baseURL: 'https://www.saucedemo.com',
        screenshot: 'on',
        video: 'on',
        trace: 'retain-on-failure'
      }
    },
    {
      name: 'Edge',
      use: {
        channel: 'msedge', // Uses installed Microsoft Edge
        headless: true,
        baseURL: 'https://www.saucedemo.com',
        screenshot: 'on',
        video: 'on',
        trace: 'retain-on-failure'
      }
    }
  ]
});