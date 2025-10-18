import React from 'react'
import ethos from '../../../public/ethos.svg'

/**
 * OurEthos42
 * Props:
 * - imageSrc: optional url for the right-hand image
 */
function OurEthos42({ imageSrc }) {
  const img = imageSrc || '/ethos.jpg'

  return (
    <div className="bg-white">
      {/* Quote card */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mx-auto bg-white border rounded-2xl p-10 shadow-sm" style={{ borderColor: '#e6e6e6' }}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-gray-900 leading-snug">60% of teachers are already using AI<br /></h2>
            <p className="mt-4 text-xl text-black font-bitter">Department of Education, November 2023</p>

            <div className="mt-8">
              <a href="#" className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full shadow-sm">Learn More</a>
            </div>
          </div>
        </div>
      </div>

      {/* Our Ethos section */}
      <section className="bg-[#f3f3f3]">
  <div className="mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-4xl md:text-6xl font-serif text-gray-900 mb-6">Our Ethos</h3>

            <p className="text-gray-900 mb-4 text-xl font-bitter">
              We developed Taught AI in 2025 to help schools unlock the potential of AI, while staying grounded in their values, staff, and students.
            </p>

            <p className="text-gray-900 mb-6 text-xl font-bitter">
              We believe technology should enhance education—improving outcomes, reducing workload, and creating greater consistency across school life.
            </p>

            <a href="#" className="inline-block bg-gray-800 text-white px-6 py-2 rounded-full shadow-sm text-xl">Learn More</a>
          </div>

          <div className="flex justify-end">
            <img src={ethos} alt="Our ethos" className="w-full max-w-sm md:max-w-md rounded-xl object-cover shadow" />
          </div>
        </div>
      </section>
    </div>
  )
}

export default OurEthos42
