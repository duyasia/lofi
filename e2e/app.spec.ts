import { test, expect } from '@playwright/test';

test.describe('Lofi App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads the app successfully', async ({ page }) => {
    // Check header is visible
    await expect(page.locator('img[alt="logo"]')).toBeVisible();
  });

  test('day/night toggle works', async ({ page }) => {
    // Find toggle button and click
    const toggleButton = page.locator('button').filter({ has: page.locator('img[alt="iconWeather"]') });

    // Get initial state (should be day - orange background)
    await expect(toggleButton).toHaveClass(/bg-\[#f3a952\]/);

    // Click to toggle to night
    await toggleButton.click();

    // Should now be night (blue background)
    await expect(toggleButton).toHaveClass(/bg-\[#11216d\]/);
  });

  test('lateral menu opens mood panel', async ({ page }) => {
    // Click mood button (first button in lateral menu)
    const moodButton = page.locator('img[alt="mood"]');
    await moodButton.click();

    // Mood panel should be visible
    await expect(page.getByText('Mood')).toBeVisible();
    await expect(page.getByText('Sleepy')).toBeVisible();
    await expect(page.getByText('Jazzy')).toBeVisible();
    await expect(page.getByText('Chill')).toBeVisible();
  });

  test('player controls are visible', async ({ page }) => {
    // Check player controls
    await expect(page.locator('img[alt="prev"]')).toBeVisible();
    await expect(page.locator('img[alt="next"]')).toBeVisible();

    // Song name should be visible
    await expect(page.getByText('Formant - Regret')).toBeVisible();
  });

  test('menu dropdown works', async ({ page }) => {
    // Click menu icon
    const menuIcon = page.locator('img[alt="iconMenu"]').last();
    await menuIcon.click();

    // Menu items should be visible
    await expect(page.getByText('SẢN PHẨM')).toBeVisible();
    await expect(page.getByText('KHUYẾN MÃI')).toBeVisible();
  });

  test('action popover is clickable', async ({ page }) => {
    // Find an action popover (City Rain or similar)
    const rainPopover = page.getByText('City Rain');

    if (await rainPopover.isVisible()) {
      await rainPopover.click();
      // Just verify it's clickable without errors
    }
  });

  test('navigation to BookCafe works', async ({ page }) => {
    // Find Enter button
    const enterButton = page.getByText('Enter');

    if (await enterButton.isVisible()) {
      await enterButton.click();

      // Should see BookCafe elements
      await expect(page.getByText('Go out')).toBeVisible({ timeout: 5000 });
    }
  });

  test('playlist panel opens', async ({ page }) => {
    // Click playlist button
    const playlistButton = page.locator('img[alt="playlist"]');
    await playlistButton.click();

    // Playlist panel should be visible
    await expect(page.getByText('Playlists')).toBeVisible();
    await expect(page.getByText('Templates')).toBeVisible();
  });

  test('fullscreen button is clickable', async ({ page }) => {
    // Find fullscreen button
    const fullscreenButton = page.locator('img[alt="iconMenu"]').first();

    // Verify it's clickable (actual fullscreen may not work in test)
    await expect(fullscreenButton).toBeVisible();
    await fullscreenButton.click();
  });
});
