import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiShareForwardLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { POSTS } from "../../data/posts";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const RECENT = [
  {
    id: 1,
    title: "AI in the classroom: Assistant, Not Replacement",
    author: "Ben Duggan",
    minutes: 4,
    image: "/discoverbg.png",
  },
  {
    id: 2,
    title: "Reprogramming the Classroom: Why Schools Need AI Expertise Now",
    author: "Ben Duggan",
    minutes: 6,
    image: "/herobg.svg",
  },
  {
    id: 3,
    title: "Practical AI Strategies for Teacher Workload",
    author: "Ben Duggan",
    minutes: 2,
    image: "/help1.svg",
  },
  {
    id: 4,
    title: "Designing CPD for an AI-enabled Classroom",
    author: "Ben Duggan",
    minutes: 7,
    image: "/help2.svg",
  },
];

function AuthorBadge({ name }) {
  return (
    <div className="relative">
      <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">{name.charAt(0)}</div>
    </div>
  )
}

function SmallCard({ post, onOpen, onToggleLike, liked }) {
  return (
    <article
      onClick={() => onOpen && onOpen(post)}
      className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
    >
      <div className="h-36 bg-gray-200">
        {post.thumbnail && <img src={post.thumbnail} alt="" className="w-full h-36 object-cover" />}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <AuthorBadge name={post.author} />
            <div className="text-xs text-gray-500 ml-14 -mt-5">{post.date} · {post.readTime}</div>
          </div>
        </div>

        <h5 className="mt-4 text-base font-serif text-gray-900">{post.title}</h5>
        <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>

        <div className="mt-4 text-sm text-gray-500">
          <a href="#" onClick={(e)=>e.preventDefault()} className="text-sm font-medium text-gray-900">Read More →</a>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onToggleLike(post.id); }}
        className="absolute right-4 bottom-4 p-3 rounded-full bg-white shadow-sm transition"
        aria-label="like"
      >
        <CiHeart className={`transform transition duration-150 ${liked ? 'text-red-600 scale-110' : 'text-gray-400 hover:text-red-600 hover:scale-110'}`} />
      </button>
    </article>
  )
}

function BlogDetails() {
  const { id } = useParams();
  const postId = Number(id);
  const post = POSTS.find((p) => p.id === postId) || POSTS[0];
  const [liked, setLiked] = useState({});
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const handleOpen = (p) => {
    navigate(`/blogs/${p.id}`)
  }

  const handleToggleLike = (postId) => {
    setLiked((s) => ({ ...s, [postId]: !s[postId] }))
  }

  return (
    <section>
      <Header />
      <div className="px-6 md:px-12 lg:px-20 py-12 font-playfair">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div className="text-md font-bold">{post.author}</div>
                  <div className="text-xs text-gray-400">
                    Jul 1 · {post.minutes} min read
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <RiShareForwardLine className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 mb-6 p-4 ">
              {post.image && (
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
            <header className="mt-6">
              <h1 className="text-3xl md:text-4xl  leading-tight">
                {post.title}
              </h1>
              <p className="mt-4 text-gray-600">{post.excerpt}</p>
            </header>

            <article className="prose prose-sm md:prose-lg max-w-none mt-6 text-gray-800">
              <h3>Why training matters</h3>
              <p>
                It is one thing to make tools available; it is another to give
                teachers the confidence and competence to use them. Training
                reduces risk, increases impact and ensures equity of access
                across a school.
              </p>

              <h4>Practical benefits</h4>
              <ul>
                <li>
                  Reduces teacher workload with automations and smart prompts.
                </li>
                <li>
                  Improves student feedback with targeted AI-generated
                  suggestions.
                </li>
                <li>
                  Supports leaders with data-informed planning and assessment.
                </li>
              </ul>

              <p>
                Below are short, practical steps schools can take to begin their
                AI journey without costly procurement cycles or long vendor
                commitments.
              </p>

              <h4>Steps to start</h4>
              <ol>
                <li>
                  Start small: trial in one department with a clear evaluation
                  plan.
                </li>
                <li>
                  Use exemplar prompts and share them across staff to
                  standardise use.
                </li>
                <li>
                  Include safeguarding and data governance in every pilot.
                </li>
              </ol>

              <blockquote>
                Training is the multiplier — without it, even the best tools
                will underdeliver.
              </blockquote>

              <p>
                If you'd like a template training plan or a short CPD session to
                run with staff, we have ready-made materials that can be adapted
                to your setting.
              </p>
            </article>

            <div className="mt-20 border-t border-gray-200 my-6" />
            <div className="p-4 flex items-center justify-between text-md text-gray-500">
              <div className="flex items-center gap-4">
                <span className="cursor-pointer hover:text-gray-700">
                  4 views
                </span>
                <span className="cursor-pointer hover:text-gray-700">
                  0 comments
                </span>
              </div>
              <div>
                {liked[post.id] ? (
                  <button
                    onClick={() =>
                      setLiked((s) => ({ ...s, [post.id]: false }))
                    }
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
            {/* comment section */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                // For now we just clear the comment field; integrate with API as needed
                if (comment.trim()) {
                  // You could push to a comments list or call an API here
                  setComment('')
                }
              }}
              className="mt-4"
            >
              <div className="relative">
                <textarea
                  name="comment"
                  id="comment"
                  rows={6}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full bg-[#efefef] border border-gray-300 rounded-md p-4 pr-28 focus:outline-none focus:ring-2 focus:ring-blue-200 min-h-[140px] resize-y"
                />

                <button
                  type="submit"
                  className="absolute right-3 bottom-3 bg-blue-500 text-white rounded-md px-3 py-2 flex items-center shadow-md hover:bg-blue-600 focus:outline-none"
                >
                  <IoSend className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </div>
            </form>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl ">Recent Post</h2>
              <Link to="/blogs" className="text-md text-gray-900">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RECENT.map((r) => (
                <SmallCard
                  key={r.id}
                  post={{
                    id: r.id,
                    title: r.title,
                    excerpt: r.title,
                    author: r.author,
                    thumbnail: r.image,
                    date: 'Jul 1',
                    readTime: `${r.minutes} min`,
                  }}
                  onOpen={handleOpen}
                  onToggleLike={handleToggleLike}
                  liked={!!liked[r.id]}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default BlogDetails;
