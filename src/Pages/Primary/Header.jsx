import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../../public/logoblack.svg";

function Header() {
  const [open, setOpen] = useState(false);

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
              to="/primary/home"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/primary/staff"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              Staff Platforms
            </NavLink>
            <NavLink
              to="/primary/policy"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              AI Uses Policy
            </NavLink>
            <NavLink
              to="/primary/faq"
              className={({ isActive }) =>
                `hover:underline ${isActive ? "  font-semibold" : ""}`
              }
            >
              FAQ
            </NavLink>
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
                to="/primary/home"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/primary/staff"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                Staff Platforms
              </NavLink>
              <NavLink
                to="/primary/policy"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                AI Uses Policy
              </NavLink>
              <NavLink
                to="/primary/faq"
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md ${
                    isActive ? "bg-gray-100 font-semibold" : "hover:bg-gray-50"
                  }`
                }
              >
                FAQ
              </NavLink>
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
