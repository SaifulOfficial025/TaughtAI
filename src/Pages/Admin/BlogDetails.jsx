import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiShareForwardLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { POSTS } from "../../data/posts";
import Header from "./Header";
import Footer from "../../Shared/Footer";
import { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
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
      <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
        {name.charAt(0)}
      </div>
    </div>
  );
}

function SmallCard({ post, onOpen, onToggleLike, liked }) {
  return (
    <article
      onClick={() => onOpen && onOpen(post)}
      className="relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transform transition hover:scale-105"
    >
      <div className="h-36 bg-gray-200">
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt=""
            className="w-full h-36 object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <AuthorBadge name={post.author} />
            <div className="text-xs text-gray-500 ml-14 -mt-5">
              {post.date} · {post.readTime}
            </div>
          </div>
        </div>

        <h5 className="mt-4 text-base font-serif text-gray-900">
          {post.title}
        </h5>
        <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>

        <div className="mt-4 text-sm text-gray-500">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="text-sm font-medium text-gray-900"
          >
            Read More →
          </a>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleLike(post.id);
        }}
        className="absolute right-4 bottom-4 p-3 rounded-full bg-white shadow-sm transition"
        aria-label="like"
      >
        <CiHeart
          className={`transform transition duration-150 ${
            liked
              ? "text-red-600 scale-110"
              : "text-gray-400 hover:text-red-600 hover:scale-110"
          }`}
        />
      </button>
    </article>
  );
}

