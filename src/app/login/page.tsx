import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { LoginForm } from "@/features/auth/components/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type LoginPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>Sign in to manage listings, watchlists, and bids.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <LoginForm nextPath={params.next} />
          <p className="text-sm text-muted-foreground">
            New here?{" "}
            <Link href={appRoutes.register} className="text-primary hover:underline">
              Create an account
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
