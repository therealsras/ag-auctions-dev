import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createPrismaClient } from "@/lib/db/create-prisma-client";
import { upsertProfileForUser } from "@/lib/actions/profile";

const prisma = createPrismaClient();

describe("profile repository integration", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("creates and updates a user profile", async () => {
    const user = await prisma.user.create({
      data: {
        email: `profile-test-${Date.now()}@example.com`,
        emailVerified: true,
      },
    });

    const created = await upsertProfileForUser(user.id, {
      displayName: "Profile User",
      location: "Boston, MA",
      bio: "First version",
    });

    const updated = await upsertProfileForUser(user.id, {
      displayName: "Profile User Updated",
      location: "Cambridge, MA",
      bio: "Second version",
    });

    expect(created.userId).toBe(user.id);
    expect(updated.displayName).toBe("Profile User Updated");
  });

  it("normalizes empty location and bio to null", async () => {
    const user = await prisma.user.create({
      data: {
        email: `profile-null-fields-${Date.now()}@example.com`,
        emailVerified: true,
      },
    });

    const profile = await upsertProfileForUser(user.id, {
      displayName: "Null Fields User",
      location: "",
      bio: "",
    });

    expect(profile.location).toBeNull();
    expect(profile.bio).toBeNull();
  });
});
