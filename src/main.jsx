import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import { Provider } from "react-redux";
import store from "./Redux/store";

createRoot(document.getElementById("root")).render(
  <div className="max-w-screen-2xl  mx-auto shadow shadow-2xl">
    <StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </StrictMode>
  </div>
);
