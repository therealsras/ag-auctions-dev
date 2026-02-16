import { describe, expect, it } from "vitest";
import { loginSchema } from "@/lib/schemas/auth/login.schema";
import { registerSchema } from "@/lib/schemas/auth/register.schema";

describe("auth schemas", () => {
  it("accepts valid login payload", () => {
    const parsed = loginSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects register payload when passwords do not match", () => {
    const parsed = registerSchema.safeParse({
      name: "User",
      email: "user@example.com",
      password: "password123",
      confirmPassword: "different123",
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects login payload with invalid email and short password", () => {
    const parsed = loginSchema.safeParse({
      email: "invalid-email",
      password: "short",
    });

    expect(parsed.success).toBe(false);
  });

  it("trims and validates register name length", () => {
    const tooShortAfterTrim = registerSchema.safeParse({
      name: " A ",
      email: "user@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    const validAfterTrim = registerSchema.safeParse({
      name: "  Alex  ",
      email: "user@example.com",
      password: "password123",
      confirmPassword: "password123",
    });

    expect(tooShortAfterTrim.success).toBe(false);
    expect(validAfterTrim.success).toBe(true);
  });
});
