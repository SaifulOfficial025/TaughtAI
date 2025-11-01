import React, { useState } from "react";
import SignupBackground from "../../../public/authenticationbg.svg";
import MailImage from "../../../public/mailbox.svg";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../public/logowhite.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPassword,
  clearError,
  clearSuccess,
  setCurrentEmail,
} from "../../Redux/Authentication";

function ForgetPasswordEmail() {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((s) => s.auth || {});

  const handleSendEmail = async () => {
    setLocalError(null);

    // Validation
    if (!email) {
      setLocalError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    try {
      const payload = { email };
      const resultAction = await dispatch(forgotPassword(payload));

      if (resultAction?.meta?.requestStatus === "fulfilled") {
        // Store email for OTP verification
        dispatch(setCurrentEmail(email));
        // Set flag to indicate this is from forgot password flow
        sessionStorage.setItem("fromForgotPassword", "true");
        // Show success alert
        alert(resultAction.payload?.message || "OTP sent to your email.");
        dispatch(clearSuccess());
        // Navigate to verify email page
        navigate("/verify_email");
      } else {
        const errMsg =
          resultAction?.payload?.message ||
          resultAction?.error?.message ||
          "Failed to send OTP";
        setLocalError(errMsg);
      }
    } catch (err) {
      setLocalError(err.message || "Failed to send OTP");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 h-full">
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

        {/* RIGHT: form card */}
        <div className="flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-center mb-4">
                Forgot Your Password?
              </h2>
              <p className="text-sm text-gray-500 text-center mb-6">
                Enter your email to reset your password.
              </p>

              <div className="flex justify-center mb-6">
                <img src={MailImage} alt="mail" className="w-40 h-40" />
              </div>

              {/* Error display */}
              {(localError || error) && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{localError || error}</p>
                </div>
              )}

              <label className="text-sm text-gray-700 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-3 rounded-md border border-gray-300 text-sm md:text-base outline-none mb-4"
              />

              <button
                onClick={handleSendEmail}
                disabled={loading}
                className="w-full h-11 rounded-full bg-black text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Mail"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordEmail;
