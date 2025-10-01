import React, { useState, useRef, useEffect } from 'react'
import { CiHeart } from "react-icons/ci";

const dummyPosts = [
  {
    id: 1,
    title: "Gemini in the Classroom: AI Tools Mean Nothing If Staff Aren't Trained to Use Them.",
    author: 'Ben Duggan',
    date: 'Jul 15',
    readTime: '2 min read',
    excerpt:
      "Google has just rolled out Gemini across Google Workspace for Education—embedding over 30 powerful AI tools into the platforms teachers...",
    views: 6,
    comments: 0,
    featured: true,
    thumbnail: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9b6b3f7d7e9b1b9b3f8b9e2b6c1f4d3a',
  },
  {
    id: 2,
    title: "From Ahead of the Curve to Policy-Proof: How Taught AI is Setting the Standard in AI for",
    author: 'Ben Duggan',
    date: 'Jul 14',
    readTime: '3 min read',
    excerpt: "Yesterday the Department for Education released its long-awaited guidance on the safe and effective use of AI in education...",
    thumbnail: 'https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=9e7c5d7f2b4a3f2c5b6a7e8d1f2c3b4a',
  },
  {
    id: 3,
    title: "AI in the Classroom: Assistant, Not Replacement",
    author: 'Ben Duggan',
    date: 'Jul 12',
    readTime: '4 min read',
    excerpt: "From AI to ABCs: Texas School Puts a New Spin on Learning...",
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=4c3a7f1d2e6b5a7c9d8e1f2a3b4c5d6e',
  },
  {
    id: 4,
    title: "Reprogramming the Classroom: Why Schools Need AI Expertise Now",
    author: 'Ben Duggan',
    date: 'Jul 10',
    readTime: '5 min read',
    excerpt: "A recent article spotlighting a school-wide approach to embedding AI into curriculum and practice...",
    thumbnail: 'https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=7b4c3d2a1e6f5c8a9b0d2e3f4a5b6c7d',
  },
  {
    id: 5,
    title: "AI Assistive Tools: Practical Steps for Teachers",
    author: 'Ben Duggan',
    date: 'Jul 8',
    readTime: '3 min read',
    excerpt: "Simple workflows teachers can adopt today to reduce marking time and personalise feedback...",
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d',
  },
]

function AuthorBadge({ name }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-gray-700 text-white flex items-center justify-center font-semibold mt-5 text-4xl">B</div>
      <div className="text-md">
        <div className="text-gray-900 font-medium -ml-1">{name}</div>
      </div>
    </div>
  )
}

