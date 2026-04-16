import type { PropsWithChildren } from "react";
import { Layout, Menu, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { microApps } from "@/features/micro-app/apps";

type ShellLayoutProps = PropsWithChildren<{
  title: string;
  subtitle: string;
}>;

export function ShellLayout({ title, subtitle, children }: ShellLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Layout style={{ minHeight: "100%" }}>
      <Layout.Sider width={240} theme="light">
        <div style={{ padding: 20 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            微前端基座
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            micro-app shell
          </Typography.Paragraph>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={[
            { key: "/home", label: "首页" },
            ...microApps.map((item) => ({
              key: item.activePath,
              label: item.title,
            })),
          ]}
          onClick={({ key }) => navigate(key)}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: "#fff", borderBottom: "1px solid #f0f0f0", padding: "0 24px" }}>
          <Typography.Title level={4} style={{ margin: "16px 0 0" }}>
            {title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginTop: 4 }}>
            {subtitle}
          </Typography.Paragraph>
        </Layout.Header>
        <Layout.Content style={{ padding: 24 }}>{children}</Layout.Content>
      </Layout>
    </Layout>
  );
}
