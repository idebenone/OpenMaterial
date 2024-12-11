import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./redux/store";
import WorkSpace from "./pages/WorkSpace";
import Home from "./pages/Home";
import { Toaster } from "@/components/ui/sonner";
import Landing from "./pages/Landing";
import Shared from "./pages/Shared";
import Explore from "./pages/Explore";

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
        path: "explore",
        element: <Explore />,
      },
    ],
  },
  {
    path: "workspace/:id",
    element: <WorkSpace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster richColors />
    </Provider>
  </React.StrictMode>
);