function FeaturedCard({ post, onOpen, onToggleLike, liked }) {
  return (
    <article
      onClick={() => onOpen && onOpen(post)}
      className="relative bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full cursor-pointer transform transition will-change-transform hover:scale-105"
    >
      <div className="md:h-56 bg-gray-200">
        {post.thumbnail && (
          <img src={post.thumbnail} alt="" className="w-full h-56 object-cover" />
        )}
      </div>
      <div className="p-8 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div className=''>
              <AuthorBadge name={post.author} />
              <div className="text-xs text-gray-500 -mt-5 ml-14"> {post.date} · {post.readTime}</div>
            </div>

          </div>

          <h3 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-serif text-gray-900 leading-tight">{post.title}</h3>

          <p className="mt-4 text-base text-gray-600 max-w-2xl">{post.excerpt}</p>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-gray-500">
          <div>{post.views} views &nbsp; {post.comments} comments</div>
    
        </div>
      </div>

      {/* heart at bottom-right */}
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

function SideCard({ post, onOpen, onToggleLike, liked }) {
  return (
    <article
      onClick={() => onOpen && onOpen(post)}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col h-full cursor-pointer transform transition hover:scale-105"
    >
      <div className="h-36 bg-gray-200">
        {post.thumbnail && <img src={post.thumbnail} alt="" className="w-full h-36 object-cover" />}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between">
            <div>
              <AuthorBadge name={post.author} />
              <div className="text-xs text-gray-500 ml-14 -mt-5">{post.date} · {post.readTime}</div>
            </div>

          </div>

          <h4 className="mt-4 text-lg font-serif text-gray-900">{post.title}</h4>
          <p className="mt-3 text-sm text-gray-600">{post.excerpt}</p>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <a href="#" onClick={(e)=>e.preventDefault()} className="inline-flex items-center gap-2 text-sm font-medium text-gray-900">Read More →</a>
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

function BlogModal({ post, onClose, comments, reactions, onToggleLike, onAddComment }) {
  const escHandler = (e) => { if (e.key === 'Escape') onClose() }
  useEffect(()=>{ document.addEventListener('keydown', escHandler); return ()=>document.removeEventListener('keydown', escHandler); })
  const commentRef = useRef()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center font-bold text-lg">
              {post.author[0]}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{post.author}</div>
              <div className="text-sm text-gray-500">{post.date} · {post.readTime} · {post.views} views</div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 h-[calc(90vh-80px)]">
          {/* Left Column - Blog Content */}
          <div className="lg:col-span-2 p-8 overflow-auto min-h-0">
            {/* Featured Image */}
            {post.thumbnail && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover" />
              </div>
            )}

            <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight mb-6">{post.title}</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl text-gray-600 mb-8 font-medium">{post.excerpt}</p>
              
              <div className="space-y-6">
                <p>In today's rapidly evolving educational landscape, artificial intelligence is no longer just a buzzword—it's becoming an integral part of how we teach and learn. As we navigate this digital transformation, it's crucial to understand both the opportunities and challenges that AI presents in educational settings.</p>
                
                <p>The implementation of AI tools in classrooms requires careful consideration of several factors: teacher training, student privacy, educational effectiveness, and ethical implications. Schools that successfully integrate AI into their curriculum often start with comprehensive staff development programs.</p>
                
                <h3 className="text-2xl font-serif text-gray-900 mt-8 mb-4">Key Benefits of AI in Education</h3>
                <ul className="space-y-2">
                  <li>• Personalized learning experiences tailored to individual student needs</li>
                  <li>• Automated grading and feedback systems that save teacher time</li>
                  <li>• Enhanced accessibility features for students with diverse learning requirements</li>
                  <li>• Real-time analytics to track student progress and engagement</li>
                </ul>
                
                <p>However, the success of these implementations largely depends on proper training and ongoing support for educators. Without adequate preparation, even the most sophisticated AI tools can become underutilized or misapplied.</p>
                
                <h3 className="text-2xl font-serif text-gray-900 mt-8 mb-4">Looking Forward</h3>
                <p>As we continue to explore the potential of AI in education, it's essential to maintain a balanced approach that prioritizes student outcomes while embracing innovation. The future of education lies not in replacing human teachers with AI, but in empowering educators with intelligent tools that enhance their ability to inspire and educate.</p>
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => onToggleLike(post.id)} 
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-200 ${
                    reactions.likedByUser 
                      ? 'bg-red-50 text-red-600 border-2 border-red-200' 
                      : 'bg-gray-50 text-gray-600 border-2 border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200'
                  }`}
                >
                  <CiHeart className="w-5 h-5" />
                  <span className="font-medium">{reactions.likes} likes</span>
                </button>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.001 8.001 0 01-7.117-4.317c-.055-.108-.103-.221-.146-.336C5.722 14.952 6 14.486 6 14V8a8 8 0 018-8 8 8 0 018 8v4c0 4.418-3.582 8-8 8z" />
                  </svg>
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Comments & Reactions */}
          <div className="border-l border-gray-100 flex flex-col bg-gray-50 min-h-0">
            {/* Comments Header */}
            <div className="p-6 border-b border-gray-200 bg-white">
              <h3 className="text-lg font-semibold text-gray-900">Comments ({comments.length})</h3>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
              {comments.map((comment, idx) => (
                <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-500 text-white flex items-center justify-center text-sm font-medium">
                      {comment.author[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">•</span>
                        <span className="text-xs text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-700 mt-1 leading-relaxed">{comment.text}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <button className="text-xs text-gray-500 hover:text-red-600 transition-colors flex items-center gap-1">
                          <CiHeart className="w-4 h-4" />
                          Like
                        </button>
                        <button className="text-xs text-gray-500 hover:text-blue-600 transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="p-6 border-t border-gray-200 bg-white">
              <form onSubmit={(e) => { 
                e.preventDefault(); 
                const text = commentRef.current.value.trim(); 
                if(text) { 
                  onAddComment(post.id, text); 
                  commentRef.current.value=''; 
                } 
              }}>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center font-medium">
                    Y
                  </div>
                  <div className="flex-1">
                    <textarea 
                      ref={commentRef}
                      rows={3} 
                      className="w-full border border-gray-200 rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" 
                      placeholder="Write a thoughtful comment..." 
                    />
                    <div className="flex justify-between items-center mt-3">
                
                      <button 
                        type="submit" 
                        className=" px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Blog() {
  const featured = dummyPosts.find(p => p.featured) || dummyPosts[0]
  const others = dummyPosts.filter(p => p.id !== featured.id)

  const [modalPost, setModalPost] = useState(null)

  // reactions and comments state per post id
  const [postState, setPostState] = useState(() => {
    const map = {}
    dummyPosts.forEach(p => {
      map[p.id] = {
        likes: Math.floor(Math.random()*25)+8,
        likedByUser: false,
        comments: [
          { 
            author: 'Sarah Johnson', 
            time: '2h', 
            text: 'This is exactly what we needed to hear! Our school district has been struggling with AI implementation. The point about teacher training is spot on.' 
          },
          { 
            author: 'Mike Chen', 
            time: '4h', 
            text: 'Great insights! We\'ve seen similar challenges in our classrooms. The key is definitely starting slow and building confidence.' 
          },
          { 
            author: 'Emma Rodriguez', 
            time: '6h', 
            text: '💯 This! The technology is only as good as the people using it. Professional development should be the top priority.' 
          },
          { 
            author: 'Dr. James Wilson', 
            time: '8h', 
            text: 'As an education researcher, I can confirm these findings align with our latest studies. Teacher preparedness is the biggest predictor of successful AI adoption.' 
          },
          { 
            author: 'Lisa Park', 
            time: '1d', 
            text: 'Thank you for this thoughtful analysis. It\'s refreshing to see such a balanced perspective on AI in education. 🙌' 
          },
        ]
      }
    })
    return map
  })

  function openModal(post) { setModalPost(post) }
  function closeModal() { setModalPost(null) }

  function toggleLike(postId) {
    setPostState(prev => {
      const entry = prev[postId]
      const liked = !entry.likedByUser
      return { ...prev, [postId]: { ...entry, likedByUser: liked, likes: entry.likes + (liked ? 1 : -1) } }
    })
  }

  function addComment(postId, text) {
    setPostState(prev => {
      const entry = prev[postId]
      const newComments = [{ author: 'You', time: 'now', text }, ...entry.comments]
      return { ...prev, [postId]: { ...entry, comments: newComments } }
    })
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-center font-serif text-4xl mb-10">Our Blog</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <FeaturedCard post={featured} onOpen={openModal} onToggleLike={toggleLike} liked={postState[featured.id].likedByUser} />
        </div>

        <div>
          <SideCard post={others[0]} onOpen={openModal} onToggleLike={toggleLike} liked={postState[others[0].id].likedByUser} />
        </div>

        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          {others.slice(1).map(p => (
            <SmallCard key={p.id} post={p} onOpen={openModal} onToggleLike={toggleLike} liked={postState[p.id].likedByUser} />
          ))}
        </div>
      </div>

      {modalPost && (
        <BlogModal
          post={modalPost}
          onClose={closeModal}
          comments={postState[modalPost.id].comments}
          reactions={{ likes: postState[modalPost.id].likes, likedByUser: postState[modalPost.id].likedByUser }}
          onToggleLike={(id)=>toggleLike(id)}
          onAddComment={addComment}
        />
      )}
    </section>
  )
}

export default Blog
