import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";

import { createAppRouter } from "@/router";

type AppProps = {
  basename?: string;
};

export function App({ basename = "/" }: AppProps) {
  const router = useMemo(() => createAppRouter(basename), [basename]);

  return <RouterProvider router={router} />;
}
