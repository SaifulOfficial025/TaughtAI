import React from 'react'
import customaiside from "../../../public/customaiside.svg"


function CustomAITools() {
  return (
    <section className="py-12 bg-[#eef2ff]">
      <div className=" mx-auto  px-16 text-justify">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair  mb-4">Custom AI Tools: Taught AI specialises in designing and <br /> delivering custom AI tools and platforms for schools, <br /> each built to reflect your unique ethos, policies, <br />and priorities.</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: image placeholder (replace with an <img src={...} /> when ready) */}
          <div>
            <div className="w-full max-h-fit md:h-full bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <img src={customaiside} alt="Custom AI Tools" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: content */}
          <div className="prose max-w-none">
            <p className="text-2xl text-gray-800 mb-4 font-bold">
              My AI models are not generic — they are tailored, safe, and <br /> effective for educational use. Always fully aligned with <br />your school policies.
            </p>

            <p className="text-xl text-gray-800 mb-4 mt-16 font-bold">
              Some examples from my suite of bespoke AI solutions include:
            </p>

            <ul className="list-disc list-inside text-xl text-gray-700 mb-4">
              <li><strong>Scheme of Work GPT</strong> — Builds weekly, Ofsted-ready schemes with clear objectives, assessments, and delivery strategies.</li>
              <li><strong>Lesson Planner GPT</strong> — Creates full lesson plans tailored to subject, pupil needs (e.g. SEND, EAL), and curriculum intent.</li>
              <li><strong>Resource Generator GPT</strong> — Designs engaging worksheets and tasks matched to your classes’ needs and interests.</li>
              <li><strong>Policy &amp; Handbook GPT</strong> — Instant answers from your school’s policies, safeguarding guidance, and handbook.</li>
              <li><strong>Behaviour &amp; Strategy GPT</strong> — Offers targeted classroom and behaviour strategies based on specific learning needs.</li>
              <li><strong>SLT Strategy &amp; Policy GPT</strong> — Supports leaders with summaries, SIP actions, and Ofsted-aligned planning.</li>
            </ul>

            <p className="text-xl text-gray-600 mt-6">
              These tools are designed to slot into your existing workflows and reduce staff workload while improving consistency and quality.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomAITools
