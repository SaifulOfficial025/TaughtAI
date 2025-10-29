import React from "react";
import academyImg from "../../../public/Taught AI Academy .jpg";
import { Link } from "react-router-dom";

function Academy() {
  return (
    <section className="py-12">
      <div className="mx-auto  px-10">
        <h1 className="text-center text-4xl md:text-5xl font-playfair font-bold mb-10">
          Taught AI Academy
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center text-justify">
          <div className="pr-4">
            <p className="text-2xl text-gray-800 mb-6 ">
              Taught AI Academy is a fictional alternative provision school
              created to showcase the real-world power of custom AI tools in
              education.
            </p>

            <p className="text-xl font-bitter text-gray-600 mb-4">
              The tools developed for this setting are designed with specialist
              provision in mind—drawing on the UK's leading research into
              supporting pupils with low literacy and numeracy, as well as those
              with complex learning needs including ADHD, ASD, EAL, and low
              confidence.
            </p>

            <p className="text-xl font-bitter text-gray-600 mb-4">
              Each tool is built to massively upskill school staff, helping
              teachers, SENCOs, and leaders provide targeted, inclusive support
              while reducing workload and improving consistency.
            </p>

            <p className="text-xl font-bitter text-gray-600 mb-6">
              Explore the tools today and see how they could transform your
              day-to-day practice—whether you're in the classroom, leading a
              team, or supporting vulnerable learners.
            </p>

            <div>
              <Link to="/academy/home">
                <button className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full shadow-sm hover:opacity-95 text-xl">
                  Bespoke AI Solution
                </button>
              </Link>
            </div>
            <button
              className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full shadow-sm hover:opacity-95 text-xl mt-10"
              onClick={() =>
                window.open("https://www.taughtaiacademy.co.uk", "_blank")
              }
            >
              School Microsite
            </button>
          </div>

          <div>
            {/* container has responsive height; image preserves original ratio and scales to fit */}
            <div className=" h-64 md:h-80 lg:h-[36rem]  flex items-center justify-center">
              <img
                src={academyImg}
                alt="Taught AI Academy"
                className="max-h-full w-auto  "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Academy;
