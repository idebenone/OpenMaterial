import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";

import { store } from "./redux/store";
import WorkSpace from "./pages/WorkSpace";
import Create from "./pages/Create";

const router = createBrowserRouter([
  {
    path: "",
    element: <Create />,
  },
  {
    path: "workspace",
    element: <WorkSpace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
