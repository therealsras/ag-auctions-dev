import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { getRequiredEnv } from "@/lib/env";

export function createPrismaClient(databaseUrl = getRequiredEnv("DATABASE_URL")) {
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  return new PrismaClient({ adapter });
}
