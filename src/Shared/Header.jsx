import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../public/logoblack.svg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Redux/Authentication";
import { BASE_URL } from "../Redux/config";

function Header() {
  const [open, setOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth || {});
  const location = useLocation();

  // Debug: Log user data
  useEffect(() => {
    if (user) {
      console.log("User data:", user);
      console.log("Image path:", user.image);
      console.log("Full image URL:", `${BASE_URL}${user.image}`);
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setUserDropdownOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setUserDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-md">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="Taught AI" className="h-8" />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-lg text-gray-800 font-playfair">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/tryourplatform"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              Try Our Platform
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `hover:underline ${
                  isActive ||
                  location.pathname.startsWith("/blogs") ||
                  location.pathname.startsWith("/blog/")
                    ? "  font-semibold"
                    : ""
                }`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              Contact
            </NavLink>

            {/* User Authentication Section */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  {user.image ? (
                    <img
                      src={`${BASE_URL}${user.image}`}
                      alt={user.full_name || user.email}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {user.full_name
                        ? user.full_name.charAt(0).toUpperCase()
                        : user.email?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm font-medium">
                    {user.full_name || user.email}
                  </span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                    <button
                      onClick={handleProfile}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/signin"
                className={({ isActive }) =>
                  `inline-block px-6 py-2 rounded-full shadow-sm font-playfair ${
                    isActive
                      ? " text-white"
                      : "bg-gray-800 text-white hover:opacity-95"
                  }`
                }
              >
                Log In
              </NavLink>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-md border border-gray-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden pb-4 font-playfair">
            <div className="space-y-2 px-2">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                Services
              </NavLink>
              <NavLink
                to="/tryourplatform"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                Try Our Platform
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                Blog
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                Contact
              </NavLink>

              {/* Mobile User Authentication Section */}
              {user ? (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600">
                    Welcome, {user.full_name || user.email}
                  </div>
                  <button
                    onClick={handleProfile}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <NavLink
                  to="/signin"
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-center ${
                      isActive
                        ? " text-white font-semibold"
                        : "bg-gray-800 text-white"
                    }`
                  }
                >
                  Log In
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
