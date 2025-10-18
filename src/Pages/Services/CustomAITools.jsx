import React from 'react'
import customaiside from "../../../public/customaiside.svg"


function CustomAITools() {
  return (
    <section className="py-12 bg-[#eef2ff] font-bitter">
      <div className=" mx-auto  px-16 text-justify">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl  mb-4">Custom AI Tools: Taught AI specialises in designing and <br /> delivering custom AI tools and platforms for schools, <br /> each built to reflect your unique ethos, policies, <br />and priorities.</h1>
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
            <p className="text-2xl text-gray-800 mb-4 ">
              My AI models are not generic — they are tailored, safe, and <br /> effective for educational use. Always fully aligned with <br />your school policies.
            </p>

            <p className="text-2xl text-gray-800 mb-4 mt-16 font-semibold">
              Policy-Aligned AI Tools — Built for Real Classrooms
            </p>
            <p className="text-lg text-gray-800 mb-4">
              Every Taught AI tool is designed to be safe, single-function, and fully aligned with your school’s safeguarding, behaviour, and curriculum frameworks.
              Each one draws on your school’s policy bank, the Ofsted Education Inspection Framework, and evidence from the Education Endowment Foundation (EEF) and other leading research — ensuring that staff receive guidance that is not just efficient, but pedagogically sound and policy-compliant.
              The tools are incredibly easy to use: staff simply select their role or need, answer a few clear questions, and the AI generates a response that’s compliant, consistent, and ready to apply.
              No prompting expertise required — just safe, structured support aligned with the real priorities of school life.
            </p>

            <p className="text-xl text-gray-800 mb-4 font-semibold">
              Behaviour & Classroom Strategies Tool
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Provides instant, evidence-based strategies for managing behaviour, supporting emotional regulation, and maintaining consistency across classrooms.
              Responses are trauma-informed, policy-aligned, and tailored to the pupil’s profile — ensuring that every intervention reflects your behaviour policy, safeguarding guidance, and current best practice from the EEF.
            </p>

            <p className="text-xl text-gray-800 mb-4 font-semibold">
              Lesson Generator
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Creates fully structured, Ofsted-aligned lessons in minutes — including objectives, starter activities, differentiation strategies, assessment for learning, and homework tasks.
              Each plan is tailored to your curriculum and pupils’ needs (SEND, EAL, ASD, or SEMH) and draws on EEF research and national teaching standards to ensure quality and consistency across departments.
            </p>

            <p className="text-xl text-gray-800 mb-4 font-semibold">
              Heads & SLT Assistant
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Supports senior leaders with clear, compliant guidance on communication, policy writing, staff feedback, and parental correspondence.
              Every output is grounded in school policy, safeguarding expectations, and Ofsted frameworks, ensuring leadership communication remains professional, transparent, and aligned with school values.
            </p>

            <p className="text-lg text-gray-800 mt-10">
              Each Taught AI tool is securely hosted and customised for your setting — giving staff a safe, guided, and effortless way to use AI that improves consistency, reduces workload, and strengthens the culture of safeguarding and excellence across your school.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomAITools
