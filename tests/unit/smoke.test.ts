import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";
import { createListingSchema } from "@/lib/schemas/listings/create-listing.schema";

describe("unit smoke", () => {
  it("merges class names", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("validates listing schema", () => {
    const parsed = createListingSchema.safeParse({
      title: "Vintage Camera",
      description: "Working condition, lens included.",
      startingBid: 2500,
      endAt: new Date(Date.now() + 60_000),
    });

    expect(parsed.success).toBe(true);
  });
});
