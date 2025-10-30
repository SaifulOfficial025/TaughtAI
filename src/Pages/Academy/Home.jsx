import React, { useEffect } from "react";
import Footer from "../../Shared/Footer";
import Header from "./Header";
import AcademyImg from "../../../public/academy.svg";
import WhatImg from "../../../public/Love.svg";

function Home() {
  // ensure page always starts at top when this route/component mounts
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0 });
    } catch (err) {
      // ignore in non-browser environments
    }
  }, []);
  return (
    <div className="bg-white text-gray-900">
      <Header />

      {/* HERO */}
      <section className="mx-auto px-10 sm:px-10 lg:px-10 py-10 md:py-16 grid md:grid-cols-2 gap-2 items-center">
        <div className="">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4">
            Welcome to the official AI hub <br /> for staff at Taught AI
            Academy.
          </h1>
          <h1 className="text-3xl mt-10">A quick but vital reminder: </h1>
          <p className="text-sm md:text-base text-gray-700 max-w-xl mt-5">
            Never enter any personal data about pupils or staff into any AI
            chat. If in doubt, speak to the DSL or a member of SLT before
            proceeding.
          </p>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={AcademyImg}
            alt="Taught AI Academy badge"
            className=" rounded-xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* PINK BAND - Why use this portal */}
      <section id="why" className="bg-pink-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-2">
            Why use this portal
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto mt-10">
            To ensure AI is used safely, effectively, and in alignment with our
            school's policies, all staff must use this dedicated platform and
            its bespoke tools only. This guarantees compliance with our AI
            Policy and supports consistent, inclusive, and ethical teaching
            practices.
          </p>
        </div>
      </section>

      {/* WHAT CAN YOU DO HERE */}
      <section className=" mx-auto px-10 sm:px-10 lg:px-10 py-12 md:py-16 ">
        <div></div>
        <h3 className="text-5xl font-serif text-gray-900 mb-3 ">
          What can you do here?
        </h3>
        <p className="text-xl text-gray-600 mb-10">
          Explore a wide range of features designed to enhance your <br />{" "}
          experience. Whether you're looking to access services, get <br />{" "}
          valuable insights, or manage tasks, everything you need is <br /> just
          a click away.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div>
            <div className="rounded-lg overflow-hidden shadow-md">
              <img
                src={WhatImg}
                alt="Love to learn"
                className="w-full  object-cover"
              />
            </div>
          </div>
          <div className="space-y-8 mt-16">
            <div>
              <h4 className="text-4xl  text-gray-900">Take the tutorial</h4>
              <p className="text-xl text-gray-600 mt-2">
                {" "}
                <a href="/tutorial" className="text-blue-600 underline">
                  Click here for a brief tutorial
                </a>{" "}
                on how to use the platform and access each tool effectively.
              </p>
            </div>

            <div>
              <h4 className="text-4xl  text-gray-900">Jump straight in</h4>
              <p className="text-xl text-gray-600 mt-2">
                Already confident? Head straight to the AI tools from the menu
                above.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RESPONSIBLE USE REMINDER */}
      <section className=" mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white">
          <h3 className="text-6xl md:text-5xl font-serif  text-gray-900 mb-3">
            Responsible use reminder.
          </h3>
          <p className="text-xl md:text-2xl text-gray-600 mb-4">
            Responsible AI use reminder before using any tool, please remember:
            These AI <br /> tools are tailored to our school policies, including
            safeguarding, SEND, inclusion, <br /> and GDPR. Use them
            professionally, ethically, and within the boundaries of our <br />{" "}
            staff expectations. Never share student-identifiable data or use
            personal <br /> accounts for AI interactions.
          </p>
          <a
            href="/policy"
            className="text-2xl text-black underline font-bold "
          >
            View the full policy
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