function BlogDetails() {
  const { id } = useParams();
  const postId = Number(id);
  // prefer a post saved in localStorage (admin-created) but fall back to sample POSTS
  let post = POSTS.find((p) => p.id === postId) || POSTS[0];
  try {
    const raw = localStorage.getItem("taughtai_blogs");
    if (raw) {
      const arr = JSON.parse(raw);
      const found = arr.find(
        (b) => Number(b.id) === postId || String(b.id) === String(postId)
      );
      if (found) post = found;
    }
  } catch (err) {
    // ignore parse errors
  }
  const [liked, setLiked] = useState({});
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  // dummy comments for display (and client-side add/reply)
  const [commentsList, setCommentsList] = useState([
    {
      id: 101,
      author: "Sophie",
      datetime: "2025-07-02 09:15",
      text: "Great piece — very practical ideas we can use in next week's CPD.",
      replies: [
        {
          id: 201,
          author: "Ben",
          datetime: "2025-07-02 10:00",
          text: "Thanks Sophie — happy to share templates if that helps.",
        },
      ],
    },
    {
      id: 102,
      author: "Mark",
      datetime: "2025-07-01 14:40",
      text: "Can you share examples of prompts for SEND pupils?",
      replies: [],
    },
  ]);
  const [replyOpen, setReplyOpen] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [editOpen, setEditOpen] = useState({});
  const [editTexts, setEditTexts] = useState({});

  const auth = useContext(AuthContext) || {};
  const { user } = auth;
  // admin detection: prefer an explicit role, otherwise accept names that include 'ben' (case-insensitive)
  const isAdmin = !!(
    user &&
    (user.role === "admin" ||
      (user.full_name && user.full_name.toLowerCase().includes("ben")) ||
      (user.username && user.username.toLowerCase().includes("ben")))
  );

  function handleCommentSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    const newC = {
      id: Date.now(),
      author: "Guest",
      datetime: new Date().toLocaleString(),
      text: comment.trim(),
      replies: [],
    };
    setCommentsList((s) => [newC, ...s]);
    setComment("");
  }

  function handleReplyToggle(commentId) {
    const key = String(commentId);
    setReplyOpen((s) => ({ ...s, [key]: !s[key] }));
  }

  function handleReplyChange(commentId, value, replyId) {
    const key = replyId ? `${commentId}_${replyId}` : String(commentId);
    setReplyTexts((s) => ({ ...s, [key]: value }));
  }
  // recursive helper to add a reply to a replies tree when parentReplyId is nested
  function addReplyRecursive(replies, parentReplyId, newR) {
    return replies.map((r) => {
      if (r.id === parentReplyId) {
        const existing = r.replies || [];
        return { ...r, replies: [...existing, newR] };
      }
      if (r.replies && r.replies.length) {
        return {
          ...r,
          replies: addReplyRecursive(r.replies, parentReplyId, newR),
        };
      }
      return r;
    });
  }

  function handleReplySubmit(e, commentId, parentReplyId = null) {
    e.preventDefault();
    const key = parentReplyId
      ? `${commentId}_${parentReplyId}`
      : String(commentId);
    const text = (replyTexts[key] || "").trim();
    if (!text) return;
    const newR = {
      id: Date.now(),
      author: user ? user.full_name || user.username || "Guest" : "Guest",
      datetime: new Date().toLocaleString(),
      text,
      replies: [],
    };

    setCommentsList((s) =>
      s.map((c) => {
        if (c.id !== commentId) return c;
        if (!parentReplyId) {
          // add as top-level reply
          return { ...c, replies: [...(c.replies || []), newR] };
        }
        // add to nested reply tree
        const newReplies = addReplyRecursive(
          c.replies || [],
          parentReplyId,
          newR
        );
        return { ...c, replies: newReplies };
      })
    );

    setReplyTexts((s) => ({ ...s, [key]: "" }));
    setReplyOpen((s) => ({ ...s, [key]: false }));
  }

  function canModify(author) {
    if (!user) return false;
    const name = (user.full_name || user.username || "").toString();
    return name && name === author;
  }

  function handleDeleteComment(commentId) {
    if (!confirm("Delete this comment? This cannot be undone.")) return;
    setCommentsList((s) => s.filter((c) => c.id !== commentId));
  }

  // recursively remove a reply with id from a replies tree
  function removeReplyRecursive(replies, targetId) {
    return replies
      .map((r) => ({
        ...r,
        replies: r.replies ? removeReplyRecursive(r.replies, targetId) : [],
      }))
      .filter((r) => r.id !== targetId);
  }

  function handleDeleteReply(commentId, replyId) {
    if (!confirm("Delete this reply? This cannot be undone.")) return;
    setCommentsList((s) =>
      s.map((c) =>
        c.id === commentId
          ? { ...c, replies: removeReplyRecursive(c.replies || [], replyId) }
          : c
      )
    );
  }

  function handleEditToggle(commentId, existingText = "") {
    setEditOpen((s) => ({ ...s, [commentId]: !s[commentId] }));
    setEditTexts((s) => ({ ...s, [commentId]: existingText }));
  }

  function handleEditSubmit(e, commentId, replyId = null) {
    e.preventDefault();
    const newText = (editTexts[commentId] || "").trim();
    if (!newText) return;
    if (replyId == null) {
      // edit top-level comment
      setCommentsList((s) =>
        s.map((c) => (c.id === commentId ? { ...c, text: newText } : c))
      );
    } else {
      // edit a reply
      setCommentsList((s) =>
        s.map((c) =>
          c.id === commentId
            ? {
                ...c,
                replies: c.replies.map((r) =>
                  r.id === replyId ? { ...r, text: newText } : r
                ),
              }
            : c
        )
      );
    }
    setEditOpen((s) => ({ ...s, [commentId]: false }));
    setEditTexts((s) => ({ ...s, [commentId]: "" }));
  }

  const handleOpen = (p) => {
    navigate(`/blogs/${p.id}`);
  };

  const handleToggleLike = (postId) => {
    setLiked((s) => ({ ...s, [postId]: !s[postId] }));
  };

  return (
    <section>
      <Header />
      <div className="px-6 md:px-12 lg:px-20 py-12 font-playfair">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                {/* <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                  {post.author.charAt(0)}
                </div> */}
                <div>
                  {/* <div className="text-md font-bold">{post.author}</div> */}
                  <div className="text-xs text-gray-400">
                    {post.datetime
                      ? post.datetime
                      : `Jul 1 · ${post.minutes} min read`}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/admin/editblog/${post.id}`)}
                  className="text-sm px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                >
                  Edit post
                </button>
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
                    {/* <FaHeart className="h-5 w-5 text-red-500" /> */}
                  </button>
                ) : (
                  <button
                    onClick={() => setLiked((s) => ({ ...s, [post.id]: true }))}
                    aria-label="like"
                    className="focus:outline-none"
                  >
                    {/* <CiHeart className="h-5 w-5 text-gray-400 hover:text-red-400" /> */}
                  </button>
                )}
              </div>
            </div>
            {/* comment section */}
            <form onSubmit={handleCommentSubmit} className="mt-4">
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

            {/* Comments list */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                {commentsList.length} Comments
              </h3>
              <div className="space-y-4">
                {commentsList.map((c) => (
                  <div key={c.id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                        {c.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-semibold">{c.author}</div>
                            <div className="text-xs text-gray-400">
                              {c.datetime}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{c.text}</p>

                        <div className="mt-3 flex items-center gap-3">
                          {/* Only admin (Ben) may reply from this admin view */}
                          {isAdmin && (
                            <button
                              onClick={() => handleReplyToggle(c.id)}
                              className="text-sm text-gray-600"
                            >
                              Reply
                            </button>
                          )}
                          <button
                            onClick={() => handleToggleLike(c.id)}
                            className="text-sm text-gray-600"
                          >
                            Like
                          </button>
                          {/* Admin may delete any comment */}
                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteComment(c.id)}
                              className="text-sm text-red-600"
                            >
                              Delete
                            </button>
                          )}
                          {/* Admin can edit only admin's (Ben's) own comments */}
                          {isAdmin && c.author === "Ben" && (
                            <button
                              onClick={() => handleEditToggle(c.id, c.text)}
                              className="text-sm text-blue-600"
                            >
                              Edit
                            </button>
                          )}
                        </div>

                        {/* reply input */}
                        {replyOpen[c.id] && (
                          <form
                            onSubmit={(e) => handleReplySubmit(e, c.id)}
                            className="mt-3"
                          >
                            <textarea
                              rows={3}
                              value={replyTexts[c.id] || ""}
                              onChange={(e) =>
                                handleReplyChange(c.id, e.target.value)
                              }
                              className="w-full border border-gray-200 rounded-md p-2"
                              placeholder={`Reply to ${c.author}...`}
                            />
                            <div className="mt-2 flex gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  setReplyOpen((s) => ({ ...s, [c.id]: false }))
                                }
                                className="px-3 py-1 rounded-md bg-gray-200"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1 rounded-md bg-blue-600 text-white"
                              >
                                Reply
                              </button>
                            </div>
                          </form>
                        )}
                        {/* edit input for top-level comment */}
                        {editOpen[c.id] && (
                          <form
                            onSubmit={(e) => handleEditSubmit(e, c.id)}
                            className="mt-3"
                          >
                            <textarea
                              rows={3}
                              value={editTexts[c.id] || ""}
                              onChange={(e) =>
                                setEditTexts((s) => ({
                                  ...s,
                                  [c.id]: e.target.value,
                                }))
                              }
                              className="w-full border border-gray-200 rounded-md p-2"
                            />
                            <div className="mt-2 flex gap-2 justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  setEditOpen((s) => ({ ...s, [c.id]: false }))
                                }
                                className="px-3 py-1 rounded-md bg-gray-200"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                className="px-3 py-1 rounded-md bg-green-600 text-white"
                              >
                                Save
                              </button>
                            </div>
                          </form>
                        )}

                        {/* replies */}
                        {c.replies && c.replies.length > 0 && (
                          <div className="mt-4 space-y-3">
                            {c.replies.map((r) => (
                              <div
                                key={r.id}
                                className="ml-12 bg-white p-3 rounded-md border"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="font-medium">{r.author}</div>
                                  <div className="text-xs text-gray-400">
                                    {r.datetime}
                                  </div>
                                </div>
                                <p className="mt-2 text-gray-700">{r.text}</p>

                                <div className="mt-2 flex items-center gap-3">
                                  {/* Only admin can reply to replies here */}
                                  {isAdmin && (
                                    <button
                                      onClick={() =>
                                        handleReplyToggle(`${c.id}_${r.id}`)
                                      }
                                      className="text-sm text-gray-600"
                                    >
                                      Reply
                                    </button>
                                  )}
                                  {/* Admin may delete any reply */}
                                  {isAdmin && (
                                    <button
                                      onClick={() =>
                                        handleDeleteReply(c.id, r.id)
                                      }
                                      className="text-sm text-red-600"
                                    >
                                      Delete
                                    </button>
                                  )}
                                  {/* Admin can edit only admin's own replies */}
                                  {isAdmin && r.author === "Ben" && (
                                    <button
                                      onClick={() =>
                                        handleEditToggle(c.id, r.text)
                                      }
                                      className="text-sm text-blue-600"
                                    >
                                      Edit
                                    </button>
                                  )}
                                </div>

                                {/* reply input for nested reply */}
                                {replyOpen[`${c.id}_${r.id}`] && (
                                  <form
                                    onSubmit={(e) =>
                                      handleReplySubmit(e, c.id, r.id)
                                    }
                                    className="mt-2"
                                  >
                                    <textarea
                                      rows={3}
                                      value={
                                        replyTexts[`${c.id}_${r.id}`] || ""
                                      }
                                      onChange={(e) =>
                                        handleReplyChange(
                                          c.id,
                                          e.target.value,
                                          r.id
                                        )
                                      }
                                      className="w-full border border-gray-200 rounded-md p-2"
                                      placeholder={`Reply to ${r.author}...`}
                                    />
                                    <div className="mt-2 flex gap-2 justify-end">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setReplyOpen((s) => ({
                                            ...s,
                                            [`${c.id}_${r.id}`]: false,
                                          }))
                                        }
                                        className="px-3 py-1 rounded-md bg-gray-200"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="px-3 py-1 rounded-md bg-blue-600 text-white"
                                      >
                                        Reply
                                      </button>
                                    </div>
                                  </form>
                                )}

                                {/* allow editing replies in-place */}
                                {editOpen[c.id] && editTexts[c.id] && (
                                  <form
                                    onSubmit={(e) =>
                                      handleEditSubmit(e, c.id, r.id)
                                    }
                                    className="mt-2"
                                  >
                                    <textarea
                                      rows={3}
                                      value={editTexts[c.id] || ""}
                                      onChange={(e) =>
                                        setEditTexts((s) => ({
                                          ...s,
                                          [c.id]: e.target.value,
                                        }))
                                      }
                                      className="w-full border border-gray-200 rounded-md p-2"
                                    />
                                    <div className="mt-2 flex gap-2 justify-end">
                                      <button
                                        type="button"
                                        onClick={() =>
                                          setEditOpen((s) => ({
                                            ...s,
                                            [c.id]: false,
                                          }))
                                        }
                                        className="px-3 py-1 rounded-md bg-gray-200"
                                      >
                                        Cancel
                                      </button>
                                      <button
                                        type="submit"
                                        className="px-3 py-1 rounded-md bg-green-600 text-white"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </form>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
