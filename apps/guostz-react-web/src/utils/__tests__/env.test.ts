import { describe, expect, it } from "vitest";

import { getApiBaseUrl, getMicroAppBaseroute } from "@/shared/utils/env";

describe("env utils", () => {
  it("returns configured VITE_API_BASE_URL", () => {
    expect(getApiBaseUrl()).toBeTypeOf("string");
  });

  it("returns the default micro-app baseroute", () => {
    expect(getMicroAppBaseroute()).toBe("/react-web");
  });
});
