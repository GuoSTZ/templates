import { Layout, Menu, Typography, Select, Space, theme } from "antd";
import { useLocation, useNavigate, Outlet } from "react-router-dom";

import { microApps } from "@/app/micro-app-config";
import { useTheme } from "@/app/ThemeContext";
import type { ThemeType } from "@/app/theme";

export function ShellLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeType, setThemeType } = useTheme();
  // 提取当前主题下的真实 Token，用于动态绑定 Layout 样式
  const { token } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Sider
        width={240}
        theme={themeType === "light" ? "light" : "dark"}
        style={{
          borderRight: `1px solid ${token.colorBorderSecondary}`,
          background: themeType === "light" ? token.colorBgContainer : token.colorBgLayout,
        }}
      >
        <div style={{ padding: 20 }}>
          <Typography.Title level={4} style={{ margin: 0 }}>
            标题
          </Typography.Title>
        </div>
        <Menu
          theme={themeType === "light" ? "light" : "dark"}
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
          style={{
            borderRight: 0,
            background: "transparent",
          }}
        />
      </Layout.Sider>
      <Layout>
        <Layout.Header
          style={{
            background: token.colorBgContainer,
            borderBottom: `1px solid ${token.colorBorderSecondary}`,
            padding: "0 24px",
            display: "flex",
            justifyContent: "flex-end", // 将切换器放到右侧
            alignItems: "center",
          }}
        >
          <Space>
            <Typography.Text>切换主题:</Typography.Text>
            <Select<ThemeType>
              value={themeType}
              onChange={(value) => setThemeType(value)}
              options={[
                { value: "light", label: "默认亮色" },
                { value: "dark", label: "极客暗黑" },
                { value: "scifi", label: "赛博科幻" },
              ]}
              style={{ width: 120 }}
            />
          </Space>
        </Layout.Header>
        <Layout.Content
          style={{
            padding: 16,
            background: token.colorBgLayout, // 动态适应背景
            overflow: "auto",
          }}
        >
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
