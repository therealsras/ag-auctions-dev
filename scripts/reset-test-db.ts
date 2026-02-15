import { execSync } from "node:child_process";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const DATABASE_TEST_URL = process.env.DATABASE_TEST_URL;

if (!DATABASE_TEST_URL) {
  throw new Error(
    "Missing DATABASE_TEST_URL. Set it before running test DB bootstrap/reset.",
  );
}

const env = {
  ...process.env,
  DATABASE_URL: DATABASE_TEST_URL,
};

execSync("npx prisma db push --force-reset --accept-data-loss", {
  stdio: "inherit",
  env,
});

execSync("npx prisma db seed", {
  stdio: "inherit",
  env,
});
