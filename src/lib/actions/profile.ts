import { prisma } from "@/lib/db/prisma";
import { type UpdateProfileInput } from "@/lib/schemas/profile/update-profile.schema";

export async function upsertProfileForUser(userId: string, input: UpdateProfileInput) {
  return prisma.profile.upsert({
    where: { userId },
    update: {
      displayName: input.displayName,
      location: input.location || null,
      bio: input.bio || null,
    },
    create: {
      userId,
      displayName: input.displayName,
      location: input.location || null,
      bio: input.bio || null,
    },
  });
}
