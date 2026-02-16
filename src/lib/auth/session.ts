import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getAuthSession(requestHeaders?: Headers) {
  const resolvedHeaders = requestHeaders ?? (await headers());

  return auth.api.getSession({
    headers: resolvedHeaders,
  });
}
