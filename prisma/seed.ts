import { ListingStatus } from "../src/generated/prisma/client";
import { auth } from "../src/lib/auth";
import { createPrismaClient } from "../src/lib/db/create-prisma-client";

const prisma = createPrismaClient();

const seededUsers = [
  {
    name: "Bob Bobbity",
    email: "bob@test.com",
    password: "Pa$$w0rd",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Captain Quackles",
    email: "captain.quackles@test.com",
    password: "Pa$$w0rd",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Sir Bids-a-Lot",
    email: "sir.bidsalot@test.com",
    password: "Pa$$w0rd",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
] as const;

async function main() {
  await prisma.user.deleteMany({
    where: {
      email: {
        in: seededUsers.map((user) => user.email),
      },
    },
  });

  for (const user of seededUsers) {
    await auth.api.signUpEmail({
      body: {
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
      },
    });

    await prisma.user.update({
      where: { email: user.email },
      data: {
        name: user.name,
        displayName: user.name,
        image: user.image,
        emailVerified: true,
      },
    });
  }

  const users = await prisma.user.findMany({
    where: {
      email: {
        in: seededUsers.map((user) => user.email),
      },
    },
  });

  await Promise.all(
    users.map((user) =>
      prisma.profile.upsert({
        where: { userId: user.id },
        update: {
          displayName: user.displayName ?? user.name ?? "Seed User",
          bio: "Seeded profile for deterministic auth tests.",
          location: "Austin, TX",
        },
        create: {
          userId: user.id,
          displayName: user.displayName ?? user.name ?? "Seed User",
          bio: "Seeded profile for deterministic auth tests.",
          location: "Austin, TX",
        },
      })
    )
  );

  const seller = users.find((user) => user.email === "bob@test.com");

  if (!seller) {
    throw new Error("Failed to seed seller user.");
  }

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
