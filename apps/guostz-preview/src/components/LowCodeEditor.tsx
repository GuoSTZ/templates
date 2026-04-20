import {
  DeleteOutlined,
  EyeOutlined,
  MobileOutlined,
  PlusOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  ColorPicker,
  Divider,
  Empty,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  Segmented,
  Space,
  Tabs,
  Tag,
  Typography,
  message,
  theme,
} from "antd";
import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";

import {
  componentLibrary,
  componentMap,
  initialComponents,
  type ComponentDefinition,
  type ComponentField,
  type ComponentSchema,
  type ComponentType,
} from "@/config/componentLibrary";

const { Header, Sider, Content } = Layout;

function isHexColor(value: string | number | boolean) {
  return typeof value === "string" && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value);
}

function moveItem(list: ComponentSchema[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function CanvasCard({
  definition,
  schema,
  selected,
  onSelect,
}: {
  definition: ComponentDefinition;
  schema: ComponentSchema;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      aria-pressed={selected}
      className={selected ? "canvas-block is-selected" : "canvas-block"}
      onClick={onSelect}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="canvas-block__toolbar">
        <Tag color="purple">{definition.group}</Tag>
        <span>{definition.title}</span>
      </div>
      <div className="canvas-block__content">{definition.render(schema.props)}</div>
    </div>
  );
}

function renderField(
  field: ComponentField,
  value: string | number | boolean,
  onChange: (nextValue: string | number | boolean) => void,
) {
  if (field.type === "text") {
    return (
      <Input
        placeholder={field.placeholder}
        value={String(value)}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <Input.TextArea
        placeholder={field.placeholder}
        rows={field.rows ?? 4}
        value={String(value)}
        onChange={(event: ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
      />
    );
  }

  if (field.type === "number") {
    return (
      <InputNumber
        max={field.max}
        min={field.min}
        step={field.step}
        style={{ width: "100%" }}
        value={Number(value)}
        onChange={(nextValue: number | null) => onChange(Number(nextValue ?? field.min ?? 0))}
      />
    );
  }

  if (field.type === "switch") {
    return (
      <Segmented
        options={[
          { label: "是", value: "true" },
          { label: "否", value: "false" },
        ]}
        value={Boolean(value) ? "true" : "false"}
        onChange={(nextValue: string | number) => onChange(nextValue === "true")}
      />
    );
  }

  if (field.type === "select") {
    return (
      <Segmented
        block
        options={field.options}
        value={String(value)}
        onChange={(nextValue: string | number) => onChange(String(nextValue))}
      />
    );
  }

  if (field.type === "color") {
    return (
      <ColorPicker
        format="hex"
        showText
        value={isHexColor(value) ? String(value) : "#7c3aed"}
        onChange={(nextColor) => onChange(nextColor.toHexString())}
      />
    );
  }

  return null;
}

export function LowCodeEditor() {
  const { token } = theme.useToken();
  const [components, setComponents] = useState<ComponentSchema[]>(initialComponents);
  const [selectedId, setSelectedId] = useState<string>(initialComponents[0]?.id ?? "");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [api, contextHolder] = message.useMessage();

  const groups: Array<ComponentDefinition["group"]> = ["自定义组件", "Ant Design"];
  const groupedLibrary = useMemo(
    () =>
      groups.map((group: ComponentDefinition["group"]) => ({
        group,
        items: componentLibrary.filter((item: ComponentDefinition) => item.group === group),
      })),
    [groups],
  );

  const selectedSchema = components.find((item: ComponentSchema) => item.id === selectedId) ?? null;
  const selectedDefinition = selectedSchema ? componentMap[selectedSchema.type] : null;
  const selectedIndex = selectedSchema ? components.findIndex((item: ComponentSchema) => item.id === selectedSchema.id) : -1;
  const schemaJson = JSON.stringify(components, null, 2);

  const addComponent = (type: ComponentType) => {
    const definition = componentMap[type];
    const schema = definition.create();
    setComponents((current: ComponentSchema[]) => [...current, schema]);
    setSelectedId(schema.id);
    api.success(`已添加 ${definition.title}`);
  };

  const updateProps = (key: string, value: string | number | boolean) => {
    setComponents((current: ComponentSchema[]) =>
      current.map((item: ComponentSchema) => {
        if (item.id !== selectedId) {
          return item;
        }

        return {
          ...item,
          props: {
            ...item.props,
            [key]: value,
          },
        };
      }),
    );
  };

  const removeSelected = () => {
    if (!selectedSchema) {
      return;
    }

    const next = components.filter((item: ComponentSchema) => item.id !== selectedSchema.id);
    setComponents(next);
    setSelectedId(next[0]?.id ?? "");
    api.info(`已删除 ${selectedDefinition?.title ?? "组件"}`);
  };

  const moveSelected = (direction: "up" | "down") => {
    if (!selectedSchema || selectedIndex < 0) {
      return;
    }

    const targetIndex = direction === "up" ? selectedIndex - 1 : selectedIndex + 1;

    if (targetIndex < 0 || targetIndex >= components.length) {
      return;
    }

    setComponents((current: ComponentSchema[]) => moveItem(current, selectedIndex, targetIndex));
  };

  return (
    <>
      {contextHolder}
      <Layout className="editor-shell">
        <Header className="editor-header">
          <div>
            <Typography.Text className="editor-kicker">Guostz Preview</Typography.Text>
            <Typography.Title level={3} style={{ color: "#f8fafc", margin: 0 }}>
              低代码页面搭建台
            </Typography.Title>
          </div>

          <Space align="center" size={12}>
            <Segmented
              options={[
                {
                  icon: <EyeOutlined />,
                  label: "桌面",
                  value: "desktop",
                },
                {
                  icon: <MobileOutlined />,
                  label: "移动",
                  value: "mobile",
                },
              ]}
              value={device}
              onChange={(value: string | number) => setDevice(value as "desktop" | "mobile")}
            />
            <Tag color="purple">{components.length} 个组件</Tag>
          </Space>
        </Header>

        <Layout>
          <Sider className="editor-sider editor-sider--left" width={320}>
            <div className="panel-title-row">
              <Typography.Title level={4} style={{ margin: 0 }}>
                组件库
              </Typography.Title>
              <Typography.Text type="secondary">左侧提供 Ant Design 组件和自定义业务组件</Typography.Text>
            </div>

            <Tabs
              defaultActiveKey="0"
              items={groupedLibrary.map((group, index: number) => ({
                key: String(index),
                label: group.group,
                children: (
                  <Space orientation="vertical" size={12} style={{ width: "100%" }}>
                    {group.items.map((item: ComponentDefinition) => (
                      <Card key={item.type} className="library-card" size="small">
                        <Flex align="flex-start" gap={12} justify="space-between">
                          <Space align="start" size={12}>
                            <div className="library-card__icon">{item.icon}</div>
                            <Space orientation="vertical" size={4}>
                              <Typography.Text strong>{item.title}</Typography.Text>
                              <Typography.Text type="secondary">{item.description}</Typography.Text>
                            </Space>
                          </Space>
                          <Button icon={<PlusOutlined />} type="primary" onClick={() => addComponent(item.type)}>
                            添加
                          </Button>
                        </Flex>
                      </Card>
                    ))}
                  </Space>
                ),
              }))}
            />
          </Sider>

          <Content className="editor-content">
            <div className="canvas-toolbar">
              <Space wrap>
                <Button disabled={!selectedSchema || selectedIndex <= 0} icon={<VerticalAlignTopOutlined />} onClick={() => moveSelected("up")}>
                  上移
                </Button>
                <Button
                  disabled={!selectedSchema || selectedIndex === -1 || selectedIndex >= components.length - 1}
                  icon={<VerticalAlignBottomOutlined />}
                  onClick={() => moveSelected("down")}
                >
                  下移
                </Button>
                <Button danger disabled={!selectedSchema} icon={<DeleteOutlined />} onClick={removeSelected}>
                  删除当前组件
                </Button>
              </Space>
              <Typography.Text type="secondary">点击画布中的区块即可在右侧编辑它的属性</Typography.Text>
            </div>

            <div className={device === "desktop" ? "canvas-device canvas-device--desktop" : "canvas-device canvas-device--mobile"}>
              <div className="canvas-stage">
                <div className="canvas-stage__grid" />
                <div className="canvas-page">
                  {components.length > 0 ? (
                    <Space orientation="vertical" size={18} style={{ width: "100%" }}>
                      {components.map((schema: ComponentSchema) => {
                        const definition = componentMap[schema.type];

                        return (
                          <CanvasCard
                            definition={definition}
                            key={schema.id}
                            schema={schema}
                            selected={schema.id === selectedId}
                            onSelect={() => setSelectedId(schema.id)}
                          />
                        );
                      })}
                    </Space>
                  ) : (
                    <Empty description="画布为空，请从左侧添加组件" image={Empty.PRESENTED_IMAGE_SIMPLE} />
                  )}
                </div>
              </div>
            </div>
          </Content>

          <Sider className="editor-sider editor-sider--right" width={360}>
            <div className="panel-title-row">
              <Typography.Title level={4} style={{ margin: 0 }}>
                配置面板
              </Typography.Title>
              <Typography.Text type="secondary">右侧根据当前选中组件动态渲染配置表单</Typography.Text>
            </div>

            {selectedSchema && selectedDefinition ? (
              <>
                <Card size="small" style={{ background: token.colorBgElevated, marginBottom: 16 }}>
                  <Space orientation="vertical" size={6}>
                    <Tag color="purple">{selectedDefinition.group}</Tag>
                    <Typography.Title level={5} style={{ margin: 0 }}>
                      {selectedDefinition.title}
                    </Typography.Title>
                    <Typography.Text type="secondary">{selectedDefinition.description}</Typography.Text>
                  </Space>
                </Card>

                <Form layout="vertical">
                  {selectedDefinition.fields.map((field: ComponentField) => (
                    <Form.Item key={field.key} label={field.label}>
                      {renderField(field, selectedSchema.props[field.key], (nextValue) => updateProps(field.key, nextValue))}
                    </Form.Item>
                  ))}
                </Form>

                <Divider />

                <Typography.Title level={5}>页面 Schema</Typography.Title>
                <Input.TextArea autoSize={{ maxRows: 18, minRows: 10 }} readOnly value={schemaJson} />
              </>
            ) : (
              <Empty description="请先从画布中选中一个组件" image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Sider>
        </Layout>
      </Layout>
    </>
  );
}
