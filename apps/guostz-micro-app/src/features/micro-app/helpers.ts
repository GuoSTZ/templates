import { microApps } from "./apps";

export function getDefaultApp() {
  return microApps[0];
}

export function getMicroAppByName(appName: string) {
  return microApps.find((item) => item.name === appName);
}
