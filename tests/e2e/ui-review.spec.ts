import { test, expect } from '@playwright/test';

test.describe('UI Review Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // Set viewport for consistent screenshots
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('Landing page screenshot', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to fully load
    await page.waitForLoadState('networkidle');
    
    // Keep screen open for 2 seconds for visual review
    await page.waitForTimeout(2000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'playwright-screenshots/01-landing-page.png',
      fullPage: true 
    });
    
    // Verify key elements are visible
    await expect(page.locator('h1')).toContainText('Dollar-Cost Average');
    await expect(page.locator('text=SPX6900')).toBeVisible();
  });

  test('App dashboard - not connected', async ({ page }) => {
    await page.goto('/app');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/02-dashboard-disconnected.png',
      fullPage: true 
    });
    
    await expect(page.locator('text=Connect Your Wallet')).toBeVisible();
  });

  test('Plans page', async ({ page }) => {
    await page.goto('/plans');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/03-plans-page.png',
      fullPage: true 
    });
  });

  test('Create new plan page', async ({ page }) => {
    await page.goto('/plans/new');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/04-create-plan.png',
      fullPage: true 
    });
  });

  test('Portfolio page', async ({ page }) => {
    await page.goto('/portfolio');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/05-portfolio.png',
      fullPage: true 
    });
  });

  test('Docs page', async ({ page }) => {
    await page.goto('/docs');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/06-docs.png',
      fullPage: true 
    });
  });

  test('TA page', async ({ page }) => {
    await page.goto('/spx/ta');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/07-ta-page.png',
      fullPage: true 
    });
  });

  test('Mobile viewport - Landing page', async ({ page }) => {
    // Test mobile responsive design
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/08-mobile-landing.png',
      fullPage: true 
    });
  });

  test('Mobile viewport - Dashboard', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/app');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    await page.screenshot({ 
      path: 'playwright-screenshots/09-mobile-dashboard.png',
      fullPage: true 
    });
  });

  test('Wallet interaction flow', async ({ page }) => {
    await page.goto('/');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Try to click connect wallet button
    const connectButton = page.locator('text=Connect Wallet').first();
    if (await connectButton.isVisible()) {
      await connectButton.click();
      await page.waitForTimeout(2000);
      
      await page.screenshot({ 
        path: 'playwright-screenshots/10-wallet-modal.png',
        fullPage: true 
      });
    }
  });
});

test.describe('UI Component Review', () => {
  test('Wallet buttons states', async ({ page }) => {
    await page.goto('/app');
    
    await page.waitForLoadState('networkidle');
    
    // Screenshot of wallet connection area
    const walletSection = page.locator('[class*="WalletActions"]').first();
    if (await walletSection.isVisible()) {
      await walletSection.screenshot({ 
        path: 'playwright-screenshots/11-wallet-buttons.png' 
      });
    }
    
    await page.waitForTimeout(2000);
  });

  test('Balance cards layout', async ({ page }) => {
    await page.goto('/app');
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Focus on balance cards section if present
    const balanceSection = page.locator('text=ETH Balance').first();
    if (await balanceSection.isVisible()) {
      const parent = balanceSection.locator('..').locator('..').locator('..');
      await parent.screenshot({ 
        path: 'playwright-screenshots/12-balance-cards.png' 
      });
    }
  });
});
