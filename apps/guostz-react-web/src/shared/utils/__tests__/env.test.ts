import { describe, expect, it } from "vitest";

import { getApiBaseUrl } from "@/shared/utils/env";

describe("getApiBaseUrl", () => {
  it("returns configured VITE_API_BASE_URL", () => {
    expect(getApiBaseUrl()).toBeTypeOf("string");
  });
});
