import { Navigate, createBrowserRouter } from "react-router-dom";

import DemoFormPage from "@/pages/demo-form-page";
import DemoListPage from "@/pages/demo-list-page";
import NotFoundPage from "@/pages/not-found-page";

export const router = createBrowserRouter([
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
]);
