import { Navigate, createBrowserRouter } from "react-router-dom";

import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/not-found-page";
import { ShellLayout } from "@/components/Layout";  
import WorkspacePage from "@/pages/workspace-page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ShellLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "workspace/:appName/*",
        element: <WorkspacePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
