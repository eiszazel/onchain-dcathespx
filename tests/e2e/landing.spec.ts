import { test, expect } from '@playwright/test';

test('landing page renders hero and CTA', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('DCA the SPX6900');
  await expect(page.getByRole('link', { name: 'Drip It Now' })).toBeVisible();
});

