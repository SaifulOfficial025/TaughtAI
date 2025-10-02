import React from 'react'
import { FaGraduationCap, FaCube } from 'react-icons/fa'
import { IoIosPeople, IoIosBriefcase } from 'react-icons/io'
import discoverbg from "../../../public/discoverbg.svg"



const ITEMS = [
  {
    icon: FaGraduationCap,
    title: 'AI Use Without Training',
    quote: 'Most staff already use AI, but few are trained in school policy — leading to inconsistency and potential risks.',
    color: '#8430d1'
  },
  {
    icon: IoIosPeople,
    title: 'Adaptive Teaching',
    quote: 'AI streamlines adaptive teaching, helping staff support every learner’s unique needs, abilities, and interests.',
    color: '#3787e6'
  },
  {
    icon: IoIosBriefcase,
    title: 'Reduced Workload & Retention',
    quote: 'AI can dramatically cut workload, improve work–life balance, and support long-term staff retention.',
    color: '#338a8a'
  },
  {
    icon: FaCube,
    title: 'Consistency & Standards',
    quote: 'AI ensures staff work from the same framework for lessons, student support, and policy-aligned practice.',
    color: '#077613'
  }
]

function Discovered() {
  return (
    <section
      className="text-gray-100"
      style={{ backgroundImage: `url(${discoverbg})` }}
    >

      <div className="relative z-10 mx-auto max-w-6xl px-6 text-center py-28">
        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white ">What I Discovered</h2>
        <p className="mt-4 max-w-2xl mx-auto text-gray-300">
          I discovered that with the right prompts, AI can transform teaching—delivering better lessons, clearer
          communication, and real workload relief.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((it, idx) => {
            const Icon = it.icon
            return (
              <div key={idx} className="bg-slate-800 p-6 shadow-md border border-slate-700 rounded-none">
                <div className="flex items-center justify-center mb-4">
                  <Icon size={50} style={{ color: it.color }} />
                </div>

                <h3 className="text-xl font-playfair text-white text-center mb-3">{it.title}</h3>
                <p className="text-sm text-gray-300 text-center">"{it.quote}"</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Discovered
