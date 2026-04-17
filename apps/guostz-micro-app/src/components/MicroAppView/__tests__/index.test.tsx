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
          name: "react-web",
          title: "React Web",
          description: "独立 SPA 改造后的演示子应用",
          entry: "/child/react-web/",
          activePath: "/workspace/react-web",
          baseroute: "/react-web",
        }}
      />,
    );

    const element = container.querySelector("micro-app");

    expect(element).not.toBeNull();
    expect(element?.getAttribute("name")).toBe("react-web");
    expect(element?.getAttribute("url")).toBe("/child/react-web/");
    expect(element?.getAttribute("baseroute")).toBe("/react-web");
    expect(element?.hasAttribute("iframe")).toBe(true);
    expect((element as HTMLElement & { data?: unknown })?.data).toEqual({
      from: "guostz-micro-app",
      token: "",
      theme: "light",
      user: { name: "Guest" },
    });
  });
});
