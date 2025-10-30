import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!oldPassword.trim() || !newPassword.trim()) {
      alert("Please fill both old and new password fields.");
      return;
    }

    // simulate password update (store to localStorage for demo)
    try {
      localStorage.setItem("admin_password", newPassword);
    } catch (err) {
      // ignore storage errors in demo
    }

    alert("Password is updated");
    // navigate to admin blog list
    navigate("/admin/bloglist");
  }
  return (
    <div className="min-h-screen">
      <Header />

      <section className="px-6 md:px-12 lg:px-20 py-12">
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">Change password</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="old"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Old password
              </label>
              <input
                id="old"
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2"
                placeholder="Enter current password"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="new"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New password
              </label>
              <input
                id="new"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border border-gray-200 rounded-md px-3 py-2"
                placeholder="Enter new password"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

export default ChangePassword;
