import { redirect } from "next/navigation";
import { appRoutes } from "@/lib/routes";
import { getAuthSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { ProfileForm } from "@/features/profile/components/profile-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    redirect(`${appRoutes.login}?next=${appRoutes.profile}`);
  }

  const profile = await prisma.profile.upsert({
    where: { userId: session.user.id },
    update: {},
    create: {
      userId: session.user.id,
      displayName: session.user.name ?? "New Seller",
    },
  });

  return (
    <main className="space-y-6">
      <section className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your public seller details and account preferences.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Edit profile</CardTitle>
            <CardDescription>These values will appear on your listings and seller pages.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileForm
              defaultValues={{
                displayName: profile.displayName,
                location: profile.location ?? "",
                bio: profile.bio ?? "",
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account snapshot</CardTitle>
            <CardDescription>Placeholder cards for next profile phase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <div>
              <p className="font-medium text-foreground">Verification status</p>
              <p>Email verification and trust badges coming soon.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Shipping preferences</p>
              <p>Saved shipping defaults will appear in Phase 2.</p>
            </div>
            <div>
              <p className="font-medium text-foreground">Payout settings</p>
              <p>Secure payout destinations will be configurable soon.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
