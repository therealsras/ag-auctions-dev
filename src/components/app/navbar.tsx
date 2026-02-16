"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, Gem } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { appRoutes } from "@/lib/routes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function initials(name: string | null | undefined, email: string | null | undefined) {
  const basis = name?.trim() || email?.trim() || "U";
  return basis
    .split(" ")
    .map((part) => part[0]?.toUpperCase())
    .join("")
    .slice(0, 2);
}

export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/78 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
        <Link href={appRoutes.home} className="group flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-md border border-primary/45 bg-primary/12 shadow-[0_0_18px_oklch(0.76_0.13_83_/_0.2)] transition-transform duration-300 group-hover:scale-105">
            <Gem className="size-4 text-primary" />
          </span>
          <span className="font-display gilded-text text-2xl font-black leading-none tracking-tight md:text-[1.8rem]">
            Agentic Auctions
          </span>
        </Link>

        {isPending ? null : user ? (
          <nav className="flex items-center gap-1 md:gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href={appRoutes.sell}>Sell</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={appRoutes.watchlist}>Watchlist</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href={appRoutes.myListings}>My Listings</Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-auto gap-2 rounded-full border border-border/70 bg-card/80 px-2 py-1 transition-colors hover:bg-card"
                  aria-label="Account menu"
                >
                  <Avatar className="size-8 border border-border/80">
                    <AvatarImage src={user.image ?? undefined} alt={user.name ?? user.email ?? "User avatar"} />
                    <AvatarFallback>{initials(user.name, user.email)}</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="size-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuLabel>
                  <p className="truncate text-sm">{user.name ?? "Account"}</p>
                  <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={appRoutes.profile}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={appRoutes.myListings}>My Listings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={appRoutes.watchlist}>Watchlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={async () => {
                    await authClient.signOut();
                    router.push(appRoutes.home);
                    router.refresh();
                  }}
                >
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        ) : (
          <nav className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href={appRoutes.login}>Log in</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={appRoutes.register}>Register</Link>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
