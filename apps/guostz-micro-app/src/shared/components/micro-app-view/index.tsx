import { Empty, Spin } from "antd";

import type { MicroAppConfig } from "@/features/micro-app/types";

type MicroAppViewProps = {
  app: MicroAppConfig | null;
};

export function MicroAppView({ app }: MicroAppViewProps) {
  if (!app) {
    return <Empty description="未找到子应用配置" />;
  }

  return (
    <section style={{ minHeight: "100%", background: "#fff", borderRadius: 16, padding: 16 }}>
      <Spin spinning={false} description="子应用加载中">
        <micro-app
          name={app.name}
          url={app.entry}
          baseroute={app.baseroute}
          disable-memory-router
          data={JSON.stringify({
            from: "guostz-micro-app",
            token: "",
            theme: "light",
            user: { name: "Guest" },
          })}
        />
      </Spin>
    </section>
  );
}
