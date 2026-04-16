import { describe, expect, it } from "vitest";

import { router } from "@/app/router";

describe("router", () => {
  it("defines demo list route", () => {
    expect(router.routes[1]?.path).toBe("/demo/list");
  });
});
