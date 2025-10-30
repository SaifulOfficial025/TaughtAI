import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Header";

function formatForInputLocal(dt = new Date()) {
  // returns 'YYYY-MM-DDThh:mm'
  const pad = (n) => String(n).padStart(2, "0");
  const YYYY = dt.getFullYear();
  const MM = pad(dt.getMonth() + 1);
  const DD = pad(dt.getDate());
  const hh = pad(dt.getHours());
  const mm = pad(dt.getMinutes());
  return `${YYYY}-${MM}-${DD}T${hh}:${mm}`;
}

function EditBlog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [uploadedName, setUploadedName] = useState("");
  const [details, setDetails] = useState("");
  const [datetime, setDatetime] = useState(formatForInputLocal());

  function handleFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCoverPreview(reader.result);
      setCoverUrl("");
      setUploadedName(file.name);
    };
    reader.readAsDataURL(file);
  }

  function toStorageDatetime(inputVal) {
    // inputVal like '2025-07-15T10:30' -> '2025-07-15 10:30'
    return inputVal.replace("T", " ");
  }

  function storageToInputDatetime(st) {
    // '2025-07-15 10:30' -> '2025-07-15T10:30'
    if (!st) return formatForInputLocal();
    return st.replace(" ", "T");
  }

  // load existing blog when editing
  useEffect(() => {
    if (!id) return;
    try {
      const raw = localStorage.getItem("taughtai_blogs");
      if (!raw) return;
      const arr = JSON.parse(raw);
      const bid = Number(id);
      const found = arr.find(
        (b) => Number(b.id) === bid || String(b.id) === String(id)
      );
      if (!found) return;
      setTitle(found.title || "");
      setSubtitle(found.subtitle || "");
      setDetails(found.details || "");
      setDatetime(storageToInputDatetime(found.datetime));
      // if cover is a data url, show as preview, else populate URL input
      if (found.cover && String(found.cover).startsWith("data:")) {
        setCoverPreview(found.cover);
        setCoverUrl("");
      } else {
        setCoverUrl(found.cover || "");
        setCoverPreview("");
      }
      setUploadedName("");
    } catch (err) {
      // ignore
    }
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please provide a title");

    const cover = coverPreview || coverUrl || "";
    const newBlog = {
      id: id ? Number(id) : Date.now(),
      author: "Admin",
      datetime: toStorageDatetime(datetime),
      cover,
      title: title.trim(),
      subtitle: subtitle.trim(),
      details: details.trim(),
    };

    // save to localStorage array
    try {
      const raw = localStorage.getItem("taughtai_blogs");
      const arr = raw ? JSON.parse(raw) : [];
      if (id) {
        // replace existing
        const idx = arr.findIndex((b) => String(b.id) === String(id));
        if (idx >= 0) {
          arr[idx] = newBlog;
        } else {
          // if not found, prepend
          arr.unshift(newBlog);
        }
      } else {
        arr.unshift(newBlog);
      }
      localStorage.setItem("taughtai_blogs", JSON.stringify(arr));
    } catch (err) {
      console.error("Failed to save blog", err);
    }

    // redirect to admin list
    navigate("/admin/bloglist");
  }

  return (
    <div>
      <Header />
      <section className="min-h-screen flex items-start justify-center  px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-3xl bg-white p-6 rounded-lg shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">
                {id ? "Edit blog post" : "Add new blog post"}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {id
                  ? "Update the post and save changes."
                  : "Create a new blog post — add cover, title, date/time and full details."}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Cover photo (URL)
              </span>
              <input
                value={coverUrl}
                onChange={(e) => {
                  setCoverUrl(e.target.value);
                  setCoverPreview("");
                  setUploadedName("");
                }}
                placeholder="https://..."
                className="mt-1 block w-full border border-gray-200 rounded-md p-2"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter a public image URL or upload a file.
              </p>
            </label>

            <div>
              <span className="text-sm font-medium text-gray-700">
                Or upload file
              </span>
              <div className="mt-1 flex items-center gap-3">
                <label
                  htmlFor="coverFile"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9M8 8l4-4 4 4"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">Choose file</span>
                </label>
                <input
                  id="coverFile"
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
                <div className="text-sm text-gray-500">
                  {uploadedName || "No file selected"}
                </div>
              </div>
            </div>
          </div>

          {(coverPreview || coverUrl) && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">Preview</span>
              <div className="mt-2 w-full h-48 rounded overflow-hidden bg-gray-50 flex items-center justify-center border border-dashed border-gray-200">
                <img
                  src={coverPreview || coverUrl}
                  alt="preview"
                  className="max-h-full object-contain"
                />
              </div>
            </div>
          )}

          <label className="block mb-3">
            <span className="text-sm font-medium text-gray-700">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, descriptive title"
              className="mt-1 block w-full border border-gray-200 rounded-md p-2"
            />
          </label>

          <label className="block mb-3">
            <span className="text-sm font-medium text-gray-700">Subtitle</span>
            <textarea
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Write subtitle"
              className="mt-1 block w-full border border-gray-200 rounded-md p-2"
            />
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">
                Date &amp; time
              </span>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="mt-1 block w-full border border-gray-200 rounded-md p-2"
              />
            </label>
          </div>

          <label className="block mb-4">
            <span className="text-sm font-medium text-gray-700">Details</span>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={10}
              placeholder="Write your post"
              className="mt-1 block w-full border border-gray-200 rounded-md p-3 min-h-[180px]"
            />
          </label>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/admin/bloglist")}
              className="px-4 py-2 rounded-md bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-blue-600 text-white shadow hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditBlog;
