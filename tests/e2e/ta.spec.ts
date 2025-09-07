import { test, expect } from '@playwright/test';

test('daily TA shows two cards and footer note', async ({ page }) => {
  await page.goto('/spx/ta');
  await expect(page.getByRole('heading', { name: 'Daily TA' })).toBeVisible();
  await expect(page.locator('text=Paid via x402 (Bankr).')).toBeVisible();
});

