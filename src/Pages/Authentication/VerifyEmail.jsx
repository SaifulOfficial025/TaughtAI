import React, { useState, useRef } from "react";
import SignupBackground from "../../../public/authenticationbg.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "../../../public/logowhite.svg";
import tick from "../../../public/tick.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOTP,
  resendOTP,
  forgotPassword,
  clearError,
  clearSuccess,
} from "../../Redux/Authentication";

function VerifyEmail() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [localError, setLocalError] = useState(null);
  const inputsRef = useRef([]);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { loading, error, successMessage, currentEmail } = useSelector(
    (s) => s.auth || {}
  );

  // Determine if this is coming from forgot password flow
  const isFromForgotPassword =
    sessionStorage.getItem("fromForgotPassword") === "true";

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

  const handleVerifyOTP = async () => {
    const otpString = otp.join("");
    if (otpString.length !== 4) {
      setLocalError("Please enter a 4-digit OTP");
      return;
    }

    if (!currentEmail) {
      setLocalError("Email not found. Please go back to signup.");
      return;
    }

    setLocalError(null);
    try {
      const payload = {
        email: currentEmail,
        otp: otpString,
      };

      const resultAction = await dispatch(verifyOTP(payload));
      if (resultAction?.meta?.requestStatus === "fulfilled") {
        // Navigate based on the source flow
        if (isFromForgotPassword) {
          // Clear the flag from sessionStorage
          sessionStorage.removeItem("fromForgotPassword");
          navigate("/new_password");
        } else {
          // Coming from signup flow
          navigate("/signin");
        }
        dispatch(clearSuccess());
      } else {
        const errMsg =
          resultAction?.payload?.message ||
          resultAction?.error?.message ||
          "OTP verification failed";
        setLocalError(errMsg);
      }
    } catch (err) {
      setLocalError(err.message || "OTP verification failed");
    }
  };

  const handleResendOTP = async () => {
    if (!currentEmail) {
      setLocalError("Email not found. Please go back to signup.");
      return;
    }

    setLocalError(null);
    try {
      // Use appropriate resend endpoint based on flow
      const payload = { email: currentEmail };
      let resultAction;

      if (isFromForgotPassword) {
        // For forgot password flow, use forgotPassword thunk to resend
        resultAction = await dispatch(forgotPassword(payload));
      } else {
        // For signup flow, use resendOTP thunk
        resultAction = await dispatch(resendOTP(payload));
      }

      if (resultAction?.meta?.requestStatus === "fulfilled") {
        alert(resultAction.payload?.message || "OTP resent successfully");
        dispatch(clearSuccess());
      } else {
        const errMsg =
          resultAction?.payload?.message ||
          resultAction?.error?.message ||
          "Failed to resend OTP";
        setLocalError(errMsg);
      }
    } catch (err) {
      setLocalError(err.message || "Failed to resend OTP");
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
              backgroundSize: "cover",
            }}
          />
          {/* Small text logo */}
          <Link to="/">
            <div className="absolute top-6 left-6 z-20">
              <img
                src={Logo}
                alt="Listlly Logo"
                className="w-16 sm:w-32 h-auto"
              />
            </div>
          </Link>
          {/* subtle overlay for contrast */}
          <div className="absolute inset-0 bg-black/30 rounded-xl pointer-events-none" />
        </div>

        {/* RIGHT: verify card */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-2">
                Verify Your Email
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                We&apos;ve sent a verification link to your inbox. Please check
                your email to continue.
              </p>

              <div className="flex justify-center mb-6">
                {/* simple badge-check svg */}
                <img
                  src={tick}
                  alt="verified"
                  className="w-40 h-40 text-black/80"
                />
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

              {/* Error Display */}
              {(localError || error) && (
                <p className="text-sm text-red-600 text-center mb-4">
                  {localError || error}
                </p>
              )}

              <div className="w-full mb-4">
                <button
                  onClick={handleVerifyOTP}
                  disabled={loading}
                  className={`w-full h-11 rounded-full ${
                    loading ? "bg-gray-400" : "bg-black"
                  } text-white font-semibold`}
                >
                  {loading ? "Verifying..." : "Done"}
                </button>
              </div>

              <p className="text-sm text-center text-gray-500">
                Didn&apos;t receive the PIN?{" "}
                <button
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="text-gray-800 font-semibold hover:underline disabled:opacity-50"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
