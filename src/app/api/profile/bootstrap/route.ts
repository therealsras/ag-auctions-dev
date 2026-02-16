import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth/session";
import { upsertProfileForUser } from "@/lib/actions/profile";
import { updateProfileSchema } from "@/lib/schemas/profile/update-profile.schema";

export async function POST(request: Request) {
  const session = await getAuthSession(request.headers);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const json = await request.json().catch(() => ({}));

  const parsed = updateProfileSchema.safeParse({
    displayName: typeof json?.displayName === "string" ? json.displayName : session.user.name ?? "New Seller",
    location: "",
    bio: "",
  });

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const profile = await upsertProfileForUser(session.user.id, parsed.data);

  return NextResponse.json({ profile });
}
