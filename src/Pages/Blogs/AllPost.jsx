import React, { useMemo, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RiShareForwardLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { POSTS } from "../../data/posts";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBlogs, reactBlog } from "../../Redux/Blogs";

const POSTS_PER_PAGE = 4;

const DUMMY_POSTS = POSTS;

function AllPost() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [liked, setLiked] = useState({});
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const apiItems = useSelector((s) => (s.blogs && s.blogs.items) || []);
  const { accessToken, user } = useSelector((s) => s.auth || {});

  useEffect(() => {
    // load blogs into redux on mount (no-op if already loaded)
    dispatch(fetchAllBlogs());
  }, [dispatch]);

  // initialize liked map from API's user_love_react when auth token exists
  useEffect(() => {
    if (!apiItems || !apiItems.length) return;
    const map = {};
    apiItems.forEach((a) => {
      // normalize user_love_react which may come as number or string ("1", "0", "null")
      const raw = a.user_love_react;
      const pressed = String(raw) === "1" || Number(raw) === 1;
      map[a.id] = accessToken ? pressed : false;
    });
    // Replace local liked map with server-derived map so UI reflects authoritative state
    setLiked(map);
  }, [apiItems, accessToken]);

  // map API shape to the UI shape expected by this component
  const postsFromApi = useMemo(() => {
    const fmtTime = (iso) => {
      if (!iso) return null;
      const t = Date.parse(iso);
      if (Number.isNaN(t)) return null;
      const diffMs = Date.now() - t;
      if (diffMs < 0) return new Date(t).toLocaleDateString();
      const minutes = Math.floor(diffMs / 60000);
      if (minutes < 60) return `${minutes} min`;
      const hours = Math.floor(minutes / 60);
      if (hours < 24) return `${hours}h`;
      const days = Math.floor(hours / 24);
      if (days < 7) return `${days} days`;
      // older than a week — show a readable date
      return new Date(t).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    return apiItems.map((a) => ({
      id: a.id,
      title: a.title || "",
      excerpt: a.excerpt || a.title || "",
      image: a.banner || a.image || "",
      author: a.author_name || "Ben",
      minutes: a.read_time,
      timeAgo: fmtTime(a.timestamp),
      views: a.views || 0,
      comments: a.comment_count || 0,
      love_react: a.love_react || 0,
      // coerce to numeric 0/1 when possible; fallback to 0
      user_love_react: (function (v) {
        const n = Number(v);
        return Number.isFinite(n) && (n === 0 || n === 1) ? n : 0;
      })(a.user_love_react),
    }));
  }, [apiItems]);

  const POSTS_DATA = postsFromApi.length ? postsFromApi : DUMMY_POSTS;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return POSTS_DATA;
    return POSTS_DATA.filter(
      (p) =>
        (p.title || "").toLowerCase().includes(q) ||
        (p.excerpt || "").toLowerCase().includes(q)
    );
  }, [query, POSTS_DATA]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE));

  const current = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return filtered.slice(start, start + POSTS_PER_PAGE);
  }, [filtered, page]);

  // reset page when filter changes
  React.useEffect(() => setPage(1), [query]);

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
              <CiSearch className="h-6 w-6" />
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
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                        {post.author.charAt(0)}
                      </div>
                      <div>
                        <div className="text-md font-bold">{post.author}</div>
                        <div className="text-xs text-gray-400">
                          {post.timeAgo
                            ? post.timeAgo
                            : post.minutes
                            ? `${post.minutes} min`
                            : ""}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-400">
                      <RiShareForwardLine className="h-5 w-5 cursor-pointer hover:text-gray-700" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Link to={`/blogs/${post.id}`}>
                      <h2 className="text-lg md:text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-sm text-gray-500">{post.excerpt}</p>
                  </div>
                </div>

                <div className="p-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="cursor-pointer hover:text-gray-700">
                      {post.views ?? 0} views
                    </span>
                    <span className="cursor-pointer hover:text-gray-700">
                      {post.comments ?? 0} comments
                    </span>
                    <span className="cursor-pointer hover:text-gray-700">
                      {post.love_react ?? 0} loves
                    </span>
                  </div>

                  <div>
                    {liked[post.id] ? (
                      <button
                        onClick={() => {
                          // require login
                          if (!accessToken) {
                            alert("You must be logged in to react or comment.");
                            return;
                          }
                          // optimistic UI update: mark as unliked
                          setLiked((s) => ({ ...s, [post.id]: false }));
                          // dispatch API call to unreact; rollback UI if it fails
                          dispatch(
                            reactBlog({ blog_id: post.id, react_status: 0 })
                          )
                            .unwrap()
                            .catch(() => {
                              // revert optimistic change
                              setLiked((s) => ({ ...s, [post.id]: true }));
                            });
                        }}
                        aria-label="unlike"
                        className="focus:outline-none"
                      >
                        <FaHeart className="h-5 w-5 text-red-500" />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          // require login
                          if (!accessToken) {
                            alert("You must be logged in to react or comment.");
                            return;
                          }
                          // optimistic UI update: mark as liked
                          setLiked((s) => ({ ...s, [post.id]: true }));
                          // dispatch API call to react; rollback UI if it fails
                          dispatch(
                            reactBlog({ blog_id: post.id, react_status: 1 })
                          )
                            .unwrap()
                            .catch(() => {
                              // revert optimistic change
                              setLiked((s) => ({ ...s, [post.id]: false }));
                            });
                        }}
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
            <div className="text-center py-10 text-gray-500">
              No posts match your search.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-center">
          <nav className="inline-flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                page === 1
                  ? "text-gray-300 border-gray-100"
                  : "text-gray-600 border-gray-200"
              }`}
            >
              ‹
            </button>

            {Array.from({ length: totalPages }).map((_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                    p === page
                      ? "bg-indigo-50 border-indigo-300 text-indigo-600"
                      : "bg-white border-gray-200 text-gray-600"
                  }`}
                >
                  {p}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                page === totalPages
                  ? "text-gray-300 border-gray-100"
                  : "text-gray-600 border-gray-200"
              }`}
            >
              ›
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AllPost;
