import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());

const DATABASE_TEST_URL = process.env.DATABASE_TEST_URL;

if (!DATABASE_TEST_URL) {
  throw new Error(
    "Missing DATABASE_TEST_URL. Set it (for example from .env.test.example) before running integration/e2e tests.",
  );
}
