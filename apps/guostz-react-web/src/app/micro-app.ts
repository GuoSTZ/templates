import { mountApp } from "@/app/bootstrap";
import { getMicroAppBaseroute } from "@/utils/env";

declare global {
  interface Window {
    __MICRO_APP_ENVIRONMENT__?: boolean;
    __MICRO_APP_BASE_ROUTE__?: string;
  }
}

let mountedInstance: ReturnType<typeof mountApp> | null = null;

export function isMicroAppEnvironment() {
  return Boolean(window.__MICRO_APP_ENVIRONMENT__);
}

export function getRuntimeBaseroute() {
  return window.__MICRO_APP_BASE_ROUTE__ || getMicroAppBaseroute();
}

export function mountMicroApp(container: Element) {
  mountedInstance?.unmount();
  mountedInstance = mountApp(container, {
    basename: getRuntimeBaseroute(),
  });

  return mountedInstance;
}

export function startApp(container: Element) {
  if (isMicroAppEnvironment()) {
    return mountMicroApp(container);
  }

  mountedInstance?.unmount();
  mountedInstance = mountApp(container, {
    basename: "/",
  });

  return mountedInstance;
}

export function unmountMicroApp() {
  mountedInstance?.unmount();
  mountedInstance = null;
}
