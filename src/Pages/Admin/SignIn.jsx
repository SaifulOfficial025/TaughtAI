import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Authentication";
import { useNavigate } from "react-router-dom";
import SignupBackground from "../../../public/authenticationbg.svg";
import Logo from "../../../public/logowhite.svg";
import { Link } from "react-router-dom";
function SignIn() {
  const [showPwd, setShowPwd] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ALLOWED_EMAIL = "afridi.cse5.bu@gmail.com";

  return (
    <div className="min-h-screen w-full">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full p-4 sm:p-6 lg:p-8 gap-6 items-stretch">
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

        {/* RIGHT: Sign-in Form */}
        <div className="flex items-center justify-center px-4 sm:px-6 md:px-10 py-8 sm:py-10">
          <div className="w-full max-w-md mx-auto">
            <h1
              className="text-xl sm:text-2xl md:text-[26px] font-bold text-center"
              style={{ color: "#1C1C1C" }}
            >
              Log In to Continue
            </h1>
            <p className="text-[16px] mt-1 text-center text-[#606A76]">
              Log in to continue where you left off and unlock more personalized
              insights.
            </p>

            <div className="mt-6 space-y-4">
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
                  placeholder=""
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
                    placeholder=""
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
                <div className="mt-5 text-right">
                  <span className="text-gray-500 mt-2 text-sm">
                    Forget Password?{" "}
                  </span>
                  <Link to="/forgot_password_email">
                    <span className="text-blue-600 font-semibold hover:underline text-sm">
                      Reset it here
                    </span>
                  </Link>
                </div>
              </div>

              {/* Login button */}
              <div>
                <button
                  onClick={async () => {
                    // strict email restriction for this page
                    if (email.trim().toLowerCase() !== ALLOWED_EMAIL) return;
                    if (!password) {
                      alert("Please enter your password.");
                      return;
                    }
                    try {
                      setLoading(true);
                      const payload = { email: email.trim(), password };
                      // dispatch login thunk and unwrap result so failures throw
                      const result = await dispatch(login(payload)).unwrap();
                      console.log("login result:", result);

                      // success - save role immediately
                      localStorage.setItem("role", "admin");
                      console.log("Role set to admin");

                      // Force full page navigation to ensure route guard sees tokens
                      console.log(
                        "Forcing full page navigation to /admin/bloglist"
                      );
                      window.location.href = "/admin/bloglist";
                    } catch (err) {
                      // err may be a rejected action or thrown error
                      const msg =
                        err?.message ||
                        (err?.payload && err.payload.message) ||
                        "Login failed";
                      alert(msg);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  disabled={
                    loading || email.trim().toLowerCase() !== ALLOWED_EMAIL
                  }
                  className={`w-full h-11 rounded-full text-white font-semibold text-sm sm:text-sm md:text-base ${
                    loading || email.trim().toLowerCase() !== ALLOWED_EMAIL
                      ? "bg-gray-400"
                      : "bg-black"
                  }`}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
