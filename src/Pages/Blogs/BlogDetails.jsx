import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { RiShareForwardLine } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { POSTS } from "../../data/posts";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlogDetails,
  addCommentOrReply,
  editComment,
  deleteComment,
  updateCommentLike,
} from "../../Redux/Blogs";
import { FaHeart } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import Blog from "../Home/Blog";

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
  const post = POSTS.find((p) => p.id === postId) || POSTS[0];
  const [liked, setLiked] = useState({});
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  // Ensure the page is scrolled to top when visiting a blog details route
  useEffect(() => {
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    } catch (e) {
      // fallback
      window.scrollTo(0, 0);
    }
  }, [id]);

  // comments list (mapped from API detail.comments when available)
  const [commentsList, setCommentsList] = useState([]);
  const [replyOpen, setReplyOpen] = useState({});
  const [replyTexts, setReplyTexts] = useState({});
  const [editOpen, setEditOpen] = useState({});
  const [editTexts, setEditTexts] = useState({});

  const dispatch = useDispatch();
  const { user, accessToken } = useSelector((s) => s.auth || {});
  const { detail, detailLoading } = useSelector((s) => s.blogs || {});

  // map api detail into the small `post` object shape used by the UI
  function mapDetailToPost(d) {
    if (!d) return null;
    return {
      id: d.id || postId,
      title: d.title || d.heading || "",
      excerpt: d.excerpt || d.description || d.summary || "",
      image: d.banner || d.image || d.thumbnail || "",
      // author may come in several shapes: { name, image } or { user... }
      author:
        (d.author &&
          (d.author.full_name || d.author.username || d.author.name)) ||
        d.author_name ||
        d.user ||
        "Author",
      author_image: (d.author && d.author.image) || d.author_image || null,
      timestamp: d.timestamp || d.created_at || d.time || null,
      minutes: d.read_time || d.minutes || 5,
      views: d.views || 0,
      comments_count: d.comment_count || (d.comments && d.comments.length) || 0,
      love_react: d.love_react || 0,
      html: d.html_field || d.body || "",
    };
  }

  // map API comments into the UI shape used by this component
  function mapApiComments(apiComments) {
    if (!apiComments || !Array.isArray(apiComments)) return [];
    function mapOne(c) {
      return {
        id: c.id || Date.now(),
        author:
          (c.user && (c.user.full_name || c.user.username)) ||
          (c.user && c.user.username) ||
          c.author ||
          "Guest",
        datetime:
          c.timestamp ||
          c.created_at ||
          c.datetime ||
          c.created ||
          new Date().toLocaleString(),
        text: c.comment_text || c.text || c.body || c.comment || "",
        like_flag: c.like_flag || 0, // 0 means not liked, 1 means liked by current user
        replies: mapReplies(c.replies || c.children || []),
      };
    }
    function mapReplies(list) {
      if (!list || !Array.isArray(list)) return [];
      return list.map((r) => ({
        id: r.id || Date.now(),
        author:
          (r.user && (r.user.full_name || r.user.username)) ||
          (r.user && r.user.username) ||
          r.author ||
          "Guest",
        datetime:
          r.timestamp ||
          r.created_at ||
          r.datetime ||
          r.created ||
          new Date().toLocaleString(),
        text: r.comment_text || r.text || r.body || r.comment || "",
        like_flag: r.like_flag || 0, // 0 means not liked, 1 means liked by current user
        replies: mapReplies(r.replies || r.children || []),
      }));
    }
    // Sort comments by datetime (latest first)
    const sortedComments = apiComments.map(mapOne).sort((a, b) => {
      const dateA = new Date(a.datetime);
      const dateB = new Date(b.datetime);
      return dateB - dateA; // Latest first
    });
    return sortedComments;
  }

  // keep a UI-friendly `postData` object to use throughout the template
  const postData = detail ? mapDetailToPost(detail) : post;

  // extract inner <body> content if the API returned a full HTML document
  function extractBodyHtml(htmlStr) {
    if (!htmlStr || typeof htmlStr !== "string") return "";
    // try to capture content inside <body>...</body>
    const bodyMatch = htmlStr.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
    if (bodyMatch && bodyMatch[1]) return bodyMatch[1];
    // remove doctype
    let s = htmlStr.replace(/<!doctype[^>]*>/i, "");
    // remove <head>..</head>
    s = s.replace(/<head[\s\S]*?<\/head>/i, "");
    // remove outer html tags
    s = s.replace(/<html[^>]*>/i, "").replace(/<\/html>/i, "");
    return s.trim();
  }

  // the HTML we'll render into the page (prefer body-extracted content)
  const renderedHtml = detail
    ? extractBodyHtml(detail.html_field || detail.body || postData.html)
    : null;

  // Format timestamps into user-friendly strings (e.g. "2 hours ago" or localized date)
  function formatDateTime(value) {
    if (!value) return "";
    const d = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(d.getTime())) return String(value);
    // Always show weekday, date and time in a human-friendly localized format
    // e.g. "Thu, Oct 30, 2025, 05:38 PM"
    return d.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  function handleCommentSubmit(e) {
    e.preventDefault();
    if (!comment.trim()) return;
    if (!accessToken) {
      alert("You must be logged in to comment.");
      return;
    }

    const text = comment.trim();
    const tempId = `tmp-${Date.now()}`;
    const tempComment = {
      id: tempId,
      author: user ? user.full_name || user.username || "Guest" : "Guest",
      datetime: new Date().toISOString(),
      text,
      replies: [],
    };

    // optimistic update
    setCommentsList((s) => [tempComment, ...s]);
    setComment("");

    // dispatch to server
    dispatch(addCommentOrReply({ blog_id: postData.id, comment_text: text }))
      .unwrap()
      .then(() => {
        // refresh the full detail from server for real-time updates
        return dispatch(fetchBlogDetails(postData.id)).unwrap();
      })
      .catch((err) => {
        // rollback optimistic
        setCommentsList((s) => s.filter((c) => c.id !== tempId));
        console.error("Failed to add comment", err);
      });
  }

  // fetch blog details on mount / id change
  useEffect(() => {
    if (!postId) return;
    dispatch(fetchBlogDetails(postId));
  }, [postId, dispatch]);

  // when detail is loaded from API, map comments into local state
  useEffect(() => {
    if (detail && detail.comments) {
      setCommentsList(mapApiComments(detail.comments));
    }
  }, [detail]);

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
    if (!accessToken) {
      alert("You must be logged in to reply.");
      return;
    }

    const key = parentReplyId
      ? `${commentId}_${parentReplyId}`
      : String(commentId);
    const text = (replyTexts[key] || "").trim();
    if (!text) return;

    const tempId = `tmp-reply-${Date.now()}`;
    const tempReply = {
      id: tempId,
      author: user ? user.full_name || user.username || "Guest" : "Guest",
      datetime: new Date().toISOString(),
      text,
      replies: [],
    };

    // optimistic update: add reply locally
    setCommentsList((s) =>
      s.map((c) => {
        if (c.id !== commentId) return c;
        if (!parentReplyId) {
          return { ...c, replies: [...(c.replies || []), tempReply] };
        }
        const newReplies = addReplyRecursive(
          c.replies || [],
          parentReplyId,
          tempReply
        );
        return { ...c, replies: newReplies };
      })
    );

    setReplyTexts((s) => ({ ...s, [key]: "" }));
    setReplyOpen((s) => ({ ...s, [key]: false }));

    // send to server
    dispatch(
      addCommentOrReply({
        blog_id: postData.id,
        comment_text: text,
        parent_id: parentReplyId || commentId,
      })
    )
      .unwrap()
      .then(() => {
        // refresh the full detail from server for real-time updates
        return dispatch(fetchBlogDetails(postData.id)).unwrap();
      })
      .catch((err) => {
        // rollback: remove temp reply
        function removeTemp(list) {
          return list
            .map((r) => ({ ...r, replies: removeTemp(r.replies || []) }))
            .filter((r) => r.id !== tempId);
        }
        setCommentsList((s) =>
          s.map((c) => ({ ...c, replies: removeTemp(c.replies || []) }))
        );
        console.error("Failed to add reply", err);
      });
  }

  function canModify(author) {
    if (!user) return false;
    const name = (user.full_name || user.username || "").toString();
    return name && name === author;
  }

  function handleDeleteComment(commentId) {
    if (!accessToken) {
      alert("You must be logged in to delete comments.");
      return;
    }
    if (!confirm("Delete this comment? This cannot be undone.")) return;

    // optimistic delete
    const originalComments = [...commentsList];
    setCommentsList((s) => s.filter((c) => c.id !== commentId));

    // dispatch to server
    dispatch(deleteComment({ comment_id: commentId }))
      .unwrap()
      .then(() => {
        // refresh the full detail from server for real-time updates
        return dispatch(fetchBlogDetails(postData.id)).unwrap();
      })
      .catch((err) => {
        // rollback
        setCommentsList(originalComments);
        console.error("Failed to delete comment", err);
      });
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
    if (!accessToken) {
      alert("You must be logged in to delete replies.");
      return;
    }
    if (!confirm("Delete this reply? This cannot be undone.")) return;

    // optimistic delete
    const originalComments = [...commentsList];
    setCommentsList((s) =>
      s.map((c) =>
        c.id === commentId
          ? { ...c, replies: removeReplyRecursive(c.replies || [], replyId) }
          : c
      )
    );

    // dispatch to server
    dispatch(deleteComment({ comment_id: replyId }))
      .unwrap()
      .then(() => {
        // refresh the full detail from server for real-time updates
        return dispatch(fetchBlogDetails(postData.id)).unwrap();
      })
      .catch((err) => {
        // rollback
        setCommentsList(originalComments);
        console.error("Failed to delete reply", err);
      });
  }

  function handleEditToggle(commentId, existingText = "") {
    setEditOpen((s) => ({ ...s, [commentId]: !s[commentId] }));
    setEditTexts((s) => ({ ...s, [commentId]: existingText }));
  }

  function handleEditSubmit(e, commentId, replyId = null) {
    e.preventDefault();
    if (!accessToken) {
      alert("You must be logged in to edit comments.");
      return;
    }

    const editKey = replyId || commentId;
    const newText = (editTexts[editKey] || "").trim();
    if (!newText) return;

    const targetId = replyId || commentId;
    const originalComments = [...commentsList];

    // optimistic update
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

    setEditOpen((s) => ({ ...s, [editKey]: false }));
    setEditTexts((s) => ({ ...s, [editKey]: "" }));

    // dispatch to server
    dispatch(editComment({ comment_id: targetId, comment_text: newText }))
      .unwrap()
      .then(() => {
        // refresh the full detail from server for real-time updates
        return dispatch(fetchBlogDetails(postData.id)).unwrap();
      })
      .catch((err) => {
        // rollback
        setCommentsList(originalComments);
        setEditOpen((s) => ({ ...s, [editKey]: true }));
        setEditTexts((s) => ({ ...s, [editKey]: newText }));
        console.error("Failed to edit comment", err);
      });
  }

  function handleCommentLike(commentId, currentLikeFlag) {
    if (!accessToken) {
      alert("You must be logged in to like comments.");
      return;
    }

    const newFlag = currentLikeFlag === 1 ? 0 : 1; // Toggle like/unlike
    const originalComments = [...commentsList];

    // optimistic update
    function updateLike(list) {
      return list.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, like_flag: newFlag };
        }
        if (comment.replies && comment.replies.length) {
          return { ...comment, replies: updateLike(comment.replies) };
        }
        return comment;
      });
    }
    setCommentsList(updateLike);

    // dispatch to server
    dispatch(updateCommentLike({ comment_id: commentId, flag: newFlag }))
      .unwrap()
      .then(() => {
        // refresh the full detail from server for real-time updates
        return dispatch(fetchBlogDetails(postData.id)).unwrap();
      })
      .catch((err) => {
        // rollback
        setCommentsList(originalComments);
        console.error("Failed to update comment like", err);
      });
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
                <div>
                  {postData.author_image ? (
                    <img
                      src={postData.author_image}
                      alt={postData.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                      {(postData.author || "A").charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-md font-semibold">{postData.author}</div>
                  <div className="text-xs text-gray-400">
                    {postData.timestamp
                      ? formatDateTime(postData.timestamp)
                      : postData.minutes
                      ? `${postData.minutes} min`
                      : ""}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <RiShareForwardLine className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-6 mb-6 p-4 ">
              {postData.image && (
                <div className="w-full h-56 overflow-hidden">
                  <img
                    src={postData.image}
                    alt={postData.title}
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>
              )}
            </div>
            <header className="mt-6">
              <h1 className="text-3xl md:text-4xl  leading-tight">
                {postData.title}
              </h1>
              <p className="mt-4 text-gray-600">{postData.excerpt}</p>
            </header>
            <article className="prose prose-sm md:prose-lg max-w-none mt-6 text-gray-800">
              {/* If API provides rich HTML use it. NOTE: this uses dangerouslySetInnerHTML
                  and should be sanitized if the content is untrusted (e.g. DOMPurify).
              */}
              {renderedHtml ? (
                <div
                  className="blog-html"
                  dangerouslySetInnerHTML={{ __html: renderedHtml }}
                />
              ) : (
                <>
                  <h3>Why training matters</h3>
                  <p>
                    It is one thing to make tools available; it is another to
                    give teachers the confidence and competence to use them.
                    Training reduces risk, increases impact and ensures equity
                    of access across a school.
                  </p>

                  <h4>Practical benefits</h4>
                  <ul>
                    <li>
                      Reduces teacher workload with automations and smart
                      prompts.
                    </li>
                    <li>
                      Improves student feedback with targeted AI-generated
                      suggestions.
                    </li>
                    <li>
                      Supports leaders with data-informed planning and
                      assessment.
                    </li>
                  </ul>

                  <p>
                    Below are short, practical steps schools can take to begin
                    their AI journey without costly procurement cycles or long
                    vendor commitments.
                  </p>

                  <h4>Steps to start</h4>
                  <ol>
                    <li>
                      Start small: trial in one department with a clear
                      evaluation plan.
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
                    If you'd like a template training plan or a short CPD
                    session to run with staff, we have ready-made materials that
                    can be adapted to your setting.
                  </p>
                </>
              )}
            </article>

            <div className="mt-20 border-t border-gray-200 my-6" />
            <div className="p-4 flex items-center justify-between text-md text-gray-500">
              <div className="flex items-center gap-4">
                <span className="cursor-pointer hover:text-gray-700">
                  {postData.views || 0} views
                </span>
                <span className="cursor-pointer hover:text-gray-700">
                  {postData.comments_count || commentsList.length} comments
                </span>
              </div>
              <div>
                {liked[postData.id] ? (
                  <button
                    onClick={() =>
                      setLiked((s) => ({ ...s, [postData.id]: false }))
                    }
                    aria-label="unlike"
                    className="focus:outline-none"
                  >
                    {/* <FaHeart className="h-5 w-5 text-red-500" /> */}
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setLiked((s) => ({ ...s, [postData.id]: true }))
                    }
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
                {postData.comments_count || commentsList.length} Comments
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
                              {formatDateTime(c.datetime)}
                            </div>
                          </div>
                        </div>
                        <p className="mt-2 text-gray-700">{c.text}</p>

                        <div className="mt-3 flex items-center gap-3">
                          <button
                            onClick={() => handleReplyToggle(c.id)}
                            className="text-sm text-gray-600"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => handleCommentLike(c.id, c.like_flag)}
                            className={`text-sm flex items-center gap-1 transition-colors ${
                              c.like_flag === 1
                                ? "text-red-600"
                                : "text-gray-600 hover:text-red-600"
                            }`}
                          >
                            {c.like_flag === 1 ? (
                              <FaHeart className="h-3 w-3" />
                            ) : (
                              <CiHeart className="h-3 w-3" />
                            )}
                            {c.like_flag === 1 ? "Unlike" : "Like"}
                          </button>
                          {canModify(c.author) && (
                            <>
                              <button
                                onClick={() => handleEditToggle(c.id, c.text)}
                                className="text-sm text-blue-600"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteComment(c.id)}
                                className="text-sm text-red-600"
                              >
                                Delete
                              </button>
                            </>
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
                              className="w-full border border-gray-200 rounded-md p-2 "
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
                                  <div className="font-semibold">
                                    {r.author}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {formatDateTime(r.datetime)}
                                  </div>
                                </div>
                                <p className="mt-2 text-gray-700">{r.text}</p>

                                <div className="mt-2 flex items-center gap-3">
                                  <button
                                    onClick={() =>
                                      handleReplyToggle(`${c.id}_${r.id}`)
                                    }
                                    className="text-sm text-gray-600"
                                  >
                                    Reply
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleCommentLike(r.id, r.like_flag)
                                    }
                                    className={`text-sm flex items-center gap-1 transition-colors ${
                                      r.like_flag === 1
                                        ? "text-red-600"
                                        : "text-gray-600 hover:text-red-600"
                                    }`}
                                  >
                                    {r.like_flag === 1 ? (
                                      <FaHeart className="h-3 w-3" />
                                    ) : (
                                      <CiHeart className="h-3 w-3" />
                                    )}
                                    {r.like_flag === 1 ? "Unlike" : "Like"}
                                  </button>
                                  {canModify(r.author) && (
                                    <>
                                      <button
                                        onClick={() =>
                                          handleEditToggle(r.id, r.text)
                                        }
                                        className="text-sm text-blue-600"
                                      >
                                        Edit
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleDeleteReply(c.id, r.id)
                                        }
                                        className="text-sm text-red-600"
                                      >
                                        Delete
                                      </button>
                                    </>
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
                                {editOpen[r.id] && (
                                  <form
                                    onSubmit={(e) =>
                                      handleEditSubmit(e, c.id, r.id)
                                    }
                                    className="mt-2"
                                  >
                                    <textarea
                                      rows={3}
                                      value={editTexts[r.id] || ""}
                                      onChange={(e) =>
                                        setEditTexts((s) => ({
                                          ...s,
                                          [r.id]: e.target.value,
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
                                            [r.id]: false,
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

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl ">Recent Post</h2>
              <Link to="/blog" className="text-md text-gray-900">
                View All
              </Link>
            </div>
            <Blog title="Recent Blog Post" />
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {RECENT.map((r) => (
                <SmallCard
                  key={r.id}
                  post={{
                    id: r.id,
                    title: r.title,
                    excerpt: r.title,
                    author: r.author,
                    thumbnail: r.image,
                    date: "Jul 1",
                    readTime: `${r.minutes} min`,
                  }}
                  onOpen={handleOpen}
                  onToggleLike={handleToggleLike}
                  liked={!!liked[r.id]}
                />
              ))}
            </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default BlogDetails;
