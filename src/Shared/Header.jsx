import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../public/logoblack.svg"

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white">
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
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/services" className="hover:underline">Services</Link>
            <Link to="/tryourplatform" className="hover:underline">Try Our Platform</Link>
            <Link to="/blog" className="hover:underline">Blog</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/login" className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full shadow-sm hover:opacity-95 font-playfair">Log In</Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              onClick={() => setOpen(v => !v)}
              className="p-2 rounded-md border border-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <div className="md:hidden pb-4">
            <div className="space-y-2 px-2">
              <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-gray-50">About</Link>
              <Link to="/services" className="block px-3 py-2 rounded-md hover:bg-gray-50">Services</Link>
              <Link to="/tryourplatform" className="block px-3 py-2 rounded-md hover:bg-gray-50">Try Our Platform</Link>
              <Link to="/blog" className="block px-3 py-2 rounded-md hover:bg-gray-50">Blog</Link>
              <Link to="/contact" className="block px-3 py-2 rounded-md hover:bg-gray-50">Contact</Link>
              <Link to="/login" className="block px-3 py-2 rounded-md bg-gray-800 text-white text-center">Log In</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header