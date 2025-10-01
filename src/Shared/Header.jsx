import React, { useState } from 'react'
import logo from "../../public/logoblack.svg"

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-white">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-5">
          {/* Brand */}
          <div className="flex items-center gap-4">
            <img src={logo} alt="Taught AI" className="h-8" />
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8 text-lg text-gray-800 font-playfair">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Services</a>
            <a href="#" className="hover:underline">Try Our Platform</a>
            <a href="#" className="hover:underline">Blog</a>
            <a href="#" className="hover:underline">Contact</a>
            <a href="#" className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full shadow-sm hover:opacity-95 font-playfair">Log In</a>
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
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">About</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">Services</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">Try Our Platform</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">Blog</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-gray-50">Contact</a>
              <a href="#" className="block px-3 py-2 rounded-md bg-gray-800 text-white text-center">Log In</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header