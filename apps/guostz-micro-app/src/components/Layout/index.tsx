import { Layout, Menu, Typography } from "antd";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { microApps } from "@/app/micro-app-config";

export function ShellLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Layout.Sider width={240} theme="light">
        <div style={{ padding: 20 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            标题
          </Typography.Title>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            { key: "/home", label: "首页" },
            ...microApps.map((item) => ({
              key: item.baseroute,
              label: item.name,
            })),
          ]}
          onClick={({ key }) => navigate(key)}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "0 24px" }}>
        </Layout.Header>
        <Layout.Content style={{ padding: 16 }}>
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
