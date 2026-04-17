import { Button, Card, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

type DemoFormValues = {
  name: string;
  owner: string;
  status: "enabled" | "disabled";
};

export default function DemoFormPage() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  function handleFinish(values: DemoFormValues) {
    void messageApi.success(`已提交：${values.name}`);
  }

  return (
    <div>
      {contextHolder}
      <Button onClick={() => navigate("/demo/list")}>返回列表</Button>
      <Card>
        <Form layout="vertical" onFinish={handleFinish}>
          <Form.Item label="名称" name="name" rules={[{ required: true, message: "请输入名称" }]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="负责人" name="owner" rules={[{ required: true, message: "请输入负责人" }]}>
            <Input placeholder="请输入负责人" />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            initialValue="enabled"
            rules={[{ required: true, message: "请选择状态" }]}
          >
            <Select
              options={[
                { label: "启用", value: "enabled" },
                { label: "停用", value: "disabled" },
              ]}
            />
          </Form.Item>
          <Button htmlType="submit" type="primary">
            提交
          </Button>
        </Form>
      </Card>
    </div>
  );
}
