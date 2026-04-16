import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MicroAppView } from "@/shared/components/micro-app-view";

describe("MicroAppView", () => {
  it("renders empty state when app config is missing", () => {
    render(<MicroAppView app={null} />);

    expect(screen.getByText("未找到子应用配置")).toBeInTheDocument();
  });

  it("renders a micro-app element when app config exists", () => {
    const { container } = render(
      <MicroAppView
        app={{
          name: "dashboard",
          title: "运营看板",
          description: "demo",
          entry: "/child-app/",
          activePath: "/workspace/dashboard",
          baseroute: "/dashboard",
        }}
      />,
    );

    const element = container.querySelector("micro-app");

    expect(element).not.toBeNull();
    expect(element?.getAttribute("name")).toBe("dashboard");
    expect(element?.getAttribute("url")).toBe("/child-app/");
  });
});
