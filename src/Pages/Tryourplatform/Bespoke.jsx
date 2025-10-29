import React from "react";
import laptop from "../../../public/customaiside.svg";

function Bespoke() {
  return (
    <section className="py-12 font-bitter ">
      <div className="mx-auto  ">
        <h1 className="text-center text-4xl font-playfair font-bold  bg-[#f1f5f9] py-6">
          Bespoke Platforms
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#f1f5f9] py-10 px-10">
          <div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src={laptop}
                alt="Bespoke platform"
                className="w-full h-80 md:h-[36rem] object-cover rounded-xl"
              />
            </div>
          </div>

          <div className="prose max-w-none">
            <p className="text-3xl text-gray-800 mb-8">
              Taught AI can train your staff to create custom tools like the{" "}
              examples below, or partner with you to build a bespoke platform
              that enables every member of staff to harness AI in a fully
              policy-aligned way.
            </p>

            <h3 className="text-xl font-semibold mt-4 mb-2">
              Whether you need:
            </h3>
            <ul className="list-disc list-inside text-gray-700 mb-4 text-xl">
              <li>
                A bespoke, password-protected front end that directly hosts your
                custom AI tools{" "}
              </li>
              <li>Unrestricted access to our existing platforms</li>
              <li>Bespoke Google or OpenAI Tools</li>
            </ul>

            <p className="text-xl text-gray-600 mb-2 mt-10">
              I will tailor the solution to your staff’s needs and technical
              comfort level.
            </p>
            <p className="text-xl text-gray-600 mt-10">
              Get in touch to explore how we can design a platform that’s safe,
              effective, and completely bespoke to your setting.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Bespoke;
