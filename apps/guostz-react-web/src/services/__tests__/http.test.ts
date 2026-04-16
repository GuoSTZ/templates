import { describe, expect, it } from "vitest";

import { http } from "@/services/http";

describe("http", () => {
  it("sets default timeout", () => {
    expect(http.defaults.timeout).toBe(10000);
  });
});
