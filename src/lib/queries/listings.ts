import "server-only";
import type { Listing } from "@/generated/prisma/client";
import { prisma } from "@/lib/db/prisma";

export async function getListingById(id: string): Promise<Listing | null> {
  return prisma.listing.findUnique({ where: { id } });
}
