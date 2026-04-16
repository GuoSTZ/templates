import type { PropsWithChildren, ReactNode } from "react";
import { Layout, Typography } from "antd";

type PageContainerProps = PropsWithChildren<{
  title: string;
  extra?: ReactNode;
}>;

export function PageContainer({ title, extra, children }: PageContainerProps) {
  return (
    <Layout style={{ minHeight: "100%" }}>
      <Layout.Content style={{ padding: 24 }}>
        <section style={{ maxWidth: 1080, margin: "0 auto" }}>
          <header
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
              marginBottom: 16,
            }}
          >
            <Typography.Title level={3} style={{ margin: 0 }}>
              {title}
            </Typography.Title>
            {extra}
          </header>
          {children}
        </section>
      </Layout.Content>
    </Layout>
  );
}
