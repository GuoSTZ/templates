import { Button, Table, Tag } from "antd";
import type { TableColumnsType } from "antd";
import { useNavigate } from "react-router-dom";

import { demoRecords } from "@/features/demo/data";
import type { DemoRecord } from "@/features/demo/types";

const columns: TableColumnsType<DemoRecord> = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "名称", dataIndex: "name", key: "name" },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    render: (value: DemoRecord["status"]) =>
      value === "enabled" ? <Tag color="success">启用</Tag> : <Tag color="default">停用</Tag>,
  },
  { title: "负责人", dataIndex: "owner", key: "owner" },
];

export default function DemoListPage() {
  const navigate = useNavigate();

  return (
    <div>
      <Button type="primary" onClick={() => navigate("/demo/form")}>
        前往表单
      </Button>
      <Table rowKey="id" columns={columns} dataSource={demoRecords} pagination={false} />
    </div>
  );
}
