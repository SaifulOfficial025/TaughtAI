import React from 'react'
import ownerpic from "../../../public/owner.svg"

function OwnerDetails() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-xl text-gray-700 mb-6"><span className='font-bold'>Taught AI</span> is me, Ben. I am a Deputy Head of School, Maths Teacher, <br /> and Head of PSHE at an inner-city pupil referral unit.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: image */}
          <div>
            <div className="rounded-xl overflow-hidden ">
              <img src={ownerpic} alt="Owner" className="w-full h-auto block rounded-xl" />
            </div>
          </div>

          {/* Right: long content */}
          <div className="text-xl text-gray-800 leading-relaxed text-justify">
            <p className="mb-2">As a maths teacher by trade, I’ve always been intrigued by AI.</p>

            <p className="mb-2">Initially, I was underwhelmed—simple requests like “Improve this email,” “Refine my reports,” or “Plan a PSHE lesson on county lines” often yielded generic responses.</p>

            <p className="mb-2">However, after training in how to truly harness the power of AI through what I call Outstanding Prompts, my perspective shifted entirely.</p>

            <p className="mb-2">I witnessed how AI could generate a fully Ofsted-aligned, pedagogically sound, Gatsby-benchmarked lesson—complete with key terms, multiple-choice questions, GCSE-style worksheets, and homework—all structured into slides with just a few well-crafted prompts. Ten words into a 25-minute lesson.</p>

            <p className="mb-2">Beyond lesson planning, AI transformed how my team communicated with parents, ensuring emails were fully aligned with school policies, trauma-informed, and used appropriate SEND and inclusive language. The impact on workload reduction and standardisation was undeniable.</p>

            <p className="mb-2">I also have solid experience delivering CPD to schools, particularly on the effective use of IT and software tools to improve teaching, learning, and leadership. Now, I focus on helping schools do the same with AI—demystifying the tech and making it work in the real world of education.</p>

            <p className="mb-2">Seeing how AI can revolutionise efficiency for teachers and school leaders, I am now dedicated to helping schools unlock its full potential.</p>

            <p>Through training, policy alignment, and practical implementation, I aim to share what I have learned—and continue to learn—about this world-changing technology.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OwnerDetails
