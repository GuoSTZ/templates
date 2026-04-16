import { describe, expect, it } from "vitest";

import { getDefaultApp, getMicroAppByName } from "@/features/micro-app/helpers";

describe("micro app helpers", () => {
  it("returns the first registered app as default", () => {
    expect(getDefaultApp()?.name).toBe("dashboard");
  });

  it("finds a micro app by route name", () => {
    expect(getMicroAppByName("dashboard")?.activePath).toBe("/workspace/dashboard");
  });
});
