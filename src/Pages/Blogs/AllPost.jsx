import React, { useMemo, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { RiShareForwardLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { POSTS } from '../../data/posts'

const POSTS_PER_PAGE = 4

const DUMMY_POSTS = POSTS

function AllPost() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [liked, setLiked] = useState({})

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
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
              <CiSearch className='h-6 w-6'/>
            </div>
          </div>
        </div>

        <div className="space-y-6 font-playfair">
          {current.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
            >
              <div className="">
                {post.image && (
                <Link to={`/blogs/${post.id}`}>
                  <div className="w-full h-44 md:h-56 overflow-hidden cursor-pointer">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
                  </div>
                </Link>
              )}
              <div className='p-5'>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    
                    <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-md font-bold">{post.author}</div>
                      <div className="text-xs text-gray-400">{post.minutes} min · 1 read</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400">
                    <RiShareForwardLine className='h-5 w-5 cursor-pointer hover:text-gray-700'/>
                    
                  </div>
                </div>

                <div className="mt-4">
                  <Link to={`/blogs/${post.id}`}>
                    <h2 className="text-lg md:text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600 transition-colors">{post.title}</h2>
                  </Link>
                  <p className="text-sm text-gray-500">{post.excerpt}</p>
                </div>
              </div>

              

              <div className="p-4 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="cursor-pointer hover:text-gray-700">4 views</span>
                  <span className="cursor-pointer hover:text-gray-700">0 comments</span>
                </div>

                <div>
                  {liked[post.id] ? (
                    <button
                      onClick={() => setLiked((s) => ({ ...s, [post.id]: false }))}
                      aria-label="unlike"
                      className="focus:outline-none"
                    >
                      <FaHeart className="h-5 w-5 text-red-500" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setLiked((s) => ({ ...s, [post.id]: true }))}
                      aria-label="like"
                      className="focus:outline-none"
                    >
                      <CiHeart className="h-5 w-5 text-gray-400 hover:text-red-400" />
                    </button>
                  )}
                </div>
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
