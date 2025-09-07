import { test, expect } from '@playwright/test';

test('docs page shows intro and contracts', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.getByRole('heading', { name: 'Docs & Lore' })).toBeVisible();
  await expect(page.getByText('ETH CA:')).toBeVisible();
});
