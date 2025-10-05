import React, { useMemo, useState } from 'react'

const POSTS_PER_PAGE = 4

const DUMMY_POSTS = [
  {
    id: 1,
    title: 'Gemini in the Classroom: AI Tools Mean Nothing If Staff Aren\'t Trained',
    excerpt:
      'Google has just rolled out Gemini across Google Workspace for Education — embedding ever-more powerful AI tools into the platforms teachers…',
    author: 'Ben Duggan',
    minutes: 3,
    image: '/bloghero.svg',
  },
  {
    id: 2,
    title: 'From Ahead of the Curve to Policy-Proof: How TaughtAI is Setting the Standard',
    excerpt:
      'Yesterday the Department for Education released its long-awaited guidance on the safe and effective use of AI in education. At Taught AI…',
    author: 'Ben Duggan',
    minutes: 5,
    image: '/tryourplatformhero.svg',
  },
  {
    id: 3,
    title: 'AI in the classroom: Assistant, Not Replacement',
    excerpt:
      'A new Ofsted framework looks to balance innovation with safeguarding — a primer on how AI can augment teaching rather than replace it.',
    author: 'Ben Duggan',
    minutes: 4,
    image: '/discoverbg.png',
  },
  {
    id: 4,
    title: 'Reprogramming the Classroom: Why Schools Need AI Expertise Now',
    excerpt:
      'Implementing AI requires new approaches to CPD, assessment and curriculum design — here are practical steps for leaders to begin.',
    author: 'Ben Duggan',
    minutes: 6,
    image: '/herobg.svg',
  },
  {
    id: 5,
    title: 'Practical AI Strategies for Teacher Workload',
    excerpt:
      'Simple prompts and workflow changes can save teachers hours per week — examples you can try tomorrow.',
    author: 'Ben Duggan',
    minutes: 2,
    image: '/help1.svg',
  },
  {
    id: 6,
    title: 'Designing CPD for an AI-enabled Classroom',
    excerpt:
      'A short course outline to help schools upskill teams quickly and responsibly.',
    author: 'Ben Duggan',
    minutes: 7,
    image: '/help2.svg',
  },
  {
    id: 7,
    title: 'Bespoke AI Tools: When to Build vs Buy',
    excerpt:
      'An evaluation framework for deciding whether to commission custom tools or adopt off-the-shelf solutions.',
    author: 'Ben Duggan',
    minutes: 8,
    image: '/bespokebg.svg',
  },
  {
    id: 8,
    title: 'Ethical AI for Schools: Practical Governance',
    excerpt:
      'Governance doesn\'t need to be heavy — a short checklist for risk-aware AI adoption in schools.',
    author: 'Ben Duggan',
    minutes: 5,
    image: '/ethos.svg',
  },
]

function AllPost() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return DUMMY_POSTS
    return DUMMY_POSTS.filter(
      (p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    )
  }, [query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))

  const current = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE
    return filtered.slice(start, start + POSTS_PER_PAGE)
  }, [filtered, page])

  // reset page when filter changes
  React.useEffect(() => setPage(1), [query])

  return (
    <div className="px-6 md:px-12 lg:px-20 py-10 font-playfair">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-semibold">All Blog Post</h1>

          <div className="relative w-80">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search here......"
              className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">🔍</div>
          </div>
        </div>

        <div className="space-y-6 font-playfair">
          {current.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{post.author}</div>
                      <div className="text-xs text-gray-400">{post.minutes} min · 1 read</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400">
                    <button className="p-2 rounded-full hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-50 text-red-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21s-7-4.35-9-6.5C-1 9.5 3 5 7 6c2 .5 3 2 5 2s3-1.5 5-2c4-1 8 3.5 4 8.5C19 16.65 12 21 12 21z" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="mt-4">
                  <h2 className="text-lg md:text-xl font-semibold mb-2">{post.title}</h2>
                  <p className="text-sm text-gray-500">{post.excerpt}</p>
                </div>
              </div>

              {post.image && (
                <div className="w-full h-44 md:h-56 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
              )}

              <div className="p-4 flex items-center justify-between text-sm text-gray-500">
                <div>{/* left meta placeholder */}</div>
                <div className="flex items-center gap-4">
                  <span className="cursor-pointer hover:text-gray-700">4 views</span>
                  <span className="cursor-pointer hover:text-gray-700">0 comments</span>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-10 text-gray-500">No posts match your search.</div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center">
          <nav className="inline-flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                page === 1 ? 'text-gray-300 border-gray-100' : 'text-gray-600 border-gray-200'
              }`}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    p === page
                      ? 'bg-indigo-50 border-indigo-300 text-indigo-600'
                      : 'bg-white border-gray-200 text-gray-600'
                  }`}
                >
                  {p}
                </button>
              )
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                page === totalPages ? 'text-gray-300 border-gray-100' : 'text-gray-600 border-gray-200'
              }`}
            >
              ›
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AllPost
