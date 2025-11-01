import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaPhoneAlt } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { submitGetInTouch } from "../../Redux/GetinTouch";

function Input({ label, id, ...props }) {
  return (
    <label className="block">
      <div className="text-xs text-gray-600 mb-2">{label}</div>
      <input
        id={id}
        {...props}
        className="w-full rounded-full border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </label>
  );
}

function Textarea({ label, id, ...props }) {
  return (
    <label className="block">
      <div className="text-xs text-gray-600 mb-2">{label}</div>
      <textarea
        id={id}
        {...props}
        className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </label>
  );
}

function GetInTouch() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "+44",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    // simple validation
    if (!form.firstName || !form.email) {
      setStatus({
        type: "error",
        message: "Please provide your name and email.",
      });
      return;
    }

    try {
      const payload = {
        first_name: form.firstName,
        last_name: form.lastName,
        phone_number: form.phone,
        email: form.email,
        message: form.message,
      };

      const resultAction = await dispatch(submitGetInTouch(payload));
      if (resultAction?.meta?.requestStatus === "fulfilled") {
        setStatus({
          type: "success",
          message:
            resultAction.payload?.message ||
            "Thanks — I will be in touch shortly.",
        });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          country: "+44",
          phone: "",
          message: "",
        });
      } else {
        setStatus({
          type: "error",
          message:
            resultAction?.payload?.message ||
            resultAction?.error?.message ||
            "Submission failed",
        });
      }
    } catch (err) {
      setStatus({ type: "error", message: err.message || "Submission failed" });
    }
  }

  return (
    <div className="relative mb-12">
      {/* background block covering 75% of the section height */}
      <div
        className="absolute inset-x-0 top-0 h-[75%] bg-[#fff6f4]"
        aria-hidden="true"
      />

      <div className="relative z-10 py-12 sm:py-20">
        <section className="max-w-7xl mx-auto px-6 py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Left text */}
            <div className="text-center lg:text-left">
              <h2 className="font-bitter text-3xl md:text-3xl lg:text-4xl text-gray-900 leading-tight mb-6 max-w-xl mx-auto lg:mx-0">
                If you would like a free demonstration of how AI can be used
                safely and effectively in your school, kindly share your details
                below and I will be in touch.
              </h2>
              <p className="text-gray-600 mb-8 font-bitter text-2xl">
                I look forward to hearing from you.
              </p>

              <div className="space-y-6 text-gray-700">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-2xl">
                    <FaPhoneAlt />
                  </span>
                  <div className="text-xl font-bold font-bitter">
                    07814559767
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <span className="text-2xl">
                    <CiMail />
                  </span>
                  <div className="text-xl font-bold font-bitter">
                    ben@taughtai.co.uk
                  </div>
                </div>
              </div>
            </div>

            {/* Right form card */}
            <div className="w-full">
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10">
                <h3 className="text-3xl font-serif text-gray-900 mb-6 text-center font-bold">
                  Get in touch
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      id="firstName"
                      label="First Name"
                      value={form.firstName}
                      onChange={update}
                    />
                    <Input
                      name="lastName"
                      id="lastName"
                      label="Last Name"
                      value={form.lastName}
                      onChange={update}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      name="email"
                      id="email"
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={update}
                    />

                    <label className="block">
                      <div className="text-xs text-gray-600 mb-2">Phone</div>
                      <div className="flex gap-2">
                        <select
                          name="country"
                          value={form.country}
                          onChange={update}
                          className="rounded-full border border-gray-200 px-3 py-2 text-sm bg-white"
                        >
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇪🇺 +44</option>
                        </select>
                        <input
                          name="phone"
                          value={form.phone}
                          onChange={update}
                          className="flex-1 rounded-full border border-gray-200 px-4 py-2 text-sm"
                          placeholder="Phone"
                        />
                      </div>
                    </label>
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      id="message"
                      label="Write Your Message"
                      value={form.message}
                      onChange={update}
                    />
                  </div>

                  <div className="flex items-center justify-start gap-4">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gray-900 text-white rounded-full hover:bg-black transition"
                    >
                      Submit
                    </button>
                    {status && (
                      <div
                        className={`text-sm ${
                          status.type === "error"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {status.message}
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default GetInTouch;
