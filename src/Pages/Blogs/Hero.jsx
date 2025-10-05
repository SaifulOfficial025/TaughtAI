import React from 'react'
import herobg from '../../../public/bloghero.svg'

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
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight">
                Insights and Updates from Taught AI
              </h1>
    
              <p className="mt-4 font-bitter text-md sm:text-sm md:text-xl text-gray-200 max-w-3xl mx-auto px-2 sm:px-0">
                Stay informed with the latest news, expert insights, and educational resources from Taught AI. Our blog provides valuable content to help you harness the power of AI in education.
              </p>
            </div>
          </div>
        </section>
  )
}

export default Hero
