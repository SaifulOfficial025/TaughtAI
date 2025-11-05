import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetails } from "../../Redux/Blogs";
import Header from "./Header";

function BlogDetails() {
  const { id } = useParams();
  const postId = Number(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { detail, detailLoading } = useSelector((s) => s.blogs || {});
  const [post, setPost] = useState(null);

  // Load blog details on mount
  useEffect(() => {
    if (!postId) return;
    dispatch(fetchBlogDetails(postId));
  }, [postId, dispatch]);

  // Set post data when detail is loaded
  useEffect(() => {
    if (detail) {
      setPost({
        id: detail.id || postId,
        title: detail.title || detail.heading || "",
        excerpt: detail.excerpt || detail.description || detail.summary || "",
        image: detail.banner || detail.image || detail.thumbnail || "",
        author:
          (detail.author &&
            (detail.author.full_name ||
              detail.author.username ||
              detail.author.name)) ||
          detail.author_name ||
          detail.user ||
          "Author",
        author_image:
          (detail.author && detail.author.image) || detail.author_image || null,
        timestamp: detail.timestamp || detail.created_at || detail.time || null,
        minutes: detail.read_time || detail.minutes || 5,
        views: detail.views || 0,
        comments_count:
          detail.comment_count ||
          (detail.comments && detail.comments.length) ||
          0,
        love_react: detail.love_react || 0,
        html: detail.html_field || detail.body || "",
      });
    }
  }, [detail, postId]);

  // Format timestamps into user-friendly strings
  function formatDateTime(value) {
    if (!value) return "";
    const d = typeof value === "string" ? new Date(value) : value;
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString(undefined, {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Extract inner body content if the API returned a full HTML document
  function extractBodyHtml(htmlStr) {
    if (!htmlStr || typeof htmlStr !== "string") return "";
    const bodyMatch = htmlStr.match(
      /&lt;body[^&gt;]*&gt;([\s\S]*?)&lt;\/body&gt;/i
    );
    if (bodyMatch && bodyMatch[1]) return bodyMatch[1];
    let s = htmlStr.replace(/&lt;!doctype[^&gt;]*&gt;/i, "");
    s = s.replace(/&lt;head[\s\S]*?&lt;\/head&gt;/i, "");
    s = s.replace(/&lt;html[^&gt;]*&gt;/i, "").replace(/&lt;\/html&gt;/i, "");
    return s.trim();
  }

  if (detailLoading) {
    return (
      <section>
        <Header />
        <div className="px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading blog details...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section>
        <Header />
        <div className="px-6 md:px-12 lg:px-20 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <h1 className="text-2xl font-bold text-gray-900">
                Blog not found
              </h1>
              <p className="mt-4 text-gray-600">
                The blog post you're looking for doesn't exist.
              </p>
              <button
                onClick={() => navigate("/admin/bloglist")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Back to Blog List
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const renderedHtml = extractBodyHtml(post.html);

  return (
    <section>
      <Header />
      <div className="px-6 md:px-12 lg:px-20 py-12 font-playfair">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6">
            {/* Admin Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-900">
                Blog Details (Admin View)
              </h1>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate(`/admin/editblog/${post.id}`)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit Blog
                </button>
                <button
                  onClick={() => navigate("/admin/bloglist")}
                  className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                  Back to List
                </button>
              </div>
            </div>

            {/* Blog Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-800">Views</h3>
                <p className="text-2xl font-bold text-blue-600">{post.views}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-800">Comments</h3>
                <p className="text-2xl font-bold text-green-600">
                  {post.comments_count}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-red-800">Likes</h3>
                <p className="text-2xl font-bold text-red-600">
                  {post.love_react}
                </p>
              </div>
              {/* <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-800">
                  Read Time
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  {post.minutes} min
                </p>
              </div> */}
            </div>

            {/* Blog Content */}
            <div className="border rounded-lg p-6 bg-gray-50">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  {post.author_image ? (
                    <img
                      src={post.author_image}
                      alt={post.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-green-900 text-white flex items-center justify-center font-semibold">
                      {(post.author || "A").charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="text-lg font-semibold">{post.author}</div>
                    <div className="text-sm text-gray-500">
                      {post.timestamp
                        ? formatDateTime(post.timestamp)
                        : "No date"}
                    </div>
                  </div>
                </div>
              </div>

              {post.image && (
                <div className="mb-6">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <header className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {post.title}
                </h1>
                {post.excerpt && (
                  <p className="text-lg text-gray-600">{post.excerpt}</p>
                )}
              </header>

              <article className="prose prose-lg max-w-none text-gray-800">
                {renderedHtml ? (
                  <div
                    className="blog-html"
                    dangerouslySetInnerHTML={{ __html: renderedHtml }}
                  />
                ) : (
                  <div className="text-gray-500 italic">
                    No content available for this blog post.
                  </div>
                )}
              </article>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => window.open(`/blogs/${post.id}`, "_blank")}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                View Public Page
              </button>
              <button
                onClick={() => navigate(`/admin/editblog/${post.id}`)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Edit This Blog
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BlogDetails;
