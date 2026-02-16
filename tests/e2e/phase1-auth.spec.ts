import { expect, test } from "./fixtures";

test("redirects unauthenticated users from protected routes", async ({ page }) => {
  await page.goto("/profile");

  await expect(page).toHaveURL(/\/login\?next=\/profile$/);
});
