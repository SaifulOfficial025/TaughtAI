import { createBrowserRouter, Navigate } from "react-router-dom";
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
import VerifyEmail from "../Pages/Authentication/VerifyEmail";
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

import BlogList from "../Pages/Admin/BlogList";
import AddNewBlog from "../Pages/Admin/AddNewBlog";
import AdminBlogDetails from "../Pages/Admin/BlogDetails";
import EditBlog from "../Pages/Admin/EditBlog";
import AdminLogin from "../Pages/Admin/SignIn";
import AdminChangePassword from "../Pages/Admin/ChangePassword";
import ChatDetailsforPrimary from "../Pages/Chats/ChatDetailPrimary";

// simple guard: ensure access_token and role=admin exist in localStorage
function requireAdmin(element) {
  try {
    const token =
      localStorage.getItem("access_token") ||
      localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");
    // Debugging: log guard checks so we can see when a route check occurs
    // (remove or silence this in production)
    try {
      // eslint-disable-next-line no-console
      console.debug("requireAdmin check -> token:", token, "role:", role);
    } catch (e) {}
    if (!token || role !== "admin") {
      try {
        // eslint-disable-next-line no-console
        console.debug("requireAdmin -> redirecting to /admin/login");
      } catch (e) {}
      return <Navigate to="/admin/login" replace />;
    }
    return element;
  } catch (e) {
    return <Navigate to="/admin/login" replace />;
  }
}

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
    path: "/verify_email",
    element: <VerifyEmail />,
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
    path: "/primary_chats",
    element: <ChatDetailsforPrimary />,
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
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
  {
    path: "/admin/bloglist",
    element: requireAdmin(<BlogList />),
  },
  {
    path: "/admin/blogdetails/:id",
    element: requireAdmin(<AdminBlogDetails />),
  },
  {
    path: "/admin/addnewblog",
    element: requireAdmin(<AddNewBlog />),
  },
  {
    path: "/admin/editblog/:id",
    element: requireAdmin(<EditBlog />),
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/changepassword",
    element: requireAdmin(<AdminChangePassword />),
  },
]);
