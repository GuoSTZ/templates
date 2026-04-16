import { Button, Card, List, Space, Tag, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { microApps } from "@/features/micro-app/apps";
import { ShellLayout } from "@/shared/ui/shell-layout";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <ShellLayout title="基座首页" subtitle="统一维护子应用导航、挂载与接入入口">
      <Space direction="vertical" size={16} style={{ display: "flex" }}>
        <Card>
          <Typography.Paragraph>
            当前模板只实现微前端基座壳应用，你可以先替换注册表里的入口地址，再接入真实子应用。
          </Typography.Paragraph>
        </Card>
        <Card title="已注册应用">
          <List
            dataSource={microApps}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button key={item.name} type="primary" onClick={() => navigate(item.activePath)}>
                    进入工作台
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={
                    <Space>
                      <span>{item.title}</span>
                      <Tag color="blue">{item.name}</Tag>
                    </Space>
                  }
                  description={item.description}
                />
              </List.Item>
            )}
          />
        </Card>
      </Space>
    </ShellLayout>
  );
}
