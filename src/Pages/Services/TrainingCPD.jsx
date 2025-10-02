import React from 'react'
import trainingcpdbg from "../../../public/trainingcpd.svg"

function TrainingCPD() {
  return (
    <section className="py-12 font-bitter">
      <div className=" mx-auto px-16 text-justify">
        <div className="mb-8">
          <h1 className="font-bitter text-3xl md:text-4xl  mb-4">Training and CPD: <br /> Building AI Confidence Across Your School</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: image placeholder (replace with an <img src={...} /> when ready) */}
          <div>
            <div className="w-full max-h-fit md:h-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img src={trainingcpdbg} alt="Training and CPD" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: content */}
          <div className="prose max-w-none">
            <p className="text-2xl text-gray-800 mb-4 ">
              I offer tailored training and CPD opportunities to help <br /> your staff build the knowledge, confidence,
              and skills <br /> needed to use AI effectively in their roles.
            </p>

            <p className="text-xl text-gray-600 mb-4">
              My training covers best practices for safe, ethical, and impactful AI use in education — all aligned
              with your school's policies and the latest national guidance.
            </p>

            <h3 className="text-2xl  mt-16 mb-4">I can support your school through:</h3>
            <ul className="list-disc list-inside text-xl text-gray-700 mb-4">
              <li>Whole-school INSET sessions</li>
              <li>Departmental or role-specific workshops (e.g. for SEND, English, SLT)</li>
              <li>Small group training for AI champions or working groups</li>
              <li>Ongoing coaching and implementation support</li>
            </ul>

            <p className="text-xl text-gray-600 mt-16">
              Staff will explore the tools available to them, learn how to use AI to save time and improve outcomes,
              and understand how to apply it in a way that supports pupils, reduces workload, and enhances consistency.
            </p>

            <p className="text-xl text-gray-600 mt-16">
              Every session is practical, policy-aligned, and fully bespoke to your setting.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TrainingCPD
