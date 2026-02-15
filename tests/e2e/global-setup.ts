import { execSync } from "node:child_process";

export default async function globalSetup() {
  execSync("tsx scripts/ensure-test-db-url.ts", { stdio: "inherit" });
  execSync("npm run test:db:reset", { stdio: "inherit" });
}
