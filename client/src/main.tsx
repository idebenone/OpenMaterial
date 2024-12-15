import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import WorkSpace from "./pages/WorkSpace";
import Home from "./pages/Home";
import { Toaster } from "@/components/ui/sonner";
import Landing from "./pages/Landing";
import Shared from "./pages/Shared";
import Material from "./pages/Material";
import AuthCallback from "./pages/callback/auth";

const router = createBrowserRouter([
  {
    path: "",
    element: <Shared />,
    children: [
      {
        path: "",
        element: <Landing />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "material/:id",
        element: <Material />,
      },
    ],
  },
  {
    path: "auth/callback",
    element: <AuthCallback />,
  },
  {
    path: "workspace/:id",
    element: <WorkSpace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors />
  </React.StrictMode>
);
