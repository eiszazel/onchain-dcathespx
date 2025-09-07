import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const outDir = path.join(process.cwd(), 'playwright-screenshots');

test.beforeAll(async () => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
});

test('capture homepage screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Drip It Now' })).toBeVisible();
  await page.screenshot({ path: path.join(outDir, 'home.png'), fullPage: true });
});

test('capture docs screenshot', async ({ page }) => {
  await page.goto('/docs');
  await expect(page.getByRole('heading', { name: 'Docs & Lore' })).toBeVisible();
  await page.screenshot({ path: path.join(outDir, 'docs.png'), fullPage: true });
});

test('capture daily ta screenshot', async ({ page }) => {
  await page.goto('/spx/ta');
  await expect(page.getByRole('heading', { name: 'Daily TA' })).toBeVisible();
  await page.screenshot({ path: path.join(outDir, 'ta.png'), fullPage: true });
});

