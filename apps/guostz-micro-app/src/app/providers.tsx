import type { PropsWithChildren } from "react";
import { useMemo } from "react";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, useTheme } from "./ThemeContext";
import { themeConfigs } from "./theme";

function ThemedApp({ children }: PropsWithChildren) {
  const { themeType } = useTheme();

  return (
    <ConfigProvider theme={themeConfigs[themeType]}>
      {children}
    </ConfigProvider>
  );
}

export function AppProviders({ children }: PropsWithChildren) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ThemedApp>{children}</ThemedApp>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
