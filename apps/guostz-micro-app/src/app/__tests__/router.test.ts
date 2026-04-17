import { describe, expect, it } from "vitest";

import { router } from "@/router";

describe("router", () => {
  it("defines the shell route and nested home/workspace routes", () => {
    expect(router.routes[0]?.path).toBe("/");
    expect(router.routes[0]?.children?.[0]?.index).toBe(true);
    expect(router.routes[0]?.children?.[1]?.path).toBe("home");
    expect(router.routes[0]?.children?.[2]?.path).toBe("workspace/:appName/*");
    expect(router.routes[1]?.path).toBe("*");
  });

  it("keeps matching workspace routes after refreshing a child app deep link", () => {
    expect(router.routes[0]?.children?.[2]?.path).toBe("workspace/:appName/*");
  });
});
