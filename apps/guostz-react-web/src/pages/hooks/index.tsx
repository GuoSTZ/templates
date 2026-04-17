import {
  Suspense,
  createContext,
  forwardRef,
  memo,
  use,
  useActionState,
  useCallback,
  useContext,
  useDebugValue,
  useDeferredValue,
  useEffect,
  useId,
  useImperativeHandle,
  useInsertionEffect,
  useLayoutEffect,
  useMemo,
  useOptimistic,
  useReducer,
  useRef,
  useState,
  useSyncExternalStore,
  useTransition,
} from "react";
import { Alert, Button, Card, Divider, Form, Input, Space, Switch, Tag, Typography } from "antd";

type ThemeMode = "light" | "dark";
type ActionFormState = {
  status: "idle" | "success" | "error";
  message: string;
};
type FancyInputHandle = {
  focus: () => void;
  clear: () => void;
};

const { Title, Paragraph, Text } = Typography;
const ThemeContext = createContext<ThemeMode>("light");
const SearchSource = Array.from({ length: 1200 }, (_, index) => `Hook Item ${index + 1}`);
const PromiseDelay = 900;

let externalCounter = 0;
const externalListeners = new Set<() => void>();

function subscribeExternalCounter(listener: () => void) {
  externalListeners.add(listener);
  return () => {
    externalListeners.delete(listener);
  };
}

function getExternalCounterSnapshot() {
  return externalCounter;
}

function increaseExternalCounter() {
  externalCounter += 1;
  externalListeners.forEach((listener) => listener());
}

function HookCard({
  name,
  feature,
  children,
}: {
  name: string;
  feature: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      title={name}
      size="small"
      style={{
        marginBottom: 16,
      }}
    >
      <Paragraph
        type="secondary"
        style={{
          marginBottom: 12,
        }}
      >
        {feature}
      </Paragraph>
      {children}
    </Card>
  );
}

function UseStateDemo() {
  const [count, setCount] = useState(() => 1);

  return (
    <Space orientation="vertical">
      <Text>当前值：{count}</Text>
      <Space>
        <Button onClick={() => setCount((value) => value - 1)}>-1</Button>
        <Button type="primary" onClick={() => setCount((value) => value + 1)}>
          +1
        </Button>
        <Button onClick={() => setCount(1)}>重置</Button>
      </Space>
    </Space>
  );
}

function UseEffectDemo() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) {
      return undefined;
    }
    const timer = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);
    return () => {
      window.clearInterval(timer);
    };
  }, [running]);

  return (
    <Space orientation="vertical">
      <Text>计时：{seconds}s（展示副作用启动与清理）</Text>
      <Switch checked={running} onChange={setRunning} checkedChildren="运行中" unCheckedChildren="已暂停" />
    </Space>
  );
}

function ThemePanel() {
  const mode = useContext(ThemeContext);
  const styles = {
    background: mode === "light" ? "#f5f5f5" : "#1f1f1f",
    color: mode === "light" ? "#1f1f1f" : "#f5f5f5",
    borderRadius: 8,
    padding: 12,
  };

  return (
    <div style={styles}>
      <Text style={{ color: styles.color }}>当前主题来自 Context：{mode}</Text>
    </div>
  );
}

function UseContextDemo() {
  const [mode, setMode] = useState<ThemeMode>("light");

  return (
    <ThemeContext.Provider value={mode}>
      <Space orientation="vertical">
        <Switch
          checked={mode === "dark"}
          onChange={(checked) => setMode(checked ? "dark" : "light")}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />
        <ThemePanel />
      </Space>
    </ThemeContext.Provider>
  );
}

type ReducerAction = { type: "increment" } | { type: "decrement" } | { type: "reset" };

function counterReducer(state: number, action: ReducerAction) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    case "reset":
      return 0;
    default:
      return state;
  }
}

function UseReducerDemo() {
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <Space orientation="vertical">
      <Text>Reducer 状态：{count}</Text>
      <Space>
        <Button onClick={() => dispatch({ type: "decrement" })}>-1</Button>
        <Button type="primary" onClick={() => dispatch({ type: "increment" })}>
          +1
        </Button>
        <Button onClick={() => dispatch({ type: "reset" })}>重置</Button>
      </Space>
    </Space>
  );
}

