import { Card, Flex, Space, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import { microApps } from "@/app/micro-app-config";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Card title="已注册应用">
      {microApps.map((item) => (
        <Card.Grid key={item.name} hoverable style={{ width: "100%", cursor: "pointer" }} onClick={() => navigate(item.baseroute)}>
          <Space orientation="vertical" size={12} style={{ display: "flex" }}>
            <Flex align="center" gap={8}>
              <Typography.Text strong>{item.name}</Typography.Text>
            </Flex>
            <Typography.Text type="secondary">{item.url}</Typography.Text>
          </Space>
        </Card.Grid>
      ))}
    </Card>
  );
}
