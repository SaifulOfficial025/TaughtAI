import React, { useState } from "react";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import GetinTouchbg from "../../../public/getintouchbg.png";

function GetinTouch() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: wire to API - currently just log
    console.log("Contact submit", form);
    // show a tiny UX feedback
    alert("Thanks — your message has been submitted (demo).");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
  }

  return (
    <section className="min-h-screen flex flex-col font-playfair">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
          <div className="flex items-start">
            <div className="p-12">
              <p className="text-lg md:text-md leading-relaxed mb-6">
                Would you like a free demonstration of how effectively AI can be
                used in your school?
              </p>
              <p className="text-lg md:text-md leading-relaxed mb-6">
                Kindly share your details and I will be in touch.
              </p>
              <p className="text-lg md:text-md leading-relaxed">
                I look forward to hearing from you
              </p>
            </div>
          </div>

          <div className="flex items-start justify-end">
            <div className="p-12 text-right">
              <div className="flex flex-col items-end space-y-3 pt-8">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="text-lg">07814559767</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="text-lg">ben@taughtai.co.uk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative flex-1 bg-cover py-16 mt-20 mb-40"
        style={{
          backgroundImage: `url(${GetinTouchbg})`,
          backgroundPosition: 'center 70%',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          marginTop: '300px',
        }}
      >
      


        <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            <div className="relative lg:col-span-2 flex justify-center">
              <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-10 w-full lg:w-[900px] relative -mt-60 border-2 border-gray-200">
                <h2 className="text-3xl md:text-4xl font-serif text-center mb-8 font-bold">Get in touch</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">First Name</label>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Last Name</label>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Email</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-100"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-gray-600 mb-2">Phone</label>
                      <div className="flex items-center gap-2">
                        <select className="text-sm bg-white border border-gray-200 rounded-full px-3 py-2 focus:outline-none">
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+91">🇮🇳 +91</option>
                        </select>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={handleChange}
                          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-2">Write Your Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full border border-gray-200 rounded-xl px-4 py-4 text-sm focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit button anchored bottom-left inside card */}
                  <div className="h-12" />
                </form>

                <button
                  type="button"
                  onClick={(e) => { e.preventDefault(); document.querySelector('form').requestSubmit(); }}
                  className="absolute left-8 bottom-8 bg-gray-800 text-white px-6 py-2 rounded-full text-sm font-medium shadow-md"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
}

export default GetinTouch;
