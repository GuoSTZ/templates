import { Navigate, createBrowserRouter } from "react-router-dom";

// import { getDefaultApp } from "@/features/micro-app/helpers";
import HomePage from "@/pages/home-page";
import NotFoundPage from "@/pages/not-found-page";
import WorkspacePage from "@/pages/workspace-page";

// const defaultApp = getDefaultApp();

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to={"/home"} replace />,
  },
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/workspace/:appName",
    element: <WorkspacePage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
