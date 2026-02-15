"use server";

import type { Listing } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";

export type CreateListingInput = {
  sellerId: string;
  title: string;
  description: string;
  startingBid: number;
  currentBid: number;
  endAt: Date;
};

export async function createListing(input: CreateListingInput): Promise<Listing> {
  return prisma.listing.create({
    data: {
      sellerId: input.sellerId,
      title: input.title,
      description: input.description,
      startingBid: input.startingBid,
      currentBid: input.currentBid,
      endAt: input.endAt,
      status: "ACTIVE",
    },
  });
}
