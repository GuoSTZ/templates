import { describe, expect, it } from "vitest";

import config from "../../../vite.config";

describe("vite config", () => {
  it("sets dev server port to 9000", () => {
    expect(config.server?.port).toBe(9000);
  });
});
