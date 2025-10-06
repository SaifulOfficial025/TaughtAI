import React, { useState, useRef, useEffect } from 'react'
import Owner from "../../../public/owner.svg";
import Header from '../../Shared/Header';
import Footer from '../../Shared/Footer';
import { FaEdit } from "react-icons/fa";

function Profile() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    firstName: 'Ben',
    lastName: 'Duggan',
    phone: '1980012351',
    email: 'ben@gmail.com',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSave = () => {
    // For now we simply exit edit mode — persistence can be added later
    setEditing(false);
  };

  const handleCancel = () => {
    // reset form to current displayed values and exit edit mode
    setForm((s) => ({ ...s }));
    setEditing(false);
  };
  
  const firstInputRef = useRef(null);

  useEffect(() => {
    if (editing) firstInputRef.current?.focus();
  }, [editing]);
  return (
    <section>
        <Header />
    <div className="min-h-screen bg-white px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="">
          {/* Left: avatar + name + personal info */}
          <div className="">
            <div className="">
              <div className="w-44 h-44 rounded-full overflow-hidden shadow-md">
                <img src={Owner} alt="owner" className="w-full h-full object-cover" />
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-semibold mt-10">Ben Duggan</h2>

                <div className="mt-8">
                  <div className="flex items-start justify-between">
                    <h3 className="text-2xl font-serif">Personal Information</h3>

                    <button onClick={() => setEditing(true)} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                      <FaEdit className="w-4 h-4" />
                      Edit Details
                    </button>
                  </div>

                  <div className="mt-6 space-y-6">
                    {/* First Name */}
                    <div>
                      <p className="text-xs text-gray-400">First Name</p>
                      {!editing ? (
                          <p className="mt-2 text-base text-gray-900">{form.firstName}</p>
                        ) : (
                          <input
                            ref={firstInputRef}
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            className="mt-2 w-64 border border-gray-200 rounded-md px-3 py-2 text-sm"
                          />
                        )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <p className="text-xs text-gray-400">Last Name</p>
                      {!editing ? (
                        <p className="mt-2 text-base text-gray-900">{form.lastName}</p>
                      ) : (
                        <input
                          name="lastName"
                          value={form.lastName}
                          onChange={handleChange}
                          className="mt-2 w-64 border border-gray-200 rounded-md px-3 py-2 text-sm"
                        />
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <p className="text-xs text-gray-400">Phone Number</p>
                      {!editing ? (
                        <p className="mt-2 text-base text-gray-900">{form.phone}</p>
                      ) : (
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="mt-2 w-64 border border-gray-200 rounded-md px-3 py-2 text-sm"
                        />
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <p className="text-xs text-gray-400">Email</p>
                      {!editing ? (
                        <p className="mt-2 text-base text-gray-900">{form.email}</p>
                      ) : (
                        <input
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          className="mt-2 w-80 border border-gray-200 rounded-md px-3 py-2 text-sm"
                        />
                      )}
                    </div>

                    {editing && (
                      <div className="pt-4">
                        <div className="flex items-center gap-3">
                          <button onClick={handleSave} className="px-6 py-2 rounded-full bg-black text-white font-semibold">Save</button>
                          <button onClick={handleCancel} className="px-4 py-2 rounded-md border border-gray-200">Cancel</button>
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
  )
}

export default Profile
