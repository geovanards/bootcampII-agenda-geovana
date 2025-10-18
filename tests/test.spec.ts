import { test, expect} from '@playwright/test';

test('Abre o Google', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});

