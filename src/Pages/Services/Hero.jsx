import React from "react";
import herobg from "../../../public/tryourplatformbg.svg";

function Hero() {
  return (
    <section
      className="relative h-[30vh] sm:h-[40vh] md:h-[55vh] lg:h-[60vh] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      {/* Overlay to ensure readable text over an image */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight">
            AI Solutions Tailored to Your School’s Needs
          </h1>

          <p className="mt-4 text-base sm:text-lg md:text-2xl font-bitter text-gray-200 max-w-3xl mx-auto">
            Taught AI offers a bespoke programme for every school, recognising
            the unique values and challenges each faces. From staff CPD to click
            and use AI tools, everything is designed to align with your school’s
            policies and goals.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
