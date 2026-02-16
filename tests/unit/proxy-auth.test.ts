import { describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";
import { proxy } from "../../proxy";
import { getAuthSession } from "@/lib/auth/session";

vi.mock("@/lib/auth/session", () => ({
  getAuthSession: vi.fn(),
}));

describe("proxy auth protection", () => {
  it("skips session checks for unprotected routes", async () => {
    const response = await proxy(new NextRequest("http://localhost:3000/"));

    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(getAuthSession).not.toHaveBeenCalled();
  });

  it("does not treat prefix-like routes as protected", async () => {
    const response = await proxy(new NextRequest("http://localhost:3000/profiled"));

    expect(response.headers.get("x-middleware-next")).toBe("1");
    expect(getAuthSession).not.toHaveBeenCalled();
  });

  it("allows protected routes when a session exists", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce({
      session: { id: "session-id", userId: "user-id", expiresAt: new Date() },
      user: { id: "user-id", email: "bob@test.com", name: "Bob Bobbity" },
    } as Awaited<ReturnType<typeof getAuthSession>>);

    const response = await proxy(new NextRequest("http://localhost:3000/profile"));

    expect(response.headers.get("x-middleware-next")).toBe("1");
  });

  it("redirects protected routes when no session exists", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce(null);

    const response = await proxy(new NextRequest("http://localhost:3000/profile"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/login?next=%2Fprofile");
  });

  it("redirects nested protected routes when no session exists", async () => {
    vi.mocked(getAuthSession).mockResolvedValueOnce(null);

    const response = await proxy(new NextRequest("http://localhost:3000/profile/settings"));

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("http://localhost:3000/login?next=%2Fprofile%2Fsettings");
  });
});
