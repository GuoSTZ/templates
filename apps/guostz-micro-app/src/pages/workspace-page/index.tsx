import { useParams } from "react-router-dom";

import { getMicroAppByName } from "@/features/micro-app/helpers";
import { MicroAppView } from "@/shared/components/micro-app-view";
import { ShellLayout } from "@/shared/ui/shell-layout";

export default function WorkspacePage() {
  const { appName = "" } = useParams();
  const app = getMicroAppByName(appName);

  return (
    <ShellLayout
      title={app?.title || "应用不存在"}
      subtitle={app?.description || "请检查路由参数和本地注册表配置"}
    >
      <MicroAppView app={app ?? null} />
    </ShellLayout>
  );
}
