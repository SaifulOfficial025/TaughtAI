import React from 'react'
import TransformImg from '../../../public/transform.png'

function Transform() {

  return (
  <section className="bg-[#f3f3f3] max-w-9xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
        {/* Left: stacked image cluster */}
        <div className="relative flex justify-center">
          <img src={TransformImg} alt="Transform" className="w-90 h-auto" />
        </div>

        {/* Right: text content */}
        <div>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6">We're Here<br/>To Transform You!</h2>
          <p className="text-gray-700 max-w-md mb-8">
            As learners, people can enjoy great companionship from mentors and educators. We can help you develop and grow at your best.
          </p>

          <a href="#" className="inline-block bg-gray-800 text-white px-6 py-3 rounded-full shadow-sm text-4xl">Get Started</a>
        </div>
      </div>
    </section>
  )
}

export default Transform
