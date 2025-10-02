import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/RootPage";
import Rootpage from "../Pages/TryOurPlatform/Rootpage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/tryourplatform",
    element: <Rootpage />,
  },
]);
