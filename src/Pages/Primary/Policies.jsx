import React from 'react'
import Header from './Header'
import Footer from '../../Shared/Footer'

function Hero() {
  return (
     <section
          className="relative h-[40vh] sm:h-[45vh] md:h-[55vh] lg:h-[60vh] flex items-center bg-cover bg-center"
    style={{ backgroundImage: `url('/policy.svg')` }}
        >
          {/* Overlay to ensure readable text over an image */}
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
    
          <div className="relative z-10 mx-auto w-full px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white leading-tight">
                Acceptable AI usage policy 
              </h1>
    
              <p className="mt-4 font-bitter text-md sm:text-sm md:text-xl text-gray-200 max-w-3xl mx-auto px-2 sm:px-0">
                Ensure responsible and ethical use of AI by adhering to our guidelines. This policy outlines the acceptable practices for utilizing AI technologies within our platform, fostering a safe and respectful environment for all users.
              </p>
            </div>
          </div>
        </section>
  )
}




function Policies() {
  return (
    <div>
      <Header />
      <Hero />
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose prose-neutral dark:prose-invert">
            <h2 className="text-5xl font-playfair  text-gray-900">Purpose</h2>
            <p className='font-bitter text-xl mt-10'>
              This policy sets out expectations for the safe, ethical, and professional use of AI and related
              technologies across Taught AI. It aims to protect pupil data, maintain professional standards
              and ensure transparent, accountable and trauma-informed deployments of AI in education.
            </p>

            <h3 className="mt-8 text-5xl font-playfair  text-gray-900">1. Pupil Data Protection &amp; Safeguarding</h3>
            <ul className="font-bitter text-xl mt-10 space-y-6 list-disc ml-6">
              <li className="leading-relaxed">
                No identifying information about pupils is to be shared with any AI platform — this includes names, contact details, addresses, medical, safeguarding, SEN, or attendance records.
              </li>

              <li className="leading-relaxed">
                <p>Staff must not upload documents that contain:</p>
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>Pupil initials, names, UPNs, or codes that can be linked to individual students.</li>
                  <li>Behaviour logs, SPOD entries, or personal education plans.</li>
                  <li>Any sensitive, protected, or confidential information relating to students, families, or staff.</li>
                </ul>
              </li>

              <li className="leading-relaxed">
                All data shared with AI tools must be fully anonymised and stripped of any identifying details. The principle of 'privacy by design' must be followed at all times.
              </li>
            </ul>

            <h3 className="mt-8 text-5xl font-playfair  text-gray-900">2. Anonymisation Guidelines</h3>
            <ul className='font-bitter text-xl mt-10 space-y-6 list-disc ml-6'>
              <li>Use broad, de-identified terms such as 'Pupil A', 'a Year 10 student with SEMH needs', or 'KS3 learner'.</li>
              <li>Double-check all text before uploading, especially for hidden data in headers, footers, or metadata.</li>
              <li>When in doubt: Do not upload. Instead, speak to the Data Protection Lead or a member of SLT for guidance.</li>
            </ul>

            <h3 className="mt-8 text-5xl font-playfair  text-gray-900">3. Permitted Uses of AI</h3>
            <ul className='font-bitter text-xl mt-10 space-y-6 list-disc ml-6'>
              <li>Drafting or refining lesson plans, schemes of work, and activity ideas.</li>
              <li>Generating accessible resources or differentiated materials to support inclusion and SEND learners.</li>
              <li>Writing or rewording general documents (e.g. newsletters, posters, trip letters).</li>
              <li>Summarising professional guidance or anonymised notes.</li>
              <li>Writing anonymised SPODs or reports (must be reviewed by staff before final use).</li>
              <li>Adapting materials to be trauma-informed, accessible, or inclusive.</li>
            </ul>

            <h3 className="mt-8 text-5xl font-playfair  text-gray-900">4. AI is Not Permitted For</h3>
            <ul className='font-bitter text-xl mt-10 space-y-6 list-disc ml-6'>
              <li>Uploading or generating any data related to:  <br />- Individual pupil behaviours, safeguarding incidents, attendance, exclusions, or medical records.</li>
              <li>Creating documents that will be used to make or inform decisions about individual pupils.</li>
              <li>Any content where anonymity cannot be confidently maintained.</li>
              <li>Evaluating or labelling a pupil’s ability, diagnosis, or progress.</li>
              <li>Not to knowingly reproduce or rewrite copyrighted material without permission and appropriate referencing (perhaps already covered by 6 below?)</li>
            </ul>

            <h3 className="mt-8 text-5xl font-playfair  text-gray-900">5. Trauma-Informed &amp; Ethical Use</h3>
            <ul className='font-bitter text-xl mt-10 space-y-6 list-disc ml-6'>
              <li>AI should enhance, not replace, the relational and human-centred approach that underpins our work. Staff should be mindful of bias in AI outputs and ensure that content is culturally sensitive, inclusive, and non-discriminatory. Outputs used in educational settings must reflect the values of nurture, equity, and respect central to Taught AI Primary.</li>
            </ul>

            <h3 className="mt-8 text-5xl font-playfair  text-gray-900">6. Staff Training &amp; Support</h3>
            <ul className='font-bitter text-xl mt-10 space-y-6 list-disc ml-6'>
              <li>
                All staff will receive guidance on ethical AI use, with specific reference to:
                <ul className="list-disc ml-6 mt-3 space-y-2">
                  <li>GDPR and UK Data Protection law</li>
                  <li>KCSIE (2023)</li>
                  <li>Taught AI Primary Inclusion and Safeguarding and SEND Policies</li>
                </ul>
              </li>
              <li>Questions or concerns about AI should be directed to the SLT or the Data Protection Lead.</li>
            </ul>

            <h3 className="mt-8 text-5xl font-playfair  text-gray-900">7. Monitoring &amp; Accountability</h3>
            <p className='font-bitter text-xl mt-6'>
              AI usage may be monitored as part of ongoing data protection and safeguarding audits. This policy will be reviewed
              annually or in response to updates in legislation or technology. Any breach of this policy will be dealt with under the
              school’s Data Protection, Safeguarding, or Disciplinary procedures, as appropriate.
            </p>

            <h3 className="mt-8 text-lg font-semibold">Quick Recap</h3>
            <ul className='font-bitter text-xl mt-4 space-y-3'>
              <li>🚫 No names.</li>
              <li>🚫 No personal data.</li>
              <li>✅ Always anonymise.</li>
              <li>❓ When in doubt—don’t upload.</li>
              <li>👥 Ask SLT or the DPO.</li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Policies
