import Link from "next/link";
import { appRoutes } from "@/lib/routes";
import { RegisterForm } from "@/features/auth/components/register-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <main className="mx-auto w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Create account</CardTitle>
          <CardDescription>Get started with your seller profile in under a minute.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RegisterForm />
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href={appRoutes.login} className="text-primary hover:underline">
              Log in
            </Link>
            .
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
