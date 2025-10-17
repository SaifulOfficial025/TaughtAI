import React from 'react'
import { useNavigate } from 'react-router-dom'
import AcademyImg from '../../../public/academytryitout.svg'
import Header from './Header'
import Footer from '../../Shared/Footer'

const tools = [
  {
    title: 'Scheme of work GPT',
    short: 'Design inclusive, Ofsted-aligned schemes of work—structured by week, with clear objectives, assessment points, and delivery strategies.',
    bullets: [
      'Specify subject, phase, and context (e.g. "Y9 - 8-week Functional Skills")',
      'Ask for differentiation, literacy/numeracy integration, and SEND strategies',
      'Request differentiation layers—LA, HA, SEMH, or scaffolded tasks'
    ]
  },
  {
    title: 'Lesson Planner GPT',
    short: 'Generate fully structured lesson plans tailored to your subject, pupil needs, and curriculum goals.',
    bullets: [
      'Include year group, topic, and specific learner needs (eg. Y9 KS3 literacy focus)',
      'Ask for clear objectives, AFL strategies, and scaffolded tasks',
      'Use follow-up prompts to add challenge tiers, sensory supports, or plenary questions'
    ]
  },
  {
    title: 'Resource Generator GPT',
    short: 'Create engaging, curriculum-linked worksheets, activities, and tasks tailored to your class needs and levels.',
    bullets: [
      'Create starter tasks, exit tickets, and printable worksheets',
      'Ask for differentiation by ability, multiple choice or scaffolded writing frames',
      'Include extension tasks and cross-curricular links'
    ]
  },
  {
    title: 'Communication Improver GPT',
    short: 'Polish templates, guidance and parental communications—clear, professional and appropriate for your context.',
    bullets: [
      'Generate emails, letters, and meeting notes tailored to parents or staff',
      'Request tone adjustments (formal / friendly) and reading-age simplification',
      'Ask for versions in plain English or translated summaries'
    ]
  },
  {
    title: 'Behaviour and classroom strategies',
    short: 'Generate researched strategies for behaviour management and classroom routines tailored to your phase and context.',
    bullets: [
      'Request specific strategies for group work, transitions, or low-level disruption',
      'Ask for scripts and suggested phrasing for adult responses',
      'Include whole-class or targeted intervention approaches'
    ]
  },
  {
    title: 'Heads and SLT Assistant',
    short: 'Support with planning, policy summaries, risk assessments and leadership briefings.',
    bullets: [
      'Generate succinct briefings and risk summaries',
      'Create meeting agendas and minutes templates',
      'Produce policy checklists and compliance summaries'
    ]
  }
]

function StaffPlatform() {
  const navigate = useNavigate()
  return (
    <section>
      <Header />
<div className="min-h-screen bg-[#f9f9f9] text-gray-900 font-sans">
  <div className="max-w-6xl mx-auto ">
    {/* Header (card) */}
    <div className="bg-white rounded-lg  shadow-sm">
      <div className="grid md:grid-cols-2 items-start ">
        <div className='py-10 px-6 md:px-10 bg-[#f1f5f9'>
          <h1 className="text-3xl lg:text-4xl font-serif font-bold leading-tight">
            AI Use Guidance for <br /> Taught AI Academy Staff
          </h1>
          <p className="mt-4 text-sm text-gray-700 leading-relaxed max-w-lg">
            This portal provides the approved and preferred AI tools for staff at
            Taught AI Academy.
            <br />
            <br />
            All AI use must be conducted through this platform to ensure safety,
            compliance, and alignment with school policies.
            <br />
            <br />
            Thinking of using another AI platform? Please speak to the
            Headteacher before using any external AI tools, as unapproved platforms may pose safeguarding, data, or compliance risks.
          </p>
          <p className="mt-4 text-sm text-gray-800 font-medium">
            Stay safe. Stay consistent. Use school-approved AI.
          </p>
        </div>

        <div className="flex justify-center md:justify-end items-start">
          <img
            src={AcademyImg}
            alt="Taught AI badge"
            className=" object-cover"
          />
        </div>
      </div>
    </div>

  {/* Tools grid */}
  <div className="">
      {tools.map((tool, idx) => (
        <div
          key={tool.title}
          className="grid md:grid-cols-2 items-stretch"
        >
          {/* Odd (black left) */}
          {idx % 2 === 0 ? (
            <>
              <div className="bg-gray-900 text-white rounded-none py-12 px-8 flex flex-col justify-center items-start shadow-md font-playfair ">
                <div>
                  <h2 className="font-semibold tracking-wide mb-3 text-3xl">
                    {tool.title}
                  </h2>
                </div>
                <div className="mt-4">
                    <button onClick={() => navigate('/chats')} className="bg-white text-gray-900 px-6 py-2.5 text-sm font-semibold rounded-full shadow-sm hover:bg-gray-100 transition">
                      Launch
                    </button>
                </div>
              </div>

              <div className="bg-white rounded-none py-12 px-8 max-w-prose font-bitter">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">
                  What it does:
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {tool.short}
                </p>

                <h4 className="text-base font-semibold text-gray-900 mb-3">Top tips on using this GPT:</h4>

                <ul className="list-disc list-inside text-base text-gray-700 space-y-3 ml-4">
                  {tool.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Even (white left) */}
              <div className="bg-white rounded-none py-12 px-8 order-last md:order-first font-bitter">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">What it does:</h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">{tool.short}</p>

                <h4 className="text-base font-semibold text-gray-900 mb-3">Top tips on using this GPT:</h4>

                <ul className="list-disc list-inside text-base text-gray-700 space-y-3 ml-4">
                  {tool.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-900 text-white rounded-none py-12 px-8 flex flex-col justify-center items-start shadow-md">
                <div>
                  <h2 className="text-3xl font-semibold tracking-wide">
                    {tool.title}
                  </h2>
                </div>
                <div className="mt-4">
                    <button onClick={() => navigate('/chats')} className="bg-white text-gray-900 px-6 py-2.5 text-sm font-semibold rounded-full shadow-sm hover:bg-gray-100 transition">
                      Launch
                    </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  </div>
</div>
      <Footer />
    </section>
  )
}

export default StaffPlatform
