import React, { useState, useRef } from "react";
import SignupBackground from "../../../public/authenticationbg.svg";
import { Link } from "react-router-dom";
import Logo from "../../../public/logowhite.svg";
import tick from "../../../public/tick.svg";



function ForgetPasswordVerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-shift to next box
    if (value && index < otp.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      // Auto-shift to previous box
      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

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

        {/* RIGHT: verify card */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-2">Verify Your Email</h2>
              <p className="text-sm text-gray-500 text-center mb-6">We&apos;ve sent a verification link to your inbox. Please check your email to continue.</p>

              <div className="flex justify-center mb-6">
                {/* simple badge-check svg */}
                <img src={tick} alt="verified" className="w-40 h-40 text-black/80" />
              </div>

              {/* OTP Input Section */}
              <div className="w-full flex justify-center gap-4 mb-6">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputsRef.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={value}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 sm:w-14 h-12 sm:h-14 text-center rounded-xl bg-white border border-gray-100 text-lg sm:text-xl outline-none text-gray-900 font-bold shadow-md"
                  />
                ))}
              </div>

              <div className="w-full mb-4">
                <Link to="/new_password">
                  <button className="w-full h-11 rounded-full bg-black text-white font-semibold">Done</button>
                </Link>
              </div>

              <p className="text-sm text-center text-gray-500">
                Didn&apos;t receive the PIN?{' '}
                <a href="#" className="text-gray-800 font-semibold hover:underline">Resend</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordVerifyEmail;
