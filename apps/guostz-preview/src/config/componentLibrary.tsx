import {
  AppstoreAddOutlined,
  BarsOutlined,
  BorderOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  EditOutlined,
  FontSizeOutlined,
  NotificationOutlined,
  PictureOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  DatePicker,
  Image,
  Input,
  Select,
  Space,
  Tag,
  Typography,
} from "antd";
import type { ReactNode } from "react";

type BaseField = {
  key: string;
  label: string;
};

type TextField = BaseField & {
  type: "text";
  placeholder?: string;
};

type TextAreaField = BaseField & {
  type: "textarea";
  placeholder?: string;
  rows?: number;
};

type NumberField = BaseField & {
  type: "number";
  min?: number;
  max?: number;
  step?: number;
};

type SwitchField = BaseField & {
  type: "switch";
};

type SelectField = BaseField & {
  type: "select";
  options: Array<{
    label: string;
    value: string;
  }>;
};

type ColorField = BaseField & {
  type: "color";
};

export type ComponentField =
  | TextField
  | TextAreaField
  | NumberField
  | SwitchField
  | SelectField
  | ColorField;

export type ComponentType =
  | "heroBanner"
  | "statCard"
  | "announcement"
  | "featureList"
  | "imageCard"
  | "primaryButton"
  | "textBlock"
  | "inputField"
  | "selectField"
  | "dateField"
  | "checkboxField";

export type ComponentSchema = {
  id: string;
  type: ComponentType;
  props: Record<string, string | number | boolean>;
};

export type ComponentDefinition = {
  type: ComponentType;
  group: "Ant Design" | "自定义组件";
  title: string;
  description: string;
  icon: ReactNode;
  fields: ComponentField[];
  create: () => ComponentSchema;
  render: (props: Record<string, string | number | boolean>) => ReactNode;
};

const presetImages = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
];

function createId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

