import React, { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'How are Taught AI tools different from just using Gemini or ChatGPT?',
    answer:
      'Unlike public AI platforms, Taught AI tools are built specifically for schools. Each one is policy-aligned, safeguarding-compliant, and tailored to your setting. I upload your school’s policies, templates, and curriculum frameworks — so staff receive accurate, context-aware support that’s safe, consistent, and ready to use.',
  },
  {
    question: 'Is Taught AI compliant with UK education policies?',
    answer:
      'Yes. Every tool I build is designed around UK safeguarding, GDPR, and ethical AI guidance. Staff are supported to use AI responsibly, with built-in reminders and compliance checks that protect pupils, staff, and your school’s integrity.',
  },
  {
    question: 'What training is provided for teachers and staff?',
    answer:
      'I deliver practical CPD sessions, hands-on workshops, and follow-up coaching to help staff use AI confidently and effectively. Training focuses on safe, policy-aligned practice — showing how AI can genuinely save time, improve consistency, and enhance classroom impact.',
  },
  {
    question: 'How does Taught AI support SEND and inclusion?',
    answer:
      'My tools are built with inclusivity in mind. They generate trauma-informed, SEND-aware, and EAL-friendly content — offering adaptive scaffolds, differentiated tasks, and personalised feedback that meet the needs of all learners.',
  },
  {
    question: 'How much time can teachers save using Taught AI?',
    answer:
      'Schools using Taught AI typically see major time savings on planning, marking, and admin tasks. By automating routine work and simplifying communication, staff can focus more on relationships, progress, and wellbeing.',
  },
]

function FAQ() {
  const [openIndex, setOpenIndex] = useState(3) // default open the 4th item like the screenshot

  function toggle(i) {
    setOpenIndex(prev => (prev === i ? null : i))
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-serif font-semibold text-gray-900 mb-8 text-center">
        Taught AI is here to help answer the questions
      </h1>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={i} className="bg-[#e6e6e6] rounded-lg shadow-sm overflow-hidden border-2 hover:bg-[#f8f8f8] transition" style={{ borderColor: '#e6e6e9' }}>
              <button
                type="button"
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between p-4 md:p-5 text-left gap-4 "
              >
                <span className="text-gray-800">{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-600 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div
                className={`px-5 pb-5 pt-0 text-gray-700 transition-all duration-200 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
                aria-hidden={!isOpen}
              >
                <div className="bg-gray-50 p-4 rounded-md mt-3 text-sm leading-relaxed">
                  {item.answer}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ
