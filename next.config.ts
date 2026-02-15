import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  distDir: process.env.NEXT_TEST_MODE === "true" ? ".next-e2e" : ".next",
};

export default nextConfig;
