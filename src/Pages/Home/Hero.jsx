import React from "react";
import backgroundImage from "../../../public/herobg.svg";
/**
 * Hero component
 * - Accepts an optional `backgroundImage` prop (string URL). If not provided, background is empty and user can add later.
 */
function Hero() {
  return (
    <section className="relative">
      {/* Background image layer (user can provide image via prop or CSS later) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/10" aria-hidden="true" />

      {/* Content */}
      <div className="relative px-6 py-20 sm:py-28">
        <div className="max-w-4xl sm:max-w-6xl">
          <h1 className="text-white font-playfair font-bold text-3xl sm:text-4xl md:text-5xl leading-relaxed md:leading-relaxed">
            Taught AI helps schools integrate artifical
            <br /> intelligence effectively, ensuring its use
            <br /> aligns with their policies, ethos and goals.
          </h1>

          <p className="mt-6 text-white/90 font-bitter text-base sm:text-lg md:text-2xl">
            Taught AI schools across the UK to integrate AI effectively while
            maintaining educational excellence and regulatory compliance.
          </p>

          <a
            href="#"
            className="inline-block mt-8 bg-[#e8e6e6] text-gray-900 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-sm hover:opacity-95 text-base sm:text-lg font-playfair"
          >
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;
