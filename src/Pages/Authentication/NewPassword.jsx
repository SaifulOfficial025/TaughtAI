import React, { useState } from "react";
import SignupBackground from "../../../public/authenticationbg.svg";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../../../public/logowhite.svg";
import tick from "../../../public/tick.svg";



function NewPassword() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full p-6">
        {/* LEFT: hero image */}
       <div className="relative w-full rounded-xl overflow-hidden">
                   <div
                     className=" inset-0 bg-center rounded-xl h-56 sm:h-72 md:h-96 lg:h-screen"
                     style={{
                       backgroundImage: `url(${SignupBackground})`,
                       backgroundSize: 'cover',
                     }}
                   />
                 {/* Small text logo */}
                 <Link to="/">
                   <div className="absolute top-6 left-6 z-20">
                     <img src={Logo} alt="Listlly Logo" className="w-16 sm:w-32 h-auto" />
                   </div>
                 </Link>
                 {/* subtle overlay for contrast */}
                 <div className="absolute inset-0 bg-black/30 rounded-xl pointer-events-none" />
            
               </div>

        {/* RIGHT: form card */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-2">Set New Password</h2>
              <p className="text-sm text-gray-500 text-center mb-6">Welcome back! Please create a strong new password to secure your account.</p>

              <div className="flex justify-center mb-6">
                <img src={tick} alt="verified" className="w-40 h-40 text-black/80" />
              </div>

              <div className="w-full">
                {/* New Password */}
                <div className="relative mb-4">
                  <label className="text-sm text-gray-700 mb-1 block">New Password</label>
                  <input
                    type={showPwd ? "text" : "password"}
                    className="w-full h-11 px-3 pr-10 rounded-md border border-gray-300 text-sm md:text-base outline-none bg-white text-gray-900"
                    placeholder=""
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-3"
                    aria-label="Toggle new password visibility"
                  >
                    {showPwd ? <Eye size={18} color="#6B7280" /> : <EyeOff size={18} color="#6B7280" />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative mb-4">
                  <label className="text-sm text-gray-700 mb-1 block">Confirm Password</label>
                  <input
                    type={showPwd2 ? "text" : "password"}
                    className="w-full h-11 px-3 pr-10 rounded-md border border-gray-300 text-sm md:text-base outline-none bg-white text-gray-900"
                    placeholder=""
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd2((v) => !v)}
                    className="absolute right-3 top-3"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showPwd2 ? <Eye size={18} color="#6B7280" /> : <EyeOff size={18} color="#6B7280" />}
                  </button>
                </div>

                <div className="flex items-center mb-6">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe((v) => !v)}
                    className="w-4 h-4 text-black rounded-sm mr-2"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-700">Remember me</label>
                </div>

                <Link to="/signin">
                  <button className="w-full h-11 rounded-full bg-black text-white font-semibold">Confirm</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPassword;
