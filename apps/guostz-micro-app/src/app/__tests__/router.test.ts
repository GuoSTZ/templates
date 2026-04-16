import { describe, expect, it } from "vitest";

import { router } from "@/app/router";

describe("router", () => {
  it("defines home and workspace routes", () => {
    expect(router.routes[0]?.path).toBe("/");
    expect(router.routes[1]?.path).toBe("/home");
    expect(router.routes[2]?.path).toBe("/workspace/:appName");
  });
});
