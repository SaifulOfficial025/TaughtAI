import React from 'react'
import logo from "../../public/logowhite.svg"
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-16 bg-gradient-to-b from-slate-900 via-slate-900 to-black text-gray-200">
      <div className=" mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          {/* Brand / Left */}
          <div>
            <img src={logo} alt="Taught AI" className="h-8 mb-4" />
            <p className="mt-4 text-gray-300 leading-relaxed mt-16">
              Helping schools unlock the potential of their staff through effective AI CPD and programmes.
            </p>
          </div>

          {/* Quick links / Center */}
          <div className="md:pl-8 ml-56">
            <h4 className="text-lg font-medium text-white mb-4">Quick Action</h4>
            <ul className="space-y-3 text-gray-300">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Service</a></li>
              <li><a href="#" className="hover:text-white">Try Our Platform</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m0 0l4-4m-4 4l4 4" />
        
                <a href="mailto:ben@taughtai.co.uk" className="hover:text-white">ben@taughtai.co.uk</a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-500" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-200 text-md">
          <div>© {year} TaughtAI. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer