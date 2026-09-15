import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  // Report is always generated so it can be published as a CI artifact;
  // only the automatic browser-opening is skipped in CI (no display to open it on).
  reporter: [['html', { open: process.env.CI ? 'never' : 'always' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    launchOptions: {
      // e.g. SLOWMO=500 npx playwright test --headed --workers=1
      slowMo: process.env.SLOWMO ? Number(process.env.SLOWMO) : undefined,
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
