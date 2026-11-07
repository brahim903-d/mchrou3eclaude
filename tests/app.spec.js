import { test, expect } from '@playwright/test';

const tid = (page, id) => page.getByTestId(id);

test.beforeEach(async ({ page }) => {
  await page.goto('./');
  await page.evaluate(() => localStorage.clear());
});

test('every Studio control is reachable on screen', async ({ page }) => {
  await page.goto('./#/studio');
  await tid(page, 'add-text').click();
  const ids = [
    'add-text', 'add-shape-rect', 'add-shape-circle', 'add-shape-star', 'add-shape-heart', 'add-shape-badge',
    'upload-label', 'template-0', 'template-1', 'template-2', 'template-3', 'layers',
    'design-name', 'undo', 'redo', 'stitch-look', 'canvas', 'garment', 'zone', 'garment-colors',
    'prop-text', 'prop-font', 'prop-size', 'prop-spacing', 'prop-scale', 'prop-rotation', 'prop-stitch', 'threads',
    'center', 'duplicate', 'delete', 'qty', 'stitch-count', 'unit-price', 'total-price',
    'add-to-cart', 'save-design', 'export-svg', 'export-png', 'production-sheet', 'new-design',
  ];
  let reachable = 0;
  for (const id of ids) {
    const loc = tid(page, id).first();
    await loc.scrollIntoViewIfNeeded();
    await expect(loc, id).toBeVisible();
    reachable++;
  }
  console.log(`${reachable}/${ids.length} reachable on screen`);
  // No horizontal page scroll.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('edit text, undo/redo and live pricing', async ({ page }) => {
  await page.goto('./#/studio');
  await tid(page, 'add-text').click();
  const stitches = async () => parseInt((await tid(page, 'stitch-count').innerText()).replace(/\D/g, ''), 10);
  const before = await stitches();
  await tid(page, 'prop-text').fill('BRODERIE MAROC');
  expect(await stitches()).toBeGreaterThan(before);
  await page.locator('.canvas').click({ position: { x: 5, y: 5 } }); // deselect, leave the input
  await page.keyboard.press('Control+z');
  expect(await stitches()).toBe(before);
  await page.keyboard.press('Control+y');
  expect(await stitches()).toBeGreaterThan(before);

  const unit1 = await tid(page, 'unit-price').innerText();
  await tid(page, 'qty').fill('60');
  await expect(tid(page, 'unit-price')).not.toHaveText(unit1); // 50+ discount
});

test('drag moves an element and warns outside the hoop', async ({ page, isMobile }) => {
  test.skip(isMobile, 'mouse drag on desktop only');
  await page.goto('./#/studio');
  await tid(page, 'add-shape-star').click();
  const el = page.locator('.canvas .el').first();
  const box = await el.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + 600, box.y + 400, { steps: 5 });
  await page.mouse.up();
  await expect(tid(page, 'warnings')).toContainText('hors de la zone');
});

test('save, reopen, order end-to-end', async ({ page }) => {
  await page.goto('./#/studio');
  await tid(page, 'template-1').click();
  await tid(page, 'design-name').fill('Maillot équipe');
  await tid(page, 'save-design').click();

  await page.goto('./#/designs');
  await expect(tid(page, 'design-list')).toContainText('Maillot équipe');
  await tid(page, 'open-design').first().click();
  await expect(tid(page, 'design-name')).toHaveValue('Maillot équipe');

  await tid(page, 'qty').fill('12');
  await tid(page, 'add-to-cart').click();
  await expect(page.locator('#cart-count')).toHaveText('12');

  await page.goto('./#/cart');
  await expect(tid(page, 'cart-lines')).toContainText('Maillot équipe');
  await tid(page, 'place-order').click();
  await expect(tid(page, 'ck-error')).not.toBeEmpty();
  await tid(page, 'ck-name').fill('Brahim Test');
  await tid(page, 'ck-phone').fill('0612345678');
  await tid(page, 'ck-city').fill('Casablanca');
  await tid(page, 'ck-address').fill('12 rue des Artisans');
  await tid(page, 'place-order').click();

  await expect(page).toHaveURL(/#\/orders/);
  await expect(tid(page, 'order-list')).toContainText('CMD-1001');
  await tid(page, 'order-status').selectOption('en production');
  await expect(page.locator('.progress li.done')).toHaveCount(3);
  await expect(page.locator('#cart-count')).toHaveText('0');
});

test('exports download files', async ({ page }) => {
  await page.goto('./#/studio');
  await tid(page, 'template-0').click();
  for (const [id, ext] of [['export-svg', '.svg'], ['export-png', '.png'], ['production-sheet', '.json']]) {
    const [dl] = await Promise.all([page.waitForEvent('download'), tid(page, id).click()]);
    expect(dl.suggestedFilename()).toMatch(new RegExp(`\\${ext}$`));
  }
});
