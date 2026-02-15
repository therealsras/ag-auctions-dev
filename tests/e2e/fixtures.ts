import { test as base } from "@playwright/test";

type RuntimeFixture = {
  runId: string;
};

export const test = base.extend<{ runtime: RuntimeFixture }>({
  runtime: async ({ context }, applyFixture, testInfo) => {
    const runId = `${Date.now()}-${testInfo.parallelIndex}`;

    await context.addInitScript((id) => {
      window.localStorage.setItem("e2e-run-id", id);
    }, runId);

    await applyFixture({ runId });
  },
});

export { expect } from "@playwright/test";
