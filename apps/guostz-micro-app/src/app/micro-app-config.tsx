export type MicroAppConfig = {
  name: string;
  url: string;
  baseroute: string;
  iframe?: boolean;
};

export const microApps: MicroAppConfig[] = [
  {
    name: "react-web",
    url: 'http://localhost:9001',
    baseroute: "/workspace/react-web",
    iframe: true,
  },
];

export function getMicroAppByName(appName: string) {
  return microApps.find((item) => item.name === appName) || {} as MicroAppConfig;
}
