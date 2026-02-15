import { ListingStatus } from "../src/generated/prisma/client";
import { createPrismaClient } from "../src/lib/db/create-prisma-client";

const prisma = createPrismaClient();

async function main() {
  const seller = await prisma.user.upsert({
    where: { email: "seed.seller@example.com" },
    update: {
      displayName: "Seed Seller",
      name: "Seed Seller",
    },
    create: {
      email: "seed.seller@example.com",
      displayName: "Seed Seller",
      name: "Seed Seller",
      emailVerified: true,
    },
  });

  await prisma.listing.upsert({
    where: { id: "seed-listing-1" },
    update: {
      title: "Seed Listing",
      status: ListingStatus.ACTIVE,
      currentBid: 1500,
    },
    create: {
      id: "seed-listing-1",
      sellerId: seller.id,
      title: "Seed Listing",
      description: "Deterministic listing created for test bootstrap.",
      category: "collectibles",
      startingBid: 1000,
      currentBid: 1500,
      endAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      status: ListingStatus.ACTIVE,
      photos: {
        create: [{ url: "https://example.com/seed-photo.jpg", order: 1 }],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
