import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../../public/logowhite.svg"
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-gradient-to-b from-slate-900 via-slate-900 to-black text-gray-200">
      <div className=" mx-auto px-6 py-12">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand / Left */}
          <div className="text-center md:text-left">
            <Link to="/">
              <img src={logo} alt="Taught AI" className="h-8 mb-4 mx-auto md:mx-0" />
            </Link>
            <p className="text-gray-300 leading-relaxed mt-2 max-w-xs mx-auto md:mx-0">
              Helping schools unlock the potential of their staff through effective AI CPD and programmes.
            </p>
          </div>

          {/* Quick links / Center */}
          <div className="md:pl-8 text-center md:text-left">
            <h4 className="text-lg font-medium text-white mb-4">Quick Action</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/tryourplatform" className="hover:text-white">Try Our Platform</Link></li>
              <li><Link to="/blogs" className="hover:text-white">Blog</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact / Right */}
          <div className="md:text-right">
            <h4 className="text-lg font-medium text-white mb-4">Contact</h4>
            <div className="flex flex-col items-start md:items-end gap-3 text-gray-300">
              <div className="flex items-center gap-3">
                <FaPhoneAlt className="w-4 h-4 text-gray-300" />
                <span>07814559767</span>
              </div>

              <div className="flex items-center gap-3">
                <CiMail className="w-4 h-4 text-gray-300" />
                <a href="mailto:ben@taughtai.co.uk" className="hover:text-white">ben@taughtai.co.uk</a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-500" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-200 text-md">
          <div>© {year} TaughtAI. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer