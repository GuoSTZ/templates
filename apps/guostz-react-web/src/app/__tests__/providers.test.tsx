import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppProviders } from "@/app/providers";

describe("AppProviders", () => {
  it("renders children", () => {
    render(
      <AppProviders>
        <span>provider child</span>
      </AppProviders>,
    );

    expect(screen.getByText("provider child")).toBeInTheDocument();
  });
});
