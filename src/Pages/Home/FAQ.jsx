import React, { useState } from 'react'

const FAQ_ITEMS = [
  {
    question: 'Is TaughtAI compliant with UK education policies?',
    answer:
      'Yes — TaughtAI is designed to align with UK guidance on the safe and effective use of AI in education. We provide support and documentation to help schools remain compliant with data protection and safeguarding requirements.',
  },
  {
    question: 'How does TaughtAI support SEN students?',
    answer:
      'TaughtAI includes features to personalise learning, provide alternative formats, and offer targeted scaffolding for students with Special Educational Needs. We work with schools to tailor solutions to individual pupil needs.',
  },
  {
    question: 'What training is provided for teachers?',
    answer:
      'We deliver practical professional development sessions, hands-on workshops and on-demand resources so teachers can confidently integrate AI tools into their lesson planning and assessment workflows.',
  },
  {
    question: 'Can TaughtAI integrate with our existing school systems?',
    answer:
      'Yes, TaughtAI integrates with most popular school management systems, learning platforms, and assessment tools commonly used in UK schools. Our technical team will help set up integrations during onboarding.',
  },
  {
    question: 'How much time can teachers save using TaughtAI?',
    answer:
      'Teachers typically save time on marking and administrative tasks through automated feedback and summarisation features — freeing up time for planning and student support.',
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
