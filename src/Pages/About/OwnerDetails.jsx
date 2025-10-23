import React from "react";
import ownerpic from "../../../public/owner.jpg";

function OwnerDetails() {
  return (
    <section className="py-6 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 font-bitter">
        <p className="text-xl md:text-2xl text-gray-700 mb-4 md:mb-6">
          <span className="font-bold">Taught AI</span> is me, Ben. I am a Deputy
          Head of School, Maths Teacher, <br className="hidden md:block" /> and
          Head of PSHE at an inner-city pupil referral unit.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
          {/* Left: image */}
          <div className="flex justify-center md:justify-start">
            <div className="rounded-xl overflow-hidden w-64 h-64 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-[600px] xl:h-[600px] flex-shrink-0">
              <img
                src={ownerpic}
                alt="Owner"
                className="w-full h-full object-cover block rounded-xl"
              />
            </div>
          </div>

          {/* Right: long content */}
          <div className="text-lg md:text-2xl text-gray-800 leading-relaxed text-justify mt-3">
            <p className="mb-2">
              As a maths teacher by trade, I’ve always been intrigued by AI.
            </p>

            <p className="mb-2">
              Initially, I was underwhelmed—simple requests like “Improve this
              email,” “Refine my reports,” or “Plan a PSHE lesson on county
              lines” often yielded generic responses.
            </p>

            <p className="mb-2">
              However, after training in how to truly harness the power of AI
              through what I call Outstanding Prompts, my perspective shifted
              entirely.
            </p>

            <p className="mb-2">
              I witnessed how AI could generate a fully Ofsted-aligned,
              pedagogically sound, Gatsby-benchmarked lesson—complete with key
              terms, multiple-choice questions, GCSE-style worksheets, and
              homework—all structured into slides with just a few well-crafted
              prompts.
            </p>

            <p className="mb-2">
              Beyond lesson planning, AI transformed how my team communicated
              with parents, ensuring emails were fully aligned with school
              policies, trauma-informed, and used appropriate SEND and inclusive
              language. The impact on workload reduction and standardisation was
              undeniable.
            </p>
          </div>
        </div>
        <div className="text-lg md:text-2xl text-gray-800 leading-relaxed text-justify mt-3">
          <p className="mb-2">
            I also have solid experience delivering CPD to schools, particularly
            on the effective use of IT and software tools to improve teaching,
            learning, and leadership. Now, I focus on helping schools do the
            same with AI—demystifying the tech and making it work in the real
            world of education.
          </p>

          <p className="mb-2">
            Seeing how AI can revolutionise efficiency for teachers and school
            leaders, I am now dedicated to helping schools unlock its full
            potential.
          </p>

          <p>
            Through training, policy alignment, and practical implementation, I
            aim to share what I have learned—and continue to learn—about this
            world-changing technology.
          </p>
        </div>
      </div>
    </section>
  );
}

export default OwnerDetails;
