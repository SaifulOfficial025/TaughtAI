import React, { useState } from "react";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const SAMPLE_BLOGS = [
  {
    id: 1,
    author: "Ben Duggan",
    datetime: "2025-07-15 10:30",
    cover:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
    title: "Gemini in the Classroom",
    subtitle: "AI Tools Mean Nothing If Staff Aren't Trained to Use Them.",
  },
  {
    id: 2,
    author: "Ben Duggan",
    datetime: "2025-07-14 09:15",
    cover:
      "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1400&auto=format&fit=crop",
    title: "Policy-Proof AI",
    subtitle: "How Taught AI is Setting the Standard in AI for Schools.",
  },
  {
    id: 3,
    author: "Alice Smith",
    datetime: "2025-07-12 11:00",
    cover:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop",
    title: "AI in Primary",
    subtitle: "Practical classroom uses for younger learners.",
  },
  {
    id: 4,
    author: "John Roe",
    datetime: "2025-07-10 14:20",
    cover:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1400&auto=format&fit=crop",
    title: "Leadership & AI",
    subtitle: "How SLT can lead successful AI adoption.",
  },
  {
    id: 5,
    author: "Ben Duggan",
    datetime: "2025-07-08 09:50",
    cover:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1400&auto=format&fit=crop",
    title: "Assistive Tools",
    subtitle: "Simple steps to reduce teacher workload.",
  },
  {
    id: 6,
    author: "Clara Jones",
    datetime: "2025-07-05 16:40",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1400&auto=format&fit=crop",
    title: "SEND and AI",
    subtitle: "Designing inclusive prompts for SEND pupils.",
  },
  {
    id: 7,
    author: "Ben Duggan",
    datetime: "2025-06-30 08:15",
    cover:
      "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?q=80&w=1400&auto=format&fit=crop",
    title: "Curriculum Mapping",
    subtitle: "Aligning AI outputs with national standards.",
  },
  {
    id: 8,
    author: "Alice Smith",
    datetime: "2025-06-25 13:05",
    cover:
      "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1400&auto=format&fit=crop",
    title: "Assessment with AI",
    subtitle: "Using automated feedback effectively.",
  },
  {
    id: 9,
    author: "John Roe",
    datetime: "2025-06-20 10:00",
    cover:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop",
    title: "Governance & AI",
    subtitle: "Preparing governors for AI oversight.",
  },
  {
    id: 10,
    author: "Clara Jones",
    datetime: "2025-06-18 11:30",
    cover:
      "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1400&auto=format&fit=crop",
    title: "Scaffolded Tasks",
    subtitle: "Creating tiered tasks with AI.",
  },
  {
    id: 11,
    author: "Ben Duggan",
    datetime: "2025-06-12 09:00",
    cover:
      "https://images.unsplash.com/photo-1504198458649-3128b932f49b?q=80&w=1400&auto=format&fit=crop",
    title: "Ofsted Readiness",
    subtitle: "Using AI to prepare inspection evidence.",
  },
  {
    id: 12,
    author: "Alice Smith",
    datetime: "2025-06-05 15:20",
    cover:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop",
    title: "Practical Prompts",
    subtitle: "Examples teachers can reuse tomorrow.",
  },
];

