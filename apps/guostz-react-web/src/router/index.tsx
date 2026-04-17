import { Navigate, createBrowserRouter, type RouteObject } from "react-router-dom";

import DemoFormPage from "@/pages/demo-form-page";
import DemoListPage from "@/pages/demo-list-page";
import NotFoundPage from "@/pages/not-found-page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/demo/list" replace />,
  },
  {
    path: "/demo/list",
    element: <DemoListPage />,
  },
  {
    path: "/demo/form",
    element: <DemoFormPage />,
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
