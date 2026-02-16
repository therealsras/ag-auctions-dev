import { expect, test } from "./fixtures";

test("loads unauthenticated landing page", async ({ page, runtime }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Buy and sell unique finds with confidence." })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Create account" })).toBeVisible();
  await expect(page.getByRole("main").getByRole("link", { name: "Log in" })).toBeVisible();

  const runId = await page.evaluate(() => window.localStorage.getItem("e2e-run-id"));
  expect(runId).toBe(runtime.runId);
});
