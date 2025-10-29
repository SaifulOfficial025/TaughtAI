import React from "react";
import primaryImg from "../../../public/Primary crest.png";
import { Link } from "react-router-dom";

function Primary() {
  return (
    <section className="py-12">
      <div className="mx-auto  px-6">
        <h1 className="text-center text-4xl md:text-5xl font-playfair font-bold  bg-[#eef6ff] py-6">
          Taught AI Primary
        </h1>

        <div className="bg-[#eef6ff] rounded-lg py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              {/* container has responsive height; image preserves original ratio and scales to fit */}
              <div className=" h-64 md:h-80 lg:h-[36rem]  flex items-center justify-center">
                <img
                  src={primaryImg}
                  alt="Taught AI Primary"
                  className="max-h-full w-auto  "
                />
              </div>
            </div>

            <div className="text-justify">
              <p className="text-2xl font-playfair text-gray-900 mb-4">
                Taught AI Primary is a fictional mainstream primary school
                designed to demonstrate how custom AI tools can support
                inclusive, high-quality teaching across the key stages.
              </p>

              <p className="text-xl font-bitter text-gray-700 mb-4">
                These tools are designed to support the everyday challenges of
                the primary classroom—whether that’s planning for mixed-ability
                groups, scaffolding for pupils with SEND, or building confidence
                in children with EAL or speech and language needs.
              </p>

              <p className="text-xl font-bitter text-gray-700 mb-4">
                Drawing on trusted guidance from organisations like the EEF, The
                Bell Foundation, and national SEND frameworks, each tool is
                built to give staff a boost—helping you work smarter, teach more
                effectively, and support every child to thrive.
              </p>

              <div className="mt-6">
                <Link to="/primary/home">
                  <button className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full shadow-sm hover:opacity-95 text-xl">
                    Bespoke AI Solution
                  </button>
                </Link>
              </div>
              <button
                className="inline-block bg-gray-900 text-white px-6 py-3 rounded-full shadow-sm hover:opacity-95 text-xl mt-10"
                onClick={() =>
                  window.open("https://www.taughtaiprimary.co.uk", "_blank")
                }
              >
                School Microsite
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Primary;
