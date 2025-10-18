import React from 'react'
import Header from './Header'
import Footer from '../../Shared/Footer'
import herobg from '../../../public/academyfaqhero.svg'

function Hero() {
  return (
     <section
          className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] flex items-center bg-cover bg-center"
    style={{ backgroundImage: `url('/academyfaqhero.svg')` }}
        >
          {/* Overlay to ensure readable text over an image */}
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
    
          <div className="relative z-10 mx-auto w-full px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight">
                Frequently Asked Questions
              </h1>
    
              <p className="mt-4 font-bitter text-md sm:text-sm md:text-xl text-gray-200 max-w-3xl mx-auto px-2 sm:px-0">
                Find quick solutions to common queries and learn more about how our platform works. Browse through our frequently asked questions to get the help you need.
              </p>
            </div>
          </div>
        </section>
  )
}


function Faq() {
  return (
    <div>
      <Header />
      <Hero />
       <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-neutral dark:prose-invert">
            <h2 className="text-5xl font-playfair text-gray-900">What is this platform for?</h2>
            <p className="font-bitter text-xl mt-6">
              This portal gives staff access to approved, school-aligned AI tools for planning, communication, and resource creation. It ensures everything is compliant with our policies and safe for use.
            </p>

            <h3 className="mt-10 text-3xl font-playfair text-gray-900">Which tools are available here?</h3>
            <p className="font-bitter text-xl mt-4">You have access to:</p>
            <ul className="font-bitter text-xl mt-4 list-disc ml-6 space-y-2">
              <li>Staff Handbook GPT – Instantly find policy answers.</li>
              <li>Communication Improver GPT – Write inclusive, trauma-informed emails and letters.</li>
              <li>Lesson Planner GPT – Create structured, differentiated lessons.</li>
              <li>Resource Generator GPT – Generate engaging resources matched to your curriculum.</li>
            </ul>

            <h3 className="mt-8 text-3xl font-playfair text-gray-900">Can I use other AI tools outside this portal?</h3>
            <p className="font-bitter text-xl mt-4">No. Only the tools on this portal are approved for staff use. If you want to explore other AI options, please speak with the Headteacher first.</p>

            <h3 className="mt-10 text-3xl font-playfair text-gray-900">How do I write a good prompt?</h3>
            <p className="font-bitter text-xl mt-4">Be specific! Include:</p>
            <ul className="font-bitter text-xl mt-4 list-disc ml-6 space-y-2">
              <li>Year group</li>
              <li>Topic or task</li>
              <li>Desired output format (e.g., table, slides)</li>
              <li>Any pupil needs (e.g., EAL, ASD, low literacy)</li>
              <li>✅ Example: “Create a Y3 science lesson on photosynthesis with low-literacy scaffolding.”</li>
            </ul>

            <h3 className="mt-10 text-3xl font-playfair text-gray-900">Can I ask the AI to refine its answers?</h3>
            <p className="font-bitter text-xl mt-4">Absolutely! Follow up with instructions like:</p>
            <ul className="font-bitter text-xl mt-4 list-disc ml-6 space-y-2">
              <li>“Add a plenary.”</li>
              <li>“Make this more suitable for ASC students.”</li>
              <li>“Put this in table format.”</li>
            </ul>

            <h3 className="mt-10 text-3xl font-playfair text-gray-900">Can I upload my own files (e.g. worksheets or policies)?</h3>
            <p className="font-bitter text-xl mt-4">Yes. Simply upload your file, then prompt the GPT:</p>
            <blockquote className="mt-4 font-bitter text-lg border-l-4 pl-4 border-gray-200">“Use this file to create a lesson / summary / adapted resource.”<br/>Never upload student names or personal data.</blockquote>

            <h3 className="mt-10 text-3xl font-playfair text-gray-900">Can I trust the information from these GPTs?</h3>
            <p className="font-bitter text-xl mt-4">These GPTs are built to align with:</p>
            <ul className="font-bitter text-xl mt-4 list-disc ml-6 space-y-2">
              <li>Our school’s policies</li>
              <li>Safeguarding, SEND, and GDPR</li>
              <li>Current teaching standards</li>
            </ul>
            <p className="font-bitter text-xl mt-4">Still, always review outputs before use and apply your professional judgement.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Faq
