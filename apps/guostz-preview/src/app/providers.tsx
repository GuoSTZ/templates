import type { PropsWithChildren } from "react";

import { App as AntdApp, ConfigProvider, theme } from "antd";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#7c3aed",
          borderRadius: 14,
          colorBgBase: "#0b1020",
          colorTextBase: "#f8fafc",
          fontFamily: '"PingFang SC", "Microsoft YaHei", sans-serif',
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
