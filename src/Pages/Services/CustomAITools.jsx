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
              Some examples from my suite of bespoke AI solutions include:
            </p>

            <ul className="list-disc list-inside text-xl text-gray-700 mb-4">
              <li className='mb-6'><strong>Scheme of Work GPT</strong> <br /><span className='ml-7'> Builds weekly, Ofsted-ready schemes with clear objectives, assessments, and delivery strategies.</span></li>
              <li className='mb-6'><strong>Lesson Planner GPT</strong> <br /><span className='ml-7'>Creates full lesson plans tailored to subject, pupil needs (e.g. SEND, EAL), and curriculum intent.</span></li>
              <li className='mb-6'><strong>Resource Generator GPT</strong> <br /><span className='ml-7'>Designs engaging worksheets and tasks matched to your classes’ needs and interests.</span></li>
              <li className='mb-6'><strong>Policy &amp; Handbook GPT</strong> <br /><span className='ml-7'>Instant answers from your school’s policies, safeguarding guidance, and handbook.</span></li>
              <li className='mb-6'><strong>Behaviour &amp; Strategy GPT</strong> <br /><span className='ml-7'>Offers targeted classroom and behaviour strategies based on specific learning needs.</span></li>
            </ul>

           <p className='mt-10 text-lg'> SLT Strategy &amp; Policy GPT<br />Supports leaders with summaries, SIP actions, and Ofsted-aligned planning.</p>
         
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomAITools
