import React from 'react'
import logo from "../../public/logoblack.svg"

function Header() {
  return (
    <header className="bg-white">
      <div className=" mx-auto px-6 py-6 flex items-center">
        {/* Brand / logo */}
        <div className="flex-1 flex items-center">
          {/* <a href="/" className="text-2xl font-playfair font-semibold tracking-tight text-gray-900">Taught AI</a> */}
          <img src={logo} alt="Taught AI" className="h-8" />
        </div>

        {/* Centered navigation */}

        {/* Right action */}
        <div className="flex-1 flex items-right justify-end ">
        <nav className="">
          <ul className="flex items-center gap-8 text-lg text-gray-800 font-playfair">
            <li><a href="#" className="hover:underline">About</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
            <li><a href="#" className="hover:underline">Try Our Platform</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Contact</a></li>
          <a href="#" className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full shadow-sm hover:opacity-95 font-playfair">Log In</a>
          </ul>
        </nav>
        </div>
      </div>
    </header>
  )
}

export default Header