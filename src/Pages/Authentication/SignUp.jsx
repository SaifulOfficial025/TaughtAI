import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import SignupBackground from "../../../public/authenticationbg.svg";
import Logo from "../../../public/logowhite.svg";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signup,
  clearError,
  clearSuccess,
  setCurrentEmail,
} from "../../Redux/Authentication";

function SignUp() {
  const [showPwd, setShowPwd] = useState(false);
  const [showPwd2, setShowPwd2] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((s) => s.auth || {});

  // Helper to extract a friendly message from a thunk result action
  const extractMessageFromResult = (resultAction) => {
    if (!resultAction) return null;

    // If fulfilled, payload should contain success information
    if (resultAction?.meta?.requestStatus === "fulfilled") {
      const p = resultAction.payload;
      if (!p) return successMessage || "Registration successful";
      return p.message || p.detail || p.non_field_errors || JSON.stringify(p);
    }

    // If rejected, the server response may be in payload (rejectWithValue)
    if (resultAction?.meta?.requestStatus === "rejected") {
      const payload = resultAction.payload;
      if (payload) {
        if (typeof payload === "string") return payload;
        return (
          payload.message ||
          payload.detail ||
          payload.non_field_errors ||
          JSON.stringify(payload)
        );
      }

      // Fallback to the toolkit error message
      const err = resultAction.error?.message;
      if (err && err !== "Rejected") return err;

      return "Signup failed";
    }

    return null;
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full p-4 sm:p-6 md:p-8 gap-6 items-stretch">
        {/* LEFT: Background image with overlay and logo */}
        <div className="relative w-full rounded-xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center rounded-xl h-48 sm:h-72 md:h-96 lg:h-full"
            style={{
              backgroundImage: `url(${SignupBackground})`,
              backgroundSize: "cover",
            }}
          />
          {/* Small text logo like the design */}
          <Link to="/">
            <div className="absolute top-4 left-6 z-20">
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

        {/* RIGHT: Sign-in Form */}
        <div className="flex items-center justify-center px-4 md:px-10 py-8 md:py-10">
          <div className="w-full max-w-md mx-auto">
            <h1
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-center"
              style={{ color: "#1C1C1C" }}
            >
              Create Your Account
            </h1>
            <p className="text-[16px] mt-1 text-center text-[#606A76]">
              Sign up now to access personalized AI-driven insights and features
              tailored to your needs.
            </p>

            <div className="mt-6 space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-[16px] mb-1 text-[#4B5563]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full h-11 rounded-md px-3 text-sm sm:text-sm md:text-base outline-none bg-white dark:bg-white text-black dark:text-black border border-gray-300"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[16px] mb-1 text-[#4B5563]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 rounded-md px-3 text-sm sm:text-sm md:text-base outline-none"
                  style={{
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    color: "#1C1C1C",
                  }}
                  placeholder="Enter your email address"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-[16px] mb-1 text-[#4B5563]">
                  Phone Number
                </label>
                <input
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 rounded-md px-3 text-sm sm:text-sm md:text-base outline-none"
                  style={{
                    border: "1px solid #E5E7EB",
                    background: "#FFFFFF",
                    color: "#1C1C1C",
                  }}
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-[16px] mb-1 text-[#4B5563]">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 rounded-md px-3 pr-10 text-sm sm:text-sm md:text-base outline-none"
                    style={{
                      border: "1px solid #E5E7EB",
                      background: "#FFFFFF",
                      color: "#1C1C1C",
                    }}
                    placeholder="Enter your strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd ? (
                      <Eye size={18} color="#606A76" />
                    ) : (
                      <EyeOff size={18} color="#606A76" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[16px] mb-1 text-[#4B5563]">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showPwd2 ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full h-11 rounded-md px-3 pr-10 text-sm sm:text-sm md:text-base outline-none bg-white dark:bg-white text-black dark:text-black border border-gray-300"
                    placeholder="Re-enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd2((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    aria-label="Toggle password visibility"
                  >
                    {showPwd2 ? (
                      <Eye size={18} color="#606A76" />
                    ) : (
                      <EyeOff size={18} color="#606A76" />
                    )}
                  </button>
                </div>
              </div>

              {/* Login button */}
              {localError || error ? (
                <p className="text-sm text-red-600">{localError || error}</p>
              ) : null}

              <button
                onClick={async () => {
                  setLocalError(null);
                  // basic validation
                  if (!fullName || !email || !password || !confirmPassword) {
                    setLocalError("Please fill in all fields.");
                    return;
                  }
                  if (password !== confirmPassword) {
                    setLocalError("Passwords do not match.");
                    return;
                  }

                  try {
                    const payload = {
                      email: email,
                      password: password,
                      full_name: fullName,
                      phone_number: phone || "+8801756018512",
                    };

                    const resultAction = await dispatch(signup(payload));
                    // Extract a friendly message from the thunk result
                    const friendly = extractMessageFromResult(resultAction);

                    if (resultAction?.meta?.requestStatus === "fulfilled") {
                      try {
                        window.alert(
                          String(friendly || "Registration successful")
                        );
                      } catch (e) {
                        console.log("Signup response:", friendly);
                      }

                      // Store email for OTP verification
                      dispatch(setCurrentEmail(email));
                      // Navigate to OTP verification page
                      navigate("/verify_email");
                      // Clear success in store
                      dispatch(clearSuccess());
                    } else {
                      try {
                        window.alert(String(friendly || "Signup failed"));
                      } catch (e) {
                        console.error(friendly);
                      }
                      setLocalError(friendly || "Signup failed");
                    }
                  } catch (err) {
                    const em = err?.message || "Signup failed";
                    try {
                      window.alert(String(em));
                    } catch (e) {
                      console.error(em);
                    }
                    setLocalError(em);
                  }
                }}
                disabled={loading}
                className={`w-full h-11 text-white font-semibold text-sm md:text-base ${
                  loading ? "bg-gray-400" : "bg-black"
                } rounded-full`}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {/* Terms and Privacy */}
              <p className="text-[15px] text-center text-[#222] mt-2 mb-1">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-blue-700 underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-700 underline">
                  Privacy Policy.
                </Link>
              </p>

              {/* Divider */}
              <div className="flex items-center gap-4 my-1">
                <div className="h-px flex-1 bg-[#E5E7EB]" />
                <span className="text-[16px] text-[#6B7280]">Or</span>
                <div className="h-px flex-1 bg-[#E5E7EB]" />
              </div>

              {/* Social buttons */}
              <button
                className="w-full h-11 rounded-md flex items-center justify-center gap-2 border"
                style={{
                  background: "#F3F6FB",
                  color: "#1C1C1C",
                  border: "1px solid #E5E7EB",
                }}
              >
                <GoogleIcon />
                <span className="text-sm">Sign in with Google</span>
              </button>

              <button
                className="w-full h-11 rounded-md flex items-center justify-center gap-2 border"
                style={{
                  background: "#F3F6FB",
                  color: "#1C1C1C",
                  border: "1px solid #E5E7EB",
                }}
              >
                <AppleIcon />
                <span className="text-sm">Sign in with Apple</span>
              </button>

              {/* Footer */}
              <p className="text-[16px] text-center mt-1 text-[#6B7280]">
                Do have an account?{" "}
                <Link to="/signin">
                  <span className="text-blue-600 font-bold">Log In</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Icons */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 533.5 544.3" width="18" height="18">
      <path
        fill="#EA4335"
        d="M533.5 278.4c0-18.6-1.7-36.5-4.8-53.7H272v101.6h146.9c-6.3 34.1-25.3 63-53.9 82.3v68h87.1c50.9-46.9 80.4-116 80.4-198.2z"
      />
      <path
        fill="#34A853"
        d="M272 544.3c72.7 0 133.8-24.1 178.5-65.7l-87.1-68c-24.2 16.2-55.1 25.7-91.4 25.7-70 0-129.3-47.2-150.5-110.6H31.5v69.5c44.5 88.2 135.5 149.1 240.5 149.1z"
      />
      <path
        fill="#4A90E2"
        d="M121.5 325.7c-10.5-31.4-10.5-65.4 0-96.8V159.4H31.5c-41.6 82.9-41.6 182.6 0 265.6l90-69.3z"
      />
      <path
        fill="#FBBC05"
        d="M272 106.2c39.5-.6 77.5 14 106.8 41.1l80.1-80.1C406.3 23.6 342.5-.2 272 0 167 0 76 60.9 31.5 149.1l90 69.8C142.7 153.3 202 106.2 272 106.2z"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M16.365 1.43c0 1.14-.466 2.222-1.235 3.025-.79.83-2.067 1.473-3.12 1.38-.15-1.308.504-2.6 1.258-3.43.814-.888 2.225-1.545 3.097-1.6.01.208 0 .41 0 .625ZM21.5 18.04c-.31.72-.676 1.395-1.1 2.03-.583.872-1.055 1.475-1.415 1.81-.61.59-1.263.9-1.958.92-.493.02-1.087-.143-1.785-.49-.697-.346-1.339-.516-1.93-.516-.61 0-1.268.17-1.972.513-.704.342-1.274.5-1.71.483-.67-.027-1.33-.327-1.98-.9-.43-.378-.935-.997-1.513-1.85-.65-.963-1.184-2.077-1.6-3.34-.45-1.385-.676-2.724-.676-4.02 0-1.485.321-2.77.964-3.855.506-.87 1.18-1.56 2.02-2.073.84-.512 1.742-.778 2.707-.797.53 0 1.223.163 2.08.49.857.327 1.406.495 1.65.505.18.007.81-.196 1.89-.61.99-.37 1.828-.523 2.514-.46 1.86.15 3.258.884 4.196 2.2-1.666 1.01-2.497 2.43-2.494 4.257.004 1.42.53 2.602 1.58 3.546.47.446 1 .79 1.59 1.03-.126.35-.263.69-.41 1.02Z" />
    </svg>
  );
}

export default SignUp;