function UseRefDemo() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const renderTimesRef = useRef(0);
  const [, forceRender] = useState(0);
  renderTimesRef.current += 1;

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <input
        ref={inputRef}
        placeholder="点击按钮聚焦我"
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: 6,
          padding: "6px 10px",
          width: "100%",
        }}
      />
      <Space>
        <Button onClick={() => inputRef.current?.focus()}>聚焦输入框</Button>
        <Button onClick={() => forceRender((value) => value + 1)}>触发重渲染</Button>
      </Space>
      <Text type="secondary">render 次数（存于 ref，不会触发重渲染）：{renderTimesRef.current}</Text>
    </Space>
  );
}

const FancyInput = forwardRef<FancyInputHandle>(function FancyInput(_, ref) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: () => inputRef.current?.focus(),
      clear: () => {
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
    }),
    [],
  );

  return (
    <input
      ref={inputRef}
      placeholder="父组件通过 ref 调用 focus/clear"
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: 6,
        padding: "6px 10px",
        width: "100%",
      }}
    />
  );
});

function UseImperativeHandleDemo() {
  const fancyRef = useRef<FancyInputHandle | null>(null);

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <FancyInput ref={fancyRef} />
      <Space>
        <Button onClick={() => fancyRef.current?.focus()}>父组件触发 focus</Button>
        <Button onClick={() => fancyRef.current?.clear()}>父组件触发 clear</Button>
      </Space>
    </Space>
  );
}

function UseLayoutEffectDemo() {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [targetWidth, setTargetWidth] = useState(180);
  const [measuredWidth, setMeasuredWidth] = useState(0);

  useLayoutEffect(() => {
    setMeasuredWidth(Math.round(boxRef.current?.getBoundingClientRect().width ?? 0));
  }, [targetWidth]);

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <input
        type="range"
        min={120}
        max={320}
        value={targetWidth}
        onChange={(event) => setTargetWidth(Number(event.target.value))}
      />
      <div
        ref={boxRef}
        style={{
          background: "#e6f4ff",
          border: "1px solid #91caff",
          borderRadius: 8,
          padding: 8,
          transition: "width 0.2s",
          width: targetWidth,
        }}
      >
        布局测量区域
      </div>
      <Text>目标宽度：{targetWidth}px，布局读取宽度：{measuredWidth}px</Text>
    </Space>
  );
}

function UseInsertionEffectDemo() {
  const [color, setColor] = useState("#722ed1");
  const className = useMemo(() => `insertion-demo-${color.slice(1)}`, [color]);

  useInsertionEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.textContent = `
      .${className} {
        border: 2px solid ${color};
        border-radius: 8px;
        padding: 8px;
      }
    `;
    document.head.appendChild(styleTag);
    return () => {
      styleTag.remove();
    };
  }, [className, color]);

  return (
    <Space orientation="vertical">
      <Space>
        <Button onClick={() => setColor("#722ed1")}>紫色</Button>
        <Button onClick={() => setColor("#13c2c2")}>青色</Button>
        <Button onClick={() => setColor("#f5222d")}>红色</Button>
      </Space>
      <div className={className}>该样式由 useInsertionEffect 注入，适用于 CSS-in-JS 提前插入样式。</div>
    </Space>
  );
}

function UseMemoDemo() {
  const [size, setSize] = useState(50000);
  const [flip, setFlip] = useState(false);

  const heavyResult = useMemo(() => {
    let sum = 0;
    for (let i = 1; i <= size; i += 1) {
      sum += i;
    }
    return sum;
  }, [size]);

  return (
    <Space orientation="vertical">
      <Text>计算 1..{size} 的总和：{heavyResult}</Text>
      <Space>
        <Button onClick={() => setSize((value) => value + 10000)}>扩大计算规模</Button>
        <Button onClick={() => setFlip((value) => !value)}>切换无关状态：{String(flip)}</Button>
      </Space>
    </Space>
  );
}

const CallbackChild = memo(function CallbackChild({ onIncrease }: { onIncrease: () => void }) {
  const renderRef = useRef(0);
  renderRef.current += 1;

  return (
    <Space orientation="vertical">
      <Button type="primary" onClick={onIncrease}>
        调用父级回调
      </Button>
      <Text type="secondary">子组件 render 次数：{renderRef.current}</Text>
    </Space>
  );
});

function UseCallbackDemo() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<ThemeMode>("light");
  const onIncrease = useCallback(() => {
    setCount((value) => value + 1);
  }, []);

  return (
    <Space orientation="vertical">
      <Text>父级 count：{count}</Text>
      <Switch
        checked={theme === "dark"}
        onChange={(checked) => setTheme(checked ? "dark" : "light")}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <CallbackChild onIncrease={onIncrease} />
    </Space>
  );
}

