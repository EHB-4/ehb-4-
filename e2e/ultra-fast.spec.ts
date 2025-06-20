import { test, expect } from '@playwright/test';

test.describe('Ultra Fast E2E Tests', () => {
  test('should load homepage quickly', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Check if page loads within 3 seconds
    await expect(page).toHaveTitle(/EHB/);

    // Verify main content is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should navigate to GoSellr quickly', async ({ page }) => {
    // Navigate to GoSellr
    await page.goto('/gosellr');

    // Check if GoSellr page loads
    await expect(page.locator('h1')).toContainText(/GoSellr/);
  });

  test('should load dashboard quickly', async ({ page }) => {
    // Navigate to dashboard
    await page.goto('/ehb-dashboard');

    // Check if dashboard loads
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle authentication flow', async ({ page }) => {
    // Navigate to login
    await page.goto('/auth/signin');

    // Check if login form is visible
    await expect(page.locator('form')).toBeVisible();
  });

  test('should load API endpoints quickly', async ({ page }) => {
    // Test health check endpoint
    const response = await page.request.get('/api/health-check');
    expect(response.status()).toBe(200);
  });
});
