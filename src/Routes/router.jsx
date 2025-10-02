import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/RootPage";
import Service from "../Pages/Services/Rootpage";
import Tryourplatform from "../Pages/Tryourplatform/Rootpage";



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
    path: "/services",
    element: <Service />,
  },
  {
    path: "/tryourplatform",
    element: <Tryourplatform />,
  },
]);