function UseTransitionDemo() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(SearchSource);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (nextValue: string) => {
    setKeyword(nextValue);
    startTransition(() => {
      const nextResults = SearchSource.filter((item) => item.toLowerCase().includes(nextValue.toLowerCase()));
      setResults(nextResults);
    });
  };

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <Input value={keyword} onChange={(event) => handleSearch(event.target.value)} placeholder="输入关键词过滤 1200 条数据" />
      <Text>结果数：{results.length} {isPending ? "(低优先级更新中...)" : ""}</Text>
      <Text type="secondary">useTransition 可把非紧急更新标记为低优先级，避免输入卡顿。</Text>
    </Space>
  );
}

function UseDeferredValueDemo() {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const filtered = useMemo(
    () => SearchSource.filter((item) => item.toLowerCase().includes(deferredQuery.toLowerCase())).slice(0, 8),
    [deferredQuery],
  );

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="快速输入观察 deferred 查询" />
      <Text type="secondary">实时值：{query || "（空）"}；延迟值：{deferredQuery || "（空）"}</Text>
      <Space wrap>
        {filtered.map((item) => (
          <Tag key={item}>{item}</Tag>
        ))}
      </Space>
    </Space>
  );
}

function UseIdDemo() {
  const userNameId = useId();
  const emailId = useId();

  return (
    <Form layout="vertical">
      <Form.Item label={<label htmlFor={userNameId}>用户名</label>}>
        <Input id={userNameId} placeholder="useId 生成稳定 id" />
      </Form.Item>
      <Form.Item label={<label htmlFor={emailId}>邮箱</label>}>
        <Input id={emailId} placeholder="适合可访问性 label-for 关联" />
      </Form.Item>
    </Form>
  );
}

function UseSyncExternalStoreDemo() {
  const externalValue = useSyncExternalStore(subscribeExternalCounter, getExternalCounterSnapshot);

  return (
    <Space orientation="vertical">
      <Text>外部 store 的值：{externalValue}</Text>
      <Button onClick={increaseExternalCounter}>更新外部 store</Button>
      <Text type="secondary">用于接入 Redux/Zustand/自定义订阅源，保证并发渲染一致性。</Text>
    </Space>
  );
}

function useOnlineStatus() {
  const [online, setOnline] = useState(() => window.navigator.onLine);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, []);

  useDebugValue(online ? "Online" : "Offline");
  return online;
}

function UseDebugValueDemo() {
  const online = useOnlineStatus();

  return (
    <Alert
      type={online ? "success" : "warning"}
      title={online ? "网络状态：在线" : "网络状态：离线"}
      description="useDebugValue 主要给自定义 Hook 在 React DevTools 里提供更易读的调试信息。"
      showIcon
    />
  );
}

const initialActionFormState: ActionFormState = {
  status: "idle",
  message: "请提交表单",
};

async function submitNameAction(_: ActionFormState, formData: FormData): Promise<ActionFormState> {
  const name = String(formData.get("name") ?? "").trim();
  await new Promise((resolve) => {
    window.setTimeout(resolve, 800);
  });
  if (!name) {
    return {
      status: "error",
      message: "名称不能为空",
    };
  }
  return {
    status: "success",
    message: `提交成功，欢迎你 ${name}`,
  };
}

function UseActionStateDemo() {
  const [formState, submitAction, pending] = useActionState(submitNameAction, initialActionFormState);

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <form action={submitAction}>
        <Space>
          <input
            name="name"
            placeholder="输入你的名称"
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: 6,
              padding: "6px 10px",
            }}
          />
          <Button htmlType="submit" type="primary" loading={pending}>
            {pending ? "提交中" : "提交"}
          </Button>
        </Space>
      </form>
      <Alert
        type={formState.status === "error" ? "error" : "info"}
        title={formState.message}
        showIcon
      />
    </Space>
  );
}

function UseOptimisticDemo() {
  const [comments, setComments] = useState<string[]>(["第一条评论"]);
  const [isPending, startTransition] = useTransition();
  const [optimisticComments, addOptimisticComment] = useOptimistic(comments, (current, incoming: string) => [
    ...current,
    `${incoming}（发送中）`,
  ]);

  const submitComment = async (text: string) => {
    const content = text.trim();
    if (!content) {
      return;
    }
    startTransition(() => {
      addOptimisticComment(content);
    });
    await new Promise((resolve) => {
      window.setTimeout(resolve, 1000);
    });
    setComments((current) => [...current, content]);
  };

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <Space.Compact style={{ width: "100%" }}>
        <Input.Search
          placeholder="输入评论后回车"
          enterButton="发送"
          onSearch={(value) => {
            void submitComment(value);
          }}
        />
      </Space.Compact>
      <Space wrap>
        {optimisticComments.map((item, index) => (
          <Tag key={`${item}-${index}`}>{item}</Tag>
        ))}
      </Space>
      <Text type="secondary">{isPending ? "乐观更新已提交，等待服务端确认..." : "当前无待确认的乐观更新"}</Text>
    </Space>
  );
}

