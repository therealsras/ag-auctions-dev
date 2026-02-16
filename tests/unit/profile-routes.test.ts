import { describe, expect, it, vi } from "vitest";
import { GET, PUT } from "@/app/api/profile/route";
import { POST } from "@/app/api/profile/bootstrap/route";
import { getAuthSession } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { upsertProfileForUser } from "@/lib/actions/profile";

vi.mock("@/lib/auth/session", () => ({
  getAuthSession: vi.fn(),
}));

vi.mock("@/lib/db/prisma", () => ({
  prisma: {
    profile: {
      findUnique: vi.fn(),
    },
  },
}));

vi.mock("@/lib/actions/profile", () => ({
  upsertProfileForUser: vi.fn(),
}));

describe("profile API routes", () => {
  it("GET returns 401 when user is unauthenticated", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce(null);

    const response = await GET(new Request("http://localhost/api/profile"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({ error: "Unauthorized" });
  });

  it("GET returns profile for authenticated user", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce({
      user: { id: "user-1" },
    } as unknown as Awaited<ReturnType<typeof getAuthSession>>);
    vi.mocked(prisma.profile.findUnique).mockResolvedValueOnce({
      id: "profile-1",
      userId: "user-1",
      displayName: "Seller",
      location: null,
      bio: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await GET(new Request("http://localhost/api/profile"));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.profile?.userId).toBe("user-1");
  });

  it("PUT returns 400 for invalid payload", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce({
      user: { id: "user-1" },
    } as unknown as Awaited<ReturnType<typeof getAuthSession>>);

    const request = new Request("http://localhost/api/profile", {
      method: "PUT",
      body: JSON.stringify({ displayName: "A", bio: "hello" }),
      headers: { "content-type": "application/json" },
    });

    const response = await PUT(request);
    const body = await response.json();

    expect(response.status).toBe(400);
    expect(body.error.fieldErrors.displayName).toBeDefined();
  });

  it("PUT upserts profile with parsed payload for authenticated user", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce({
      user: { id: "user-2" },
    } as unknown as Awaited<ReturnType<typeof getAuthSession>>);
    vi.mocked(upsertProfileForUser).mockResolvedValueOnce({
      id: "profile-2",
      userId: "user-2",
      displayName: "Alice",
      location: "",
      bio: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const request = new Request("http://localhost/api/profile", {
      method: "PUT",
      body: JSON.stringify({
        displayName: "  Alice  ",
        location: "",
        bio: "",
      }),
      headers: { "content-type": "application/json" },
    });

    const response = await PUT(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(upsertProfileForUser).toHaveBeenCalledWith("user-2", {
      displayName: "Alice",
      location: "",
      bio: "",
    });
    expect(body.profile?.displayName).toBe("Alice");
  });

  it("bootstrap POST returns 401 when unauthenticated", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce(null);

    const response = await POST(new Request("http://localhost/api/profile/bootstrap"));
    const body = await response.json();

    expect(response.status).toBe(401);
    expect(body).toEqual({ error: "Unauthorized" });
  });

  it("bootstrap POST handles malformed JSON and uses default display name", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce({
      user: { id: "user-3", name: null },
    } as unknown as Awaited<ReturnType<typeof getAuthSession>>);
    vi.mocked(upsertProfileForUser).mockResolvedValueOnce({
      id: "profile-3",
      userId: "user-3",
      displayName: "New Seller",
      location: null,
      bio: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const request = {
      headers: new Headers(),
      json: vi.fn().mockRejectedValueOnce(new Error("invalid json")),
    } as unknown as Request;

    const response = await POST(request);
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(upsertProfileForUser).toHaveBeenCalledWith("user-3", {
      displayName: "New Seller",
      location: "",
      bio: "",
    });
    expect(body.profile?.userId).toBe("user-3");
  });
});
