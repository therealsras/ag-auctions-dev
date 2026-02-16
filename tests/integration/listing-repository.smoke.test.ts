import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createListing } from "@/lib/actions/listings";
import { getListingById } from "@/lib/queries/listings";
import { createPrismaClient } from "@/lib/db/create-prisma-client";

const prisma = createPrismaClient();

describe("listing repository integration smoke", () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("persists and fetches a listing", async () => {
    const seller = await prisma.user.create({
      data: {
        email: `integration-seller-${Date.now()}@example.com`,
        emailVerified: true,
      },
    });

    const created = await createListing({
      sellerId: seller.id,
      title: "Integration Listing",
      description: "Integration round-trip",
      startingBid: 1000,
      currentBid: 1000,
      endAt: new Date(Date.now() + 3_600_000),
    });

    const found = await getListingById(created.id);

    expect(found).not.toBeNull();
    expect(found?.title).toBe("Integration Listing");
  });

  it("returns null when listing does not exist", async () => {
    const found = await getListingById("listing-does-not-exist");

    expect(found).toBeNull();
  });

  it("rejects listing creation for an unknown seller", async () => {
    await expect(
      createListing({
        sellerId: "user-does-not-exist",
        title: "Invalid Seller Listing",
        description: "Should fail FK constraint",
        startingBid: 1000,
        currentBid: 1000,
        endAt: new Date(Date.now() + 3_600_000),
      }),
    ).rejects.toThrow();
  });
});
