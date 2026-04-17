import { useParams } from "react-router-dom";

import { getMicroAppByName } from "@/app/micro-app-config";
import { MicroAppView } from "@/components/MicroAppView";

export default function WorkspacePage() {
  const { appName = "" } = useParams();
  const app = getMicroAppByName(appName);

  return (
    <MicroAppView {...app} />
  );
}
