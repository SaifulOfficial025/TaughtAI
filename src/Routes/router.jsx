import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/RootPage";
import Service from "../Pages/Services/Rootpage";
import Tryourplatform from "../Pages/Tryourplatform/Rootpage";
import Blog from "../Pages/Blogs/RootPage";
import BlogDetails from "../Pages/Blogs/BlogDetails";
import Contact from "../Pages/Contact/RootPage";


import SignIn from "../Pages/Authentication/SignIn";
import SignUp from "../Pages/Authentication/SignUp";
import ForgetPasswordEmail from "../Pages/Authentication/ForgetPasswordEmail";
import ForgetPasswordVerifyEmail from "../Pages/Authentication/ForgetPasswordVerifyEmail";
import NewPassword from "../Pages/Authentication/NewPassword";

import AcademyChat from "../Pages/Chats/AcademyChat";
import ChatDetail from "../Pages/Chats/ChatDetail";
import PrimaryChat from "../Pages/Chats/PrimaryChat";
import Profile from "../Pages/Profile/Profile";

import StaffPlatform from "../Pages/Academy/StaffPlatform";
import Faq from "../Pages/Academy/Faq";
import Policies from "../Pages/Academy/Policies";
import AcademyHome from "../Pages/Academy/Home";

import PrimaryHome from "../Pages/Primary/Home";
import PrimaryStaffPlatform from "../Pages/Primary/StaffPlatform";
import PrimaryFaq from "../Pages/Primary/Faq";
import PrimaryPolicies from "../Pages/Primary/Policies";




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
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetails />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/forgot_password_email",
    element: <ForgetPasswordEmail />,
  },
  {
    path: "/forgot_password_verify_email",
    element: <ForgetPasswordVerifyEmail />,
  },
  {
    path: "/new_password",
    element: <NewPassword />,
  },
  {
    path: "/taught_ai_academy",
    element: <AcademyChat />,
  },
  {
    path: "/chats",
    element: <AcademyChat />,
  },
  {
    path: "/chats/:chatId",
    element: <ChatDetail />,
  },
  {
    path: "/taught_ai_primary",
    element: <PrimaryChat />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/academy/home",
    element: <AcademyHome />,
  },
  {
    path: "/academy/staff",
    element: <StaffPlatform />,
  },
  {
    path: "/academy/faq",
    element: <Faq />,
  },
  {
    path: "/academy/policy",
    element: <Policies />,
  },
  {
    path: "/primary/home",
    element: <PrimaryHome />,
  },
  {
    path: "/primary/staff",
    element: <PrimaryStaffPlatform />,
  },
  {
    path: "/primary/faq",
    element: <PrimaryFaq />,
  },
  {
    path: "/primary/policy",
    element: <PrimaryPolicies />,
  }

]);
