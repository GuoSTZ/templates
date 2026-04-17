import { Navigate, Outlet, createBrowserRouter, type RouteObject } from "react-router-dom";

import NotFoundPage from "@/pages/not-found-page";
import HooksPage from "@/pages/hooks";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/hooks/dashboard" replace />,
  },
  {
    path: "/hooks",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <HooksPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export function createAppRouter(basename = "/") {
  return createBrowserRouter(routes, {
    basename: basename === "/" ? undefined : basename,
  });
}
