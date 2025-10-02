import React from 'react'
import help1 from "../../../public/help1.svg"
import help2 from "../../../public/help2.svg"
import help3 from "../../../public/help3.svg"



function Help() {
  return (
    <section className="py-12 max-w-7xl mx-auto px-6 mt-10">
      <div className="mx-auto ">
        <h2 className="text-center text-4xl md:text-5xl font-playfair font-bold mb-8">How I Help Schools</h2>

        {/* Row 1: Training & CPD (text left, image right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch ">
          <div className="order-2 md:order-1 bg-[#f1f5f9] p-8 h-64 md:h-72 lg:h-80 overflow-y-auto">
            <h3 className="text-3xl font-playfair font-semibold mb-3">Training & CPD</h3>
            <p className="text-2xl font-bitter text-gray-700 leading-relaxed">
              I deliver hands-on training sessions and CPD workshops that show staff how to create Outstanding Prompts
              and apply AI confidently in their daily work. From lesson planning to report writing, teachers learn how to
              get high-quality, policy-aligned results in minutes.
            </p>
          </div>

          <div className="order-1 md:order-2">
            {/* Image placeholder — replace with an <img src={...} /> when you add images */}
            <div className="w-full h-64 md:h-72 lg:h-80 bg-gray-100 rounded-sm overflow-hidden">
              <img src={help1} alt="Help 1" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Row 2: Policy Alignment (image left, text right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch ">
          <div>
            <div className="w-full h-64 md:h-72 lg:h-80 bg-gray-100 rounded-sm overflow-hidden">
              <img src={help2} alt="Help 2" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-[#f1f5f9] p-8 h-64 md:h-72 lg:h-80 overflow-y-auto">
            <h3 className="text-3xl font-playfair font-semibold mb-3">Policy Alignment</h3>
            <p className="text-2xl font-bitter text-gray-700 leading-relaxed">
              AI outputs are only valuable if they reflect the values and standards of the school. I help schools design
              prompt frameworks and usage guidelines that ensure every resource, email, or report is Ofsted-aligned,
              trauma-informed, SEND-friendly, and inclusive.
            </p>
          </div>
        </div>

        {/* Row 3: Practical Implementation (text left, image right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-stretch ">
          <div className="bg-[#f1f5f9] p-8 h-64 md:h-72 lg:h-80 overflow-y-auto">
            <h3 className="text-3xl font-playfair font-semibold mb-3">Practical Implementation</h3>
            <p className="text-2xl font-bitter text-gray-700 leading-relaxed">
              I provide step-by-step support for integrating AI into school systems. This includes building ready-to-use
              templates, setting up workflows for lesson planning and communication, and ensuring staff feel confident
              using AI tools without extra workload.
            </p>
          </div>

          <div>
            <div className="w-full h-64 md:h-72 lg:h-80 bg-gray-100 rounded-sm overflow-hidden">
              <img src={help3} alt="Help 3" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Help
