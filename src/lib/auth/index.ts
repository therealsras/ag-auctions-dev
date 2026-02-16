import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/db/prisma";
import { getRequiredEnv } from "@/lib/env";

const trustedOrigin = process.env.BETTER_AUTH_URL?.trim();

export const auth = betterAuth({
  secret: getRequiredEnv("BETTER_AUTH_SECRET"),
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  ...(trustedOrigin ? { trustedOrigins: [trustedOrigin] } : {}),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
});
