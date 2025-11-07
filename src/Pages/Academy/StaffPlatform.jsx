import React from "react";
import { useNavigate } from "react-router-dom";
import AcademyImg from "../../../public/academytryitout.svg";
import Header from "./Header";
import Footer from "../../Shared/Footer";

const tools = [
  {
    title: "Scheme of work GPT",
    short:
      "Designs inclusive, Ofsted-aligned schemes of work—structured by week, with clear objectives, assessment points, and delivery strategies.",
    bullets: [
      'Specify subject, phase, and context (e.g. "8-week English scheme for low-literacy learners").',
      "Ask for links to qualifications, literacy/numeracy integration, and enrichment or careers elements.",
      "Request differentiation layers—e.g. EAL, SEMH, or scaffolded tasks to make your plan truly inclusive.",
    ],
  },
  {
    title: "Lesson Planner GPT",
    short:
      "Generates fully structured, Ofsted-aligned lesson plans tailored to your subject, pupil needs, and curriculum goals.",
    bullets: [
      'Include year group, topic, and specific learner needs (e.g. "Y2 with low literacy and EAL").',
      "Ask for clear objectives, AfL strategies, and scaffolded tasks.",
      "Use follow-up prompts to add challenge tiers, sensory supports, or plenary questions.",
    ],
  },
  {
    title: "Resource Generator GPT",
    short:
      "Creates engaging, curriculum-linked worksheets, activities, and tasks tailored to your class's needs, interests, and learning levels.",
    bullets: [
      'Mention the subject, topic, and pupil profile (e.g. "Y1 science task for EAL learners in Y4").',
      "Ask for formats like cloze exercises, multiple choice, or scaffolded writing frames.",
      "Use it to adapt content around pupil interests—music, sport, or art—to boost engagement.",
    ],
  },
  {
    title: "Communication Improver GPT",
    short:
      "Helps staff draft professional, trauma-informed emails and structure supportive conversations with parents and external professionals—aligned with safeguarding, SEND, and inclusion policies.",
    bullets: [
      'Clearly state the purpose (e.g. "Follow-up email after behaviour incident" or "Phone script for SENCo meeting").',
      "Mention any relevant tone or sensitivity (e.g. calm, firm, supportive).",
      'Request formats like bullet points, phone scripts, or sentence starters; use follow-ups like "simplify for parents" or "align with school policy language".',
    ],
  },
  {
    title: "Behaviour and classroom strategies",
    short:
      "Provides instant access to researched strategies for behaviour, learning needs, and classroom challenges—tailored to your school context.",
    bullets: [
      "Be specific about the pupil's needs (e.g. ADHD, trauma, low literacy).",
      'Ask for combined strategies (e.g. "strategies for a pupil with ASD and SEMH").',
      "Request suggestions aligned with your classroom routines or staffing model.",
    ],
  },
  {
    title: "Heads and SLT Assistant",
    short:
      "Supports senior leaders by generating evidence-informed summaries, policies, improvement actions, and inspection prep—aligned with school values, Ofsted expectations, and national guidance.",
    bullets: [
      'Frame a clear strategic aim (e.g. "Improve KS2 attendance" or "Prepare governor briefing on inclusion").',
      "Paste key documents or guidance for interpretation and alignment.",
      'Ask for specific formats like summaries, policy lines, CPD slides, or SIP actions; use follow-ups like "align with EIF" or "adapt for governor review".',
    ],
  },
];

function StaffPlatform() {
  const navigate = useNavigate();
  return (
    <section>
      <Header />
      <div className="min-h-screen  text-gray-900 font-sans">
        <div className="max-w-6xl mx-auto ">
          {/* Header (card) */}
          <div className="bg-white rounded-lg  ">
            <div className="grid md:grid-cols-2 items-start ">
              <div className="py-10 px-6 md:px-10 bg-[#f1f5f9">
                <h1 className="text-3xl lg:text-4xl font-serif font-bold leading-tight">
                  AI Use Guidance for <br /> Taught AI Academy Staff
                </h1>
                <p className="mt-4 text-sm text-gray-700 leading-relaxed max-w-lg">
                  This portal provides the approved and preferred AI tools for
                  staff at Taught AI Academy.
                  <br />
                  <br />
                  All AI use must be conducted through this platform to ensure
                  safety, compliance, and alignment with school policies.
                  <br />
                  <br />
                  Thinking of using another AI platform? Please speak to the
                  Headteacher before using any external AI tools, as unapproved
                  platforms may pose safeguarding, data, or compliance risks.
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
                    <div className="bg-gray-900 text-white rounded-none py-12 px-8 flex flex-col justify-center items-start  font-playfair ">
                      <div>
                        <h2 className="font-semibold tracking-wide mb-3 text-3xl">
                          {tool.title}
                        </h2>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() =>
                            navigate("/taught_ai_academy", {
                              state: { title: tool.title },
                            })
                          }
                          className="bg-white text-gray-900 px-6 py-2.5 text-sm font-semibold rounded-full  hover:bg-gray-100 transition"
                        >
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

                      <h4 className="text-base font-semibold text-gray-900 mb-3">
                        Top tips on using this GPT:
                      </h4>

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
                      <h3 className="text-3xl font-serif font-bold text-gray-900 mb-3">
                        What it does:
                      </h3>
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {tool.short}
                      </p>

                      <h4 className="text-base font-semibold text-gray-900 mb-3">
                        Top tips on using this GPT:
                      </h4>

                      <ul className="list-disc list-inside text-base text-gray-700 space-y-3 ml-4">
                        {tool.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gray-900 text-white rounded-none py-12 px-8 flex flex-col justify-center items-start ">
                      <div>
                        <h2 className="text-3xl font-semibold tracking-wide">
                          {tool.title}
                        </h2>
                      </div>
                      <div className="mt-4">
                        <button
                          onClick={() =>
                            navigate("/taught_ai_academy", {
                              state: { title: tool.title },
                            })
                          }
                          className="bg-white text-gray-900 px-6 py-2.5 text-sm font-semibold rounded-full  hover:bg-gray-100 transition"
                        >
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
  );
}

export default StaffPlatform;
