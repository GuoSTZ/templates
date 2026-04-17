import { describe, expect, it } from "vitest";

import { getDefaultSubAppEntry } from "@/shared/utils/env";

describe("getDefaultSubAppEntry", () => {
  it("returns configured VITE_DEFAULT_SUB_APP_ENTRY", () => {
    expect(getDefaultSubAppEntry()).toBe("/child-app-test/");
  });
});
