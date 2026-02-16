import Link from "next/link";
import { Gavel, ShieldCheck, Sparkles } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="relative flex min-h-[calc(100vh-10rem)] flex-col justify-center pb-10 pt-4">
      <div className="pointer-events-none absolute -left-28 top-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl pulse-halo" />
      <div className="pointer-events-none absolute -right-24 bottom-4 h-64 w-64 rounded-full bg-accent/25 blur-3xl drift" />

      <section className="fade-up">
        <Card className="relative overflow-hidden border-primary/25 bg-card/85 shadow-[0_18px_45px_oklch(0.35_0.04_60_/_0.2)] backdrop-blur-sm">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <CardContent className="grid gap-10 p-8 md:grid-cols-[minmax(0,1fr)_19rem] md:p-12">
            <div className="space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary">Curated weekly lots</p>
              <h1 className="font-display max-w-3xl text-5xl leading-[1.04] tracking-tight md:text-6xl">
                Where remarkable pieces find their next owner.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Agentic Auctions pairs trusted sellers with buyers who care about provenance. Fast onboarding, rich
                profiles, and a marketplace made for serious collectors.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="px-8 text-base">
                  <Link href={appRoutes.register}>Join the next drop</Link>
                </Button>
                <Button asChild variant="secondary" size="lg" className="px-8 text-base">
                  <Link href={appRoutes.login}>Log in</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 self-start">
              <div className="rounded-2xl border border-border/70 bg-background/80 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Active bidders</p>
                <p className="mt-2 font-display text-4xl text-primary">2.8k</p>
                <p className="mt-2 text-sm text-muted-foreground">Growing private watchlists and saved searches daily.</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-background/80 p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Recent close</p>
                <p className="mt-2 font-display text-4xl">$19,400</p>
                <p className="mt-2 text-sm text-muted-foreground">Vintage camera lot finalized in under 14 minutes.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
        <Card className="fade-up delay-1 border-border/70 bg-card/80">
          <CardContent className="space-y-3 p-6">
            <Gavel className="size-5 text-primary" />
            <h2 className="font-display text-2xl">Dynamic bidding</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Fast lot discovery and auction pacing that rewards decisive buyers.
            </p>
          </CardContent>
        </Card>

        <Card className="fade-up delay-2 border-border/70 bg-card/80">
          <CardContent className="space-y-3 p-6">
            <ShieldCheck className="size-5 text-primary" />
            <h2 className="font-display text-2xl">Verified profiles</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Identity and seller detail are first-class signals before every bid.
            </p>
          </CardContent>
        </Card>

        <Card className="fade-up delay-3 border-border/70 bg-card/80">
          <CardContent className="space-y-3 p-6">
            <Sparkles className="size-5 text-primary" />
            <h2 className="font-display text-2xl">Thoughtful curation</h2>
            <p className="text-sm leading-6 text-muted-foreground">
              Personalized navigation highlights categories aligned with your taste.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="fade-up delay-2 mt-8 rounded-3xl border border-primary/25 bg-primary/8 p-6 md:mt-10 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Now in Phase 1</p>
            <h2 className="font-display text-3xl leading-tight md:text-4xl">Create your account and claim your bidder seat.</h2>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href={appRoutes.register}>Get started</Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href={appRoutes.sell}>Start selling</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
