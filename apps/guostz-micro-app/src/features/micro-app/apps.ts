import { getDefaultSubAppEntry } from "@/shared/utils/env";

import type { MicroAppConfig } from "./types";

export const microApps: MicroAppConfig[] = [
  {
    name: "dashboard",
    title: "运营看板",
    description: "默认演示子应用入口，后续接入真实应用时只需替换 entry。",
    entry: getDefaultSubAppEntry(),
    activePath: "/workspace/dashboard",
    baseroute: "/dashboard",
  },
];
