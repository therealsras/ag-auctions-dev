import { loadEnvConfig } from "@next/env";
import { getRequiredEnv } from "@/lib/env";

loadEnvConfig(process.cwd());

const DATABASE_TEST_URL = getRequiredEnv("DATABASE_TEST_URL");

process.env.DATABASE_URL = DATABASE_TEST_URL;