export const componentLibrary: ComponentDefinition[] = [
  {
    type: "heroBanner",
    group: "自定义组件",
    title: "运营横幅",
    description: "适合活动页头图、标题和行动入口。",
    icon: <AppstoreAddOutlined />,
    fields: [
      { key: "eyebrow", label: "标签", type: "text" },
      { key: "title", label: "标题", type: "text" },
      { key: "subtitle", label: "副标题", type: "textarea", rows: 3 },
      { key: "buttonText", label: "按钮文案", type: "text" },
      {
        key: "buttonType",
        label: "按钮风格",
        type: "select",
        options: [
          { label: "主按钮", value: "primary" },
          { label: "默认", value: "default" },
          { label: "虚线", value: "dashed" },
        ],
      },
      { key: "background", label: "背景色", type: "color" },
    ],
    create: () => ({
      id: createId("hero"),
      type: "heroBanner",
      props: {
        eyebrow: "低代码搭建",
        title: "让业务页面在 10 分钟内上线",
        subtitle: "通过左侧组件库选型、中间实时预览、右侧属性改配，快速完成页面搭建。",
        buttonText: "立即发布",
        buttonType: "primary",
        background: "#7c3aed",
      },
    }),
    render: (props) => (
      <section
        style={{
          background: `linear-gradient(135deg, ${String(props.background)} 0%, #111827 100%)`,
          borderRadius: 28,
          color: "#f8fafc",
          padding: 28,
        }}
      >
        <Space orientation="vertical" size={10} style={{ width: "100%" }}>
          <Tag color="rgba(255,255,255,0.16)" style={{ color: "#f8fafc", width: "fit-content" }} variant="filled">
            {String(props.eyebrow)}
          </Tag>
          <Typography.Title level={2} style={{ color: "#ffffff", margin: 0 }}>
            {String(props.title)}
          </Typography.Title>
          <Typography.Paragraph style={{ color: "rgba(248,250,252,0.82)", margin: 0, maxWidth: 560 }}>
            {String(props.subtitle)}
          </Typography.Paragraph>
          <Button size="large" style={{ width: "fit-content" }} type={props.buttonType as "primary" | "default" | "dashed"}>
            {String(props.buttonText)}
          </Button>
        </Space>
      </section>
    ),
  },
  {
    type: "statCard",
    group: "自定义组件",
    title: "指标卡片",
    description: "展示重点数值、趋势和状态。",
    icon: <BorderOutlined />,
    fields: [
      { key: "title", label: "标题", type: "text" },
      { key: "value", label: "数值", type: "text" },
      { key: "trend", label: "趋势", type: "text" },
      {
        key: "tagColor",
        label: "标签颜色",
        type: "select",
        options: [
          { label: "绿色", value: "success" },
          { label: "蓝色", value: "processing" },
          { label: "金色", value: "warning" },
          { label: "红色", value: "error" },
        ],
      },
    ],
    create: () => ({
      id: createId("stat"),
      type: "statCard",
      props: {
        title: "本周新增线索",
        value: "1,284",
        trend: "+18.6%",
        tagColor: "success",
      },
    }),
    render: (props) => (
      <Card styles={{ body: { padding: 24 } }}>
        <Space orientation="vertical" size={8} style={{ width: "100%" }}>
          <Typography.Text type="secondary">{String(props.title)}</Typography.Text>
          <Typography.Title level={2} style={{ margin: 0 }}>
            {String(props.value)}
          </Typography.Title>
          <Tag color={String(props.tagColor)} style={{ width: "fit-content" }}>
            {String(props.trend)}
          </Tag>
        </Space>
      </Card>
    ),
  },
  {
    type: "announcement",
    group: "自定义组件",
    title: "公告栏",
    description: "适合运营通知、系统提醒和发布说明。",
    icon: <NotificationOutlined />,
    fields: [
      { key: "message", label: "公告内容", type: "textarea", rows: 3 },
      {
        key: "kind",
        label: "类型",
        type: "select",
        options: [
          { label: "信息", value: "info" },
          { label: "成功", value: "success" },
          { label: "警告", value: "warning" },
          { label: "错误", value: "error" },
        ],
      },
      { key: "showIcon", label: "显示图标", type: "switch" },
    ],
    create: () => ({
      id: createId("notice"),
      type: "announcement",
      props: {
        message: "编辑器支持左侧添加组件，在右侧动态修改配置。",
        kind: "info",
        showIcon: true,
      },
    }),
    render: (props) => (
      <Alert
        description={String(props.message)}
        title="系统公告"
        showIcon={Boolean(props.showIcon)}
        type={props.kind as "info" | "success" | "warning" | "error"}
      />
    ),
  },
  {
    type: "featureList",
    group: "自定义组件",
    title: "能力列表",
    description: "用于说明卖点、交付能力或流程步骤。",
    icon: <BarsOutlined />,
    fields: [
      { key: "title", label: "标题", type: "text" },
      { key: "items", label: "条目", type: "textarea", rows: 5 },
      { key: "accent", label: "强调色", type: "color" },
    ],
    create: () => ({
      id: createId("feature"),
      type: "featureList",
      props: {
        title: "交付能力",
        items: "可视化搭建\n页面预览\n属性配置\nSchema 导出",
        accent: "#22c55e",
      },
    }),
    render: (props) => {
      const items = String(props.items)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean);

      return (
        <Card styles={{ body: { padding: 24 } }}>
          <Space orientation="vertical" size={14} style={{ width: "100%" }}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {String(props.title)}
            </Typography.Title>
            <Space orientation="vertical" size={12} style={{ width: "100%" }}>
              {items.map((item) => (
                <div
                  key={item}
                  style={{
                    alignItems: "center",
                    display: "flex",
                    gap: 12,
                  }}
                >
                  <span
                    style={{
                      background: String(props.accent),
                      borderRadius: 999,
                      display: "inline-block",
                      flex: "0 0 10px",
                      height: 10,
                    }}
                  />
                  <Typography.Text>{item}</Typography.Text>
                </div>
              ))}
            </Space>
          </Space>
        </Card>
      );
    },
  },
  {
    type: "imageCard",
    group: "自定义组件",
    title: "图文卡片",
    description: "适合展示能力说明、案例和产品专题。",
    icon: <PictureOutlined />,
    fields: [
      { key: "title", label: "标题", type: "text" },
      { key: "description", label: "描述", type: "textarea", rows: 4 },
      {
        key: "imageUrl",
        label: "图片",
        type: "select",
        options: presetImages.map((item, index) => ({
          label: `图片 ${index + 1}`,
          value: item,
        })),
      },
    ],
    create: () => ({
      id: createId("image"),
      type: "imageCard",
      props: {
        title: "组件协议统一管理",
        description: "组件渲染、属性面板和默认值都在同一份协议里维护，方便持续扩展。",
        imageUrl: presetImages[0],
      },
    }),
    render: (props) => (
      <Card cover={<Image alt={String(props.title)} preview={false} src={String(props.imageUrl)} style={{ height: 220, objectFit: "cover" }} />}>
        <Card.Meta description={String(props.description)} title={String(props.title)} />
      </Card>
    ),
  },
  {
    type: "primaryButton",
    group: "Ant Design",
    title: "按钮",
    description: "支持按钮风格、禁用和整行模式。",
    icon: <EditOutlined />,
    fields: [
      { key: "label", label: "按钮文案", type: "text" },
      {
        key: "typeStyle",
        label: "按钮类型",
        type: "select",
        options: [
          { label: "主按钮", value: "primary" },
          { label: "默认", value: "default" },
          { label: "虚线", value: "dashed" },
          { label: "文本", value: "text" },
        ],
      },
      { key: "block", label: "整行宽度", type: "switch" },
      { key: "disabled", label: "禁用", type: "switch" },
    ],
    create: () => ({
      id: createId("button"),
      type: "primaryButton",
      props: {
        label: "提交审批",
        typeStyle: "primary",
        block: false,
        disabled: false,
      },
    }),
    render: (props) => (
      <Button block={Boolean(props.block)} disabled={Boolean(props.disabled)} type={props.typeStyle as "primary" | "default" | "dashed" | "text"}>
        {String(props.label)}
      </Button>
    ),
  },
  {
    type: "textBlock",
    group: "Ant Design",
    title: "文本",
    description: "渲染段落文案，可修改字号与颜色。",
    icon: <FontSizeOutlined />,
    fields: [
      { key: "content", label: "文本内容", type: "textarea", rows: 4 },
      { key: "size", label: "字号", type: "number", max: 32, min: 12, step: 1 },
      { key: "color", label: "颜色", type: "color" },
    ],
    create: () => ({
      id: createId("text"),
      type: "textBlock",
      props: {
        content: "这是一个可配置的文本文案区块，适合填写说明、运营话术或产品介绍。",
        size: 15,
        color: "#cbd5e1",
      },
    }),
    render: (props) => (
      <Typography.Paragraph style={{ color: String(props.color), fontSize: Number(props.size), margin: 0 }}>
        {String(props.content)}
      </Typography.Paragraph>
    ),
  },
  {
    type: "inputField",
    group: "Ant Design",
    title: "输入框",
    description: "适合单行文本表单录入。",
    icon: <EditOutlined />,
    fields: [
      { key: "label", label: "字段标题", type: "text" },
      { key: "placeholder", label: "占位文案", type: "text" },
      { key: "required", label: "是否必填", type: "switch" },
    ],
    create: () => ({
      id: createId("input"),
      type: "inputField",
      props: {
        label: "客户姓名",
        placeholder: "请输入客户姓名",
        required: true,
      },
    }),
    render: (props) => (
      <Space orientation="vertical" size={8} style={{ width: "100%" }}>
        <Typography.Text>
          {String(props.label)}
          {Boolean(props.required) ? " *" : ""}
        </Typography.Text>
        <Input placeholder={String(props.placeholder)} />
      </Space>
    ),
  },
  {
    type: "selectField",
    group: "Ant Design",
    title: "下拉框",
    description: "支持配置标签和多项下拉选项。",
    icon: <BarsOutlined />,
    fields: [
      { key: "label", label: "字段标题", type: "text" },
      { key: "optionsText", label: "选项列表", type: "textarea", rows: 4 },
      { key: "placeholder", label: "占位文案", type: "text" },
    ],
    create: () => ({
      id: createId("select"),
      type: "selectField",
      props: {
        label: "所属行业",
        optionsText: "互联网\n零售\n教育\n医疗",
        placeholder: "请选择所属行业",
      },
    }),
    render: (props) => {
      const options = String(props.optionsText)
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => ({
          label: item,
          value: item,
        }));

      return (
        <Space orientation="vertical" size={8} style={{ width: "100%" }}>
          <Typography.Text>{String(props.label)}</Typography.Text>
          <Select options={options} placeholder={String(props.placeholder)} style={{ width: "100%" }} />
        </Space>
      );
    },
  },
  {
    type: "dateField",
    group: "Ant Design",
    title: "日期选择",
    description: "用于预约、排期和活动时间选择。",
    icon: <CalendarOutlined />,
    fields: [
      { key: "label", label: "字段标题", type: "text" },
      { key: "placeholder", label: "占位文案", type: "text" },
      { key: "showTime", label: "显示时间", type: "switch" },
    ],
    create: () => ({
      id: createId("date"),
      type: "dateField",
      props: {
        label: "预计上线时间",
        placeholder: "请选择时间",
        showTime: false,
      },
    }),
    render: (props) => (
      <Space orientation="vertical" size={8} style={{ width: "100%" }}>
        <Typography.Text>{String(props.label)}</Typography.Text>
        <DatePicker placeholder={String(props.placeholder)} showTime={Boolean(props.showTime)} style={{ width: "100%" }} />
      </Space>
    ),
  },
  {
    type: "checkboxField",
    group: "Ant Design",
    title: "勾选框",
    description: "适合协议确认、选项确认等场景。",
    icon: <CheckSquareOutlined />,
    fields: [
      { key: "label", label: "文案", type: "text" },
      { key: "checked", label: "默认选中", type: "switch" },
    ],
    create: () => ({
      id: createId("checkbox"),
      type: "checkboxField",
      props: {
        label: "我已阅读并同意活动规则",
        checked: true,
      },
    }),
    render: (props) => <Checkbox checked={Boolean(props.checked)}>{String(props.label)}</Checkbox>,
  },
];

export const componentMap = Object.fromEntries(componentLibrary.map((item) => [item.type, item])) as Record<
  ComponentType,
  ComponentDefinition
>;

export const initialComponents: ComponentSchema[] = [
  componentMap.heroBanner.create(),
  componentMap.announcement.create(),
  componentMap.featureList.create(),
  componentMap.statCard.create(),
  componentMap.inputField.create(),
  componentMap.primaryButton.create(),
];