function BlogList() {
  const [blogs, setBlogs] = useState(() => {
    try {
      const raw = localStorage.getItem("taughtai_blogs");
      if (raw) return JSON.parse(raw);
    } catch (err) {
      // ignore
    }
    return SAMPLE_BLOGS;
  });
  const [query, setQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [sortOrder, setSortOrder] = useState("newest");
  const navigate = useNavigate();

  function handleDetails(b) {
    // navigate to the admin details page for this blog
    navigate(`/admin/blogdetails/${b.id}`);
  }

  function handleEdit(b) {
    // navigate to edit page for this blog
    navigate(`/admin/editblog/${b.id}`);
  }

  function handleDelete(b) {
    if (!confirm(`Delete blog "${b.title}"? This cannot be undone.`)) return;
    setBlogs((prev) => prev.filter((p) => p.id !== b.id));
  }

  function passesDateFilter(b) {
    if (dateFilter === "all") return true;
    const post = new Date(b.datetime);
    const now = new Date();
    if (dateFilter === "last7") {
      return post >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    }
    if (dateFilter === "last30") {
      return post >= new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    if (dateFilter === "thisMonth") {
      return (
        post.getFullYear() === now.getFullYear() &&
        post.getMonth() === now.getMonth()
      );
    }
    if (dateFilter === "lastMonth") {
      const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const startNext = new Date(now.getFullYear(), now.getMonth(), 1);
      return post >= prev && post < startNext;
    }
    return true;
  }

  // derive filtered/sorted/paged lists so the same data is used across the table and pagination
  const filtered = blogs.filter((b) => {
    const matchQuery =
      query.trim() === "" ||
      (b.title + " " + b.subtitle).toLowerCase().includes(query.toLowerCase());
    const matchDate = passesDateFilter(b);
    return matchQuery && matchDate;
  });

  const sorted = [...filtered].sort((a, b) => {
    const ad = new Date(a.datetime).getTime();
    const bd = new Date(b.datetime).getTime();
    return sortOrder === "newest" ? bd - ad : ad - bd;
  });

  const totalFiltered = sorted.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const paged = sorted.slice(start, start + pageSize);

  return (
    <div>
      <Header />
      <section className="max-w-6xl mx-auto px-6 py-10 min-h-screen">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Blog posts</h2>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search title or subtitle..."
              className="w-full md:w-64 border border-gray-200 rounded-md px-3 py-2"
            />
            <select
              value={dateFilter}
              onChange={(e) => {
                setDateFilter(e.target.value);
                setPage(1);
              }}
              className="border border-gray-200 rounded-md px-3 py-2"
            >
              <option value="all">All dates</option>
              <option value="last7">Last 7 days</option>
              <option value="last30">Last 30 days</option>
              <option value="last6Months">Last 6 months</option>
              <option value="lastYear">Last 12 months</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value);
                setPage(1);
              }}
              className="border border-gray-200 rounded-md px-3 py-2"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-sm">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Author
                </th> */}
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Cover Image
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Title
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Subtitle
                </th>
                <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paged.map((b) => (
                <tr key={b.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {b.datetime}
                  </td>
                  <td className="px-4 py-4">
                    <img
                      src={b.cover}
                      alt="cover"
                      className="w-20 h-12 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">
                    {b.title}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-700">
                    {b.subtitle}
                  </td>
                  <td className="px-4 py-4 text-sm text-right">
                    <div className="inline-flex items-center gap-2">
                      <button
                        onClick={() => handleDetails(b)}
                        className="px-3 py-1.5 bg-gray-100 rounded-md text-sm"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleEdit(b)}
                        className="px-3 py-1.5 bg-yellow-100 rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b)}
                        className="px-3 py-1.5 bg-red-100 rounded-md text-sm text-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-gray-600">
            Showing {totalFiltered === 0 ? 0 : start + 1} -{" "}
            {Math.min(totalFiltered, start + pageSize)} of {totalFiltered} posts
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1 rounded-md bg-gray-100"
              disabled={currentPage <= 1}
            >
              Prev
            </button>
            {/* page numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pn) => (
              <button
                key={pn}
                onClick={() => setPage(pn)}
                className={`px-3 py-1 rounded-md ${
                  pn === currentPage ? "bg-gray-800 text-white" : "bg-gray-100"
                }`}
              >
                {pn}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-1 rounded-md bg-gray-100"
              disabled={currentPage >= totalPages}
            >
              Next
            </button>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
              className="border border-gray-200 rounded-md px-2 py-1 ml-2"
            >
              <option value={6}>6 / page</option>
              <option value={9}>9 / page</option>
              <option value={12}>12 / page</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BlogList;
