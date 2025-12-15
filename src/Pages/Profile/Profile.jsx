import React, { useState, useRef, useEffect } from "react";
import Owner from "../../../public/owner.jpg";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  updateProfile,
  clearSuccess,
  getProfileData,
} from "../../Redux/Authentication";

function Profile() {
  const { user, loading } = useSelector((state) => state.auth || {});

  // Helper function to extract first and last name from full name
  const getFirstLastName = (fullName) => {
    if (!fullName) return { firstName: "", lastName: "" };
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    return { firstName, lastName };
  };

  const [editing, setEditing] = useState(false);
  const [localError, setLocalError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const [form, setForm] = useState(() => {
    // prefer backend-provided first_name/last_name when available;
    // fall back to derived values from full_name
    const { firstName: derivedFirst, lastName: derivedLast } = getFirstLastName(
      user?.full_name
    );
    return {
      firstName: user?.first_name || derivedFirst || "",
      lastName: user?.last_name || derivedLast || "",
      fullName: user?.full_name || "",
      phone: user?.phone_number || "",
      email: user?.email || "",
    };
  });

  // Update form when user data changes
  useEffect(() => {
    if (user) {
      // prefer backend first_name/last_name; only derive from full_name when not provided
      const { firstName: derivedFirst, lastName: derivedLast } =
        getFirstLastName(user.full_name);
      setForm({
        firstName: user.first_name || derivedFirst || "",
        lastName: user.last_name || derivedLast || "",
        fullName: user.full_name || "",
        phone: user.phone_number || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // fetch fresh profile data from API when visiting the page
  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = () => {
    // Will be replaced by async save below when dispatching updateProfile
    return;
  };

  // new async save handler
  const handleSaveAsync = async () => {
    setLocalError(null);
    // basic validation (you can extend validation as needed)
    if (!form.fullName && !form.firstName && !form.lastName) {
      setLocalError("Please provide at least a name");
      return;
    }

    try {
      const payload = {
        full_name: form.fullName,
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phone,
        image: imageFile || undefined,
      };

      const resultAction = await dispatch(updateProfile(payload));
      if (resultAction?.meta?.requestStatus === "fulfilled") {
        toast.success(
          resultAction.payload?.message || "Profile updated successfully"
        );
        dispatch(clearSuccess());
        setEditing(false);
        // cleanup local image preview
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setImageFile(null);
      } else {
        const errMsg =
          resultAction?.payload?.message ||
          resultAction?.error?.message ||
          "Update failed";
        setLocalError(errMsg);
        toast.error(errMsg);
      }
    } catch (err) {
      setLocalError(err.message || "Update failed");
    }
  };

  const handleCancel = () => {
    // Reset form to original user data and exit edit mode
    if (user) {
      const { firstName, lastName } = getFirstLastName(user.full_name);
      setForm({
        firstName: firstName || user.first_name || "",
        lastName: lastName || user.last_name || "",
        fullName: user.full_name || "",
        phone: user.phone_number || "",
        email: user.email || "",
      });
    }
    setEditing(false);
  };

  const firstInputRef = useRef(null);

  useEffect(() => {
    if (editing) firstInputRef.current?.focus();
  }, [editing]);

  // cleanup preview URL when component unmounts or preview changes
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Show loading while fetching profile; if not logged in, show login prompt
  if (loading && !user) {
    return (
      <section>
        <Header />
        <div className="min-h-screen bg-white px-8 py-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Loading profile...
            </h2>
            <p className="text-gray-600">
              Please wait while we fetch your profile information.
            </p>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  if (!user) {
    return (
      <section>
        <Header />
        <div className="min-h-screen bg-white px-8 py-10 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Please log in to view your profile
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in to access your profile information.
            </p>
            <a
              href="/signin"
              className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800"
            >
              Go to Login
            </a>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <div className="min-h-screen bg-white px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="">
            {/* Left: avatar + name + personal info */}
            <div className="">
              <div className="">
                <div className="w-44 h-44 rounded-full overflow-hidden shadow-md">
                  <img
                    src={previewUrl || user?.image || Owner}
                    alt="owner"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Image upload when editing */}
                {editing && (
                  <div className="mt-3">
                    <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          if (f) {
                            setImageFile(f);
                            const url = URL.createObjectURL(f);
                            setPreviewUrl(url);
                          }
                        }}
                        className="hidden"
                      />
                      <span className="px-3 py-1 rounded-md bg-gray-100 hover:bg-gray-200">
                        Change photo
                      </span>
                    </label>
                  </div>
                )}

                <div>
                  <h2 className="text-4xl md:text-5xl font-serif font-semibold mt-10">
                    {user?.full_name || user?.email || "User"}
                  </h2>

                  <div className="mt-8">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-serif">
                        Personal Information
                      </h3>

                      <button
                        onClick={() => setEditing(true)}
                        className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                      >
                        <FaEdit className="w-4 h-4" />
                        Edit Details
                      </button>
                    </div>

                    <div className="mt-6 space-y-6">
                      {/* Full Name */}
                      <div>
                        <p className="text-xs text-gray-400">Full Name</p>
                        {!editing ? (
                          <p className="mt-2 text-base text-gray-900">
                            {form.fullName || "Not provided"}
                          </p>
                        ) : (
                          <input
                            ref={firstInputRef}
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            className="mt-2 w-80 border border-gray-200 rounded-md px-3 py-2 text-sm"
                            placeholder="Enter your full name"
                          />
                        )}
                      </div>
                      {/* First Name */}
                      <div>
                        <p className="text-xs text-gray-400">First Name</p>
                        {!editing ? (
                          <p className="mt-2 text-base text-gray-900">
                            {form.firstName || "Not provided"}
                          </p>
                        ) : (
                          <input
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="mt-2 w-64 border border-gray-200 rounded-md px-3 py-2 text-sm"
                            placeholder="Enter your first name"
                          />
                        )}
                      </div>
                      {/* Last Name */}
                      <div>
                        <p className="text-xs text-gray-400">Last Name</p>
                        {!editing ? (
                          <p className="mt-2 text-base text-gray-900">
                            {form.lastName || "Not provided"}
                          </p>
                        ) : (
                          <input
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            className="mt-2 w-64 border border-gray-200 rounded-md px-3 py-2 text-sm"
                            placeholder="Enter your last name"
                          />
                        )}
                      </div>
                      {/* Phone */}
                      <div>
                        <p className="text-xs text-gray-400">Phone Number</p>
                        {!editing ? (
                          <p className="mt-2 text-base text-gray-900">
                            {form.phone || "Not provided"}
                          </p>
                        ) : (
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            className="mt-2 w-64 border border-gray-200 rounded-md px-3 py-2 text-sm"
                            placeholder="Enter your phone number"
                          />
                        )}
                      </div>
                      {/* Email */}
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        {!editing ? (
                          <p className="mt-2 text-base text-gray-900">
                            {form.email || "Not provided"}
                          </p>
                        ) : (
                          <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="mt-2 w-80 border border-gray-200 rounded-md px-3 py-2 text-sm bg-gray-50"
                            placeholder="Enter your email"
                            disabled // Email should not be editable
                          />
                        )}
                      </div>
                      {/* Auth Provider
                      <div>
                        <p className="text-xs text-gray-400">Sign Up Method</p>
                        <p className="mt-2 text-base text-gray-900">
                          {user?.auth_provider === "email_password"
                            ? "Email & Password"
                            : user?.auth_provider || "Not available"}
                        </p>
                      </div> */}
                      {editing && (
                        <div className="pt-4">
                          {localError && (
                            <p className="text-sm text-red-600 mb-2">
                              {localError}
                            </p>
                          )}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={handleSaveAsync}
                              className="px-6 py-2 rounded-full bg-black text-white font-semibold"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="px-4 py-2 rounded-md border border-gray-200"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* edit button moved next to heading above */}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Profile;
