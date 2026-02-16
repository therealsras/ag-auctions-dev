import { NextResponse, type NextRequest } from "next/server";
import { getAuthSession } from "@/lib/auth/session";

const protectedPrefixes = ["/sell", "/watchlist", "/my-listings", "/profile"];

export async function proxy(request: NextRequest) {
  const isProtected = protectedPrefixes.some(
    (prefix) => request.nextUrl.pathname === prefix || request.nextUrl.pathname.startsWith(`${prefix}/`)
  );

  if (!isProtected) {
    return NextResponse.next();
  }

  const session = await getAuthSession(request.headers);
  if (session) {
    return NextResponse.next();
  }

  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("next", request.nextUrl.pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  runtime: "nodejs",
  matcher: ["/sell/:path*", "/watchlist/:path*", "/my-listings/:path*", "/profile/:path*"],
};
