import { theme } from "antd";
import type { ThemeConfig } from "antd";

export type ThemeType = "light" | "dark" | "scifi";

export const themeConfigs: Record<ThemeType, ThemeConfig> = {
  // 1. 默认亮色主题
  light: {
    algorithm: theme.defaultAlgorithm,
    token: {
      colorPrimary: "#1677ff",
    },
  },
  // 2. 极客暗黑主题
  dark: {
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: "#1677ff",
      // 暗黑模式下可以微调背景，默认的 algorithm 已经非常好了
    },
  },
  // 3. 年轻化/赛博科幻主题
  scifi: {
    // 依然使用暗色算法作为推算基础
    algorithm: theme.darkAlgorithm,
    token: {
      colorPrimary: "#00f0ff", // 赛博朋克电光蓝主色
      colorInfo: "#00f0ff",
      colorSuccess: "#39ff14", // 霓虹绿
      colorWarning: "#ffea00",
      colorError: "#ff003c", // 霓虹红
      colorTextBase: "#e2e8f0",
      colorBgBase: "#050a1f", // 深邃宇宙蓝
      colorBgContainer: "#0f172a", // 卡片背景
      colorBgLayout: "#050a1f",
      borderRadius: 12, // 年轻化通常圆角大一点
      wireframe: false, // 关闭线框风格，显得更现代
    },
    components: {
      Layout: {
        headerBg: "#050a1f",
        siderBg: "#050a1f",
      },
      Menu: {
        darkItemBg: "transparent",
        darkItemSelectedBg: "rgba(0, 240, 255, 0.15)",
        darkItemSelectedColor: "#00f0ff",
      },
    },
  },
};
