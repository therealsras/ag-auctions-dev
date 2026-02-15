import { expect, test } from "./fixtures";

test("loads unauthenticated landing page", async ({ page, runtime }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Agentic Auctions" })).toBeVisible();
  await expect(page.getByText("Phase 0 foundation is configured.")).toBeVisible();

  const runId = await page.evaluate(() => window.localStorage.getItem("e2e-run-id"));
  expect(runId).toBe(runtime.runId);
});
