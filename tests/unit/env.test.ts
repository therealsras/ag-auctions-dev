import { describe, expect, it } from "vitest";
import { getRequiredEnv } from "@/lib/env";

describe("getRequiredEnv", () => {
  const ENV_KEY = "UNIT_TEST_REQUIRED_ENV";

  it("returns a trimmed environment variable value", () => {
    process.env[ENV_KEY] = "  value  ";

    expect(getRequiredEnv(ENV_KEY)).toBe("value");
  });

  it("throws when environment variable is missing", () => {
    delete process.env[ENV_KEY];

    expect(() => getRequiredEnv(ENV_KEY)).toThrow(
      `Missing required environment variable: ${ENV_KEY}`,
    );
  });

  it("throws when environment variable is whitespace only", () => {
    process.env[ENV_KEY] = "   ";

    expect(() => getRequiredEnv(ENV_KEY)).toThrow(
      `Missing required environment variable: ${ENV_KEY}`,
    );
  });
});
