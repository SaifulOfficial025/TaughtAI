import React from 'react'
import bespokebg from "../../../public/bespokebg.svg"

function Bespoke() {
  return (
    <section className="py-12 px-10 bg-[#f1f5f9] mt-20 font-bitter">
      <div className="mx-auto px-6">
        <h1 className="text-3xl md:text-4xl mb-6">A Bespoke AI Policy: Aligned with Your School's Framework</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: image placeholder - replace with an <img /> when ready */}
          <div>
            <div className="w-full rounded-xl overflow-hidden shadow-lg ">
              <img src={bespokebg} alt="Bespoke AI Policy" className="w-full h-full " />
            </div>
          </div>

          {/* Right: content */}
          <div className="prose max-w-none mt-20">
            <p className="text-2xl text-gray-800 mb-4 font-bold">
              Taught AI will provide your school with a fully tailored AI <br /> Policy, developed to align seamlessly with your existing <br /> policies and practices.
            </p>

            <h3 className="text-lg font-semibold  mb-2 mt-16">Your bespoke AI Policy will be written with direct reference to:</h3>

            <ul className="list-disc list-inside text-gray-700 mb-4 text-xl">
              <li>Safeguarding protocols</li>
              <li>Behaviour policies</li>
              <li>SEND and inclusion frameworks</li>
              <li>Data protection and GDPR compliance</li>
              <li>Staff expectations and professional conduct</li>
              <li>Curriculum planning and assessment standards</li>
            </ul>

            <p className="text-xl mt-10 text-gray-600 mb-3">
              I ensure that your policy not only reflects the latest government guidance and ethical <br /> standards for AI use in education, but also protects staff, pupils, and the integrity of your <br /> school's ethos.
            </p>

            <p className="text-xl text-gray-600 mt-10">
              Whether you're introducing AI into classrooms, leadership processes, or admin systems — your policy will provide clear, confident boundaries for safe and effective implementation.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bespoke
