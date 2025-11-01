import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/router";
import AuthProvider from "./Redux/Authentication";

createRoot(document.getElementById("root")).render(
  <div className="max-w-screen-2xl  mx-auto shadow shadow-2xl">
    <StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
  </div>
);
