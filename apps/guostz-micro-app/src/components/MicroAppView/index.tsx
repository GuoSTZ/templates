import { Empty, Spin } from "antd";

export type MicroAppConfig = {
  name: string;
  url: string;
  baseroute: string;
  iframe?: boolean;
};

export function MicroAppView(props: MicroAppConfig) {
  const { name, url, baseroute, ...restProps } = props;
  if (!props.name) {
    return <Empty description="未找到子应用配置" />;
  }

  return (
    <section style={{ minHeight: "100%", background: "#fff", borderRadius: 16, padding: 16 }}>
      <Spin spinning={false} description="子应用加载中">
        <micro-app
          {...restProps}
          name={name}
          url={url}
          baseroute={baseroute}
          disable-memory-router
          data={{
            from: "guostz-micro-app",
            token: "",
            theme: "light",
            user: { name: "Guest" },
          }}
        />
      </Spin>
    </section>
  );
}
