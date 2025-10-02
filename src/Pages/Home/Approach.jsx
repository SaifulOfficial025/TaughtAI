import React from 'react'
import { IoIosPeople } from "react-icons/io";
import { CiHeart } from "react-icons/ci";
import { IoMan } from "react-icons/io5";
import { FaGraduationCap } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";

function Principle({ color = 'bg-blue-50', icon, title, children, fonttype = '' }) {
  return (
    <div className="flex items-start gap-4">
      <div className={`flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center ${color}`}>
        <span className="w-7 h-7 text-2xl" aria-hidden>
          {icon}
        </span>
      </div>

      <div>
        <h4 className={`font-semibold text-gray-900 text-2xl`}>{title}</h4>
        <p className={`mt-2 text-gray-600 max-w-xl text-xl ${fonttype || 'font-bitter'}`}>{children}</p>
      </div>
    </div>
  )
}

function Approach() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-center font-serif text-4xl md:text-5xl lg:text-6xl mb-12">My approach is guided by five key principles:</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
        <div className="space-y-8">
          <Principle
            color="bg-blue-50 text-blue-600"
            icon={<IoIosPeople />}
            title="Empowering Educators"
            fonttype="font-bitter"
          >
            Through personalised CPD and school-specific solutions, I help staff gain the confidence to make AI work for them.
          </Principle>

          <Principle
            color="bg-emerald-50 text-emerald-600"
            icon={<CiHeart />}
            title="Alignment with Values"
          >
            Every AI solution is shaped to your ethos, policies, and pupils, in line with Ofsted and UK guidance.
          </Principle>

          <Principle
            color="bg-amber-50 text-amber-600"
            icon={<IoMan />}
            title="Inclusion & Equity"
          >
            My focus is on inclusive, trauma-informed content that meets diverse learning needs.
          </Principle>
        </div>

        <div className="space-y-8">
          <Principle
            color="bg-violet-50 text-violet-600"
            icon={<FaGraduationCap />}
            title="Continuous Learning"
          >
            Fostering a culture of ongoing professional development and AI literacy.
          </Principle>

          <Principle
            color="bg-teal-50 text-teal-600"
            icon={<FaHandshakeSimple />}
            title="Collaboration & Community"
          >
            Building partnerships between schools, families, and communities to maximize AI's positive impact on education.
          </Principle>
        </div>
      </div>
    </section>
  )
}

export default Approach
