import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./redux/store";
import WorkSpace from "./pages/WorkSpace";
import Home from "./pages/Home";
import { Toaster } from "@/components/ui/sonner";

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
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
