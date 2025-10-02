import React from 'react'
import herobg from "../../../public/aboutherobg.svg"

function Hero() {
  return (
    <section
      className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      {/* Overlay to ensure readable text over an image */}
      <div className="absolute inset-0 bg-black/20" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white leading-tight">
            What is Taught AI
          </h1>

          <p className="mt-4 text-md sm:text-base md:text-xl text-gray-200 max-w-3xl mx-auto">
            Taught AI is led by Ben — a Deputy Head of School, Maths Teacher, and Head of PSHE.
            With the power of Outstanding Prompts, I help schools harness AI to reduce workload, improve
            consistency, and make teaching more effective, inclusive, and aligned with school policies.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