function PromiseMessage({ version }: { version: number }) {
  const message = use(
    useMemo(
      () =>
        new Promise<string>((resolve) => {
          window.setTimeout(() => {
            resolve(`use(Promise) 第 ${version} 次读取完成`);
          }, PromiseDelay);
        }),
      [version],
    ),
  );

  return <Alert type="success" title={message} showIcon />;
}

function UseApiDemo() {
  const [version, setVersion] = useState(1);

  return (
    <Space orientation="vertical" style={{ width: "100%" }}>
      <Button onClick={() => setVersion((value) => value + 1)}>重新读取 Promise</Button>
      <Suspense fallback={<Alert type="info" title="等待 Promise 解析中..." showIcon />}>
        <PromiseMessage version={version} />
      </Suspense>
      <Text type="secondary">`use` 可直接读取 Promise / Context，未完成时会触发 Suspense。</Text>
    </Space>
  );
}

export default function UseStatePage() {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: 1100,
        padding: 24,
      }}
    >
      <Title level={2}>React 19 `useXXX` Hooks 全量 Demo</Title>
      <Paragraph>
        页面展示 React 当前核心 `use` 系列能力。每张卡片都包含作用说明和可交互示例，可用于快速确认 hook
        的定位和典型使用方式。
      </Paragraph>
      <Divider />

      <HookCard name="useState" feature="组件内部状态；支持函数式更新和惰性初始化。">
        <UseStateDemo />
      </HookCard>
      <HookCard name="useEffect" feature="处理副作用（请求、订阅、定时器），并通过返回函数做清理。">
        <UseEffectDemo />
      </HookCard>
      <HookCard name="useContext" feature="跨层级读取共享数据，避免层层透传 props。">
        <UseContextDemo />
      </HookCard>
      <HookCard name="useReducer" feature="复杂状态转移；把状态变化逻辑集中到 reducer。">
        <UseReducerDemo />
      </HookCard>
      <HookCard name="useRef" feature="持久化可变引用，不触发重渲染；常用于 DOM 操作与缓存。">
        <UseRefDemo />
      </HookCard>
      <HookCard name="useImperativeHandle" feature="配合 forwardRef 暴露受控的实例能力给父组件。">
        <UseImperativeHandleDemo />
      </HookCard>
      <HookCard name="useLayoutEffect" feature="在浏览器绘制前同步执行，适合布局测量和同步修正。">
        <UseLayoutEffectDemo />
      </HookCard>
      <HookCard name="useInsertionEffect" feature="在布局副作用前插入样式，主要用于 CSS-in-JS 场景。">
        <UseInsertionEffectDemo />
      </HookCard>
      <HookCard name="useMemo" feature="缓存昂贵计算结果，避免无关重渲染重复计算。">
        <UseMemoDemo />
      </HookCard>
      <HookCard name="useCallback" feature="缓存函数引用，常与 memo 子组件配合降低重渲染。">
        <UseCallbackDemo />
      </HookCard>
      <HookCard name="useTransition" feature="将更新标记为低优先级，提升交互流畅性。">
        <UseTransitionDemo />
      </HookCard>
      <HookCard name="useDeferredValue" feature="将某个值延后更新，降低输入与渲染竞争。">
        <UseDeferredValueDemo />
      </HookCard>
      <HookCard name="useId" feature="生成稳定唯一 id，常用于 label 与 input 的可访问性关联。">
        <UseIdDemo />
      </HookCard>
      <HookCard name="useSyncExternalStore" feature="安全订阅外部状态源，兼容并发渲染。">
        <UseSyncExternalStoreDemo />
      </HookCard>
      <HookCard name="useDebugValue" feature="给自定义 Hook 提供 DevTools 调试标签。">
        <UseDebugValueDemo />
      </HookCard>
      <HookCard name="useActionState" feature="管理表单 Action 提交状态（pending / 成功 / 失败）。">
        <UseActionStateDemo />
      </HookCard>
      <HookCard name="useOptimistic" feature="先乐观更新 UI，再等待服务端确认。">
        <UseOptimisticDemo />
      </HookCard>
      <HookCard name="use" feature="读取 Promise / Context，并与 Suspense 协同。">
        <UseApiDemo />
      </HookCard>
    </div>
  );
}
