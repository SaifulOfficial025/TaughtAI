import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
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

function AddNewBlog() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [coverPreview, setCoverPreview] = useState("");
  const [uploadedName, setUploadedName] = useState("");
  const [details, setDetails] = useState("");
  const editorRef = useRef(null);
  const imgFileInputRef = useRef(null);

  React.useEffect(() => {
    try {
      document.execCommand("enableObjectResizing", false, true);
      document.execCommand("enableInlineTableEditing", false, true);
    } catch (e) {
      // ignore if not supported
    }

    // Add custom styles for the editor
    const style = document.createElement("style");
    style.textContent = `
      .image-wrapper {
        position: relative;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .image-wrapper:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .image-wrapper img {
        transition: all 0.2s ease;
        user-select: none;
      }
      .image-wrapper.selected {
        outline: 2px solid #3b82f6;
        outline-offset: 2px;
      }
      [contenteditable] {
        caret-color: #3b82f6;
      }
      [contenteditable]:focus {
        outline: none;
      }
      [contenteditable] p {
        margin: 0.5rem 0;
      }
      [contenteditable] h1, [contenteditable] h2, [contenteditable] h3 {
        margin: 1rem 0 0.5rem 0;
        font-weight: 600;
      }
      [contenteditable] ul, [contenteditable] ol {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
      }
      [contenteditable] pre {
        background: #f3f4f6;
        padding: 0.75rem;
        border-radius: 0.375rem;
        margin: 0.5rem 0;
        font-family: 'Courier New', monospace;
        overflow-x: auto;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
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

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Please provide a title");

    const cover = coverPreview || coverUrl || "";
    // Build a full HTML document from editor HTML
    const bodyHtml = details || "";
    const fullHtml = `<!DOCTYPE html>\r\n<html lang="en">\r\n<head>\r\n    <meta charset="UTF-8">\r\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\r\n    <title>${
      title.trim() || "Blog Post"
    }</title>\r\n    <style>\r\n        /* Basic styling for posts */\r\n        body { font-family: Arial, Helvetica, sans-serif; margin: 20px; line-height: 1.6; color: #222 }\r\n        h1,h2,h3 { color: #111 }\r\n        p { color: #333 }\r\n        img { max-width: 100%; height: auto; }\r\n        pre { background: #f4f4f4; padding: 12px; overflow:auto }\r\n    </style>\r\n</head>\r\n<body>\r\n${bodyHtml}\r\n</body>\r\n</html>`;

    const newBlog = {
      id: Date.now(),
      author: "Admin",
      datetime: toStorageDatetime(datetime),
      cover,
      title: title.trim(),
      subtitle: subtitle.trim(),
      details: fullHtml,
    };

    // save to localStorage array
    try {
      const raw = localStorage.getItem("taughtai_blogs");
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(newBlog);
      localStorage.setItem("taughtai_blogs", JSON.stringify(arr));
    } catch (err) {
      console.error("Failed to save blog", err);
    }

    // redirect to admin list
    navigate("/admin/bloglist");
  }

  // Align the currently selected image wrapper
  function setSelectedImageAlignment(alignment) {
    try {
      // First try to find a selected image wrapper
      const selectedWrapper = editorRef.current?.querySelector(
        ".image-wrapper.selected"
      );

      if (!selectedWrapper) {
        // If no selected wrapper, try to find based on cursor position
        const sel = window.getSelection();
        if (!sel.rangeCount) {
          alert("Click on an image first to align it.");
          return;
        }

        let node = sel.anchorNode;
        if (!node) return;
        if (node.nodeType === 3) node = node.parentNode;

        let wrapper = null;
        let current = node;
        while (current && current !== editorRef.current) {
          if (
            current.classList &&
            current.classList.contains("image-wrapper")
          ) {
            wrapper = current;
            break;
          }
          current = current.parentNode;
        }

        if (!wrapper) {
          alert("Click on an image first to align it.");
          return;
        }

        // Select this wrapper
        wrapper.classList.add("selected");
      }

      const wrapper =
        selectedWrapper ||
        editorRef.current?.querySelector(".image-wrapper.selected");
      if (!wrapper) return;

      // Apply alignment styles
      if (alignment === "left") {
        wrapper.style.textAlign = "left";
        wrapper.style.float = "left";
        wrapper.style.margin = "0.5rem 1rem 1rem 0";
        wrapper.style.display = "block";
        wrapper.style.maxWidth = "50%";
      } else if (alignment === "right") {
        wrapper.style.textAlign = "right";
        wrapper.style.float = "right";
        wrapper.style.margin = "0.5rem 0 1rem 1rem";
        wrapper.style.display = "block";
        wrapper.style.maxWidth = "50%";
      } else {
        wrapper.style.textAlign = "center";
        wrapper.style.float = "none";
        wrapper.style.margin = "1rem auto";
        wrapper.style.display = "block";
        wrapper.style.maxWidth = "100%";
      }
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <Header />
      <section className="min-h-screen flex items-start justify-center  px-4 py-10">
        <form
          onSubmit={handleSubmit}
          className="w-full  bg-white p-6 rounded-lg shadow"
        >
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Add new blog post</h2>
              <p className="text-sm text-gray-500 mt-1">
                Create a new blog post — add cover, title, date/time and full
                details.
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

            {/* Toolbar */}
            <div className="mt-2 mb-2 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => document.execCommand("bold", false, null)}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Bold"
              >
                <strong>B</strong>
              </button>
              <button
                type="button"
                onClick={() => document.execCommand("italic", false, null)}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Italic"
              >
                <em>I</em>
              </button>
              <button
                type="button"
                onClick={() => document.execCommand("underline", false, null)}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Underline"
              >
                <u>U</u>
              </button>
              <button
                type="button"
                onClick={() => document.execCommand("formatBlock", false, "h2")}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Heading"
              >
                H2
              </button>
              <button
                type="button"
                onClick={() =>
                  document.execCommand("insertUnorderedList", false, null)
                }
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Bullet list"
              >
                • List
              </button>
              <button
                type="button"
                onClick={() =>
                  document.execCommand("insertOrderedList", false, null)
                }
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Numbered list"
              >
                1. List
              </button>
              <button
                type="button"
                onClick={() =>
                  document.execCommand("formatBlock", false, "pre")
                }
                className="hidden"
                title="Preformatted"
              >
                {/* pre removed per user request */}
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = prompt("Image URL:");
                  if (url) {
                    const html = `<div class="image-wrapper" contenteditable="false" style="display:block;margin:1rem 0;text-align:center;"><img src="${url}" alt="image" style="max-width:100%;height:auto;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" /></div><div><br></div>`;
                    document.execCommand("insertHTML", false, html);
                  }
                }}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Insert image by URL"
              >
                🖼 Image URL
              </button>
              <button
                type="button"
                onClick={() =>
                  imgFileInputRef.current && imgFileInputRef.current.click()
                }
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Upload image"
              >
                📁 Upload Image
              </button>
              <button
                type="button"
                onClick={() => setSelectedImageAlignment("left")}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Align image left"
              >
                ⬅️ Left
              </button>
              <button
                type="button"
                onClick={() => setSelectedImageAlignment("center")}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Center image"
              >
                ↔️ Center
              </button>
              <button
                type="button"
                onClick={() => setSelectedImageAlignment("right")}
                className="px-2 py-1 bg-gray-100 rounded border"
                title="Align image right"
              >
                ➡️ Right
              </button>
            </div>

            {/* Hidden file input for image upload into editor */}
            <input
              type="file"
              accept="image/*"
              ref={imgFileInputRef}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  const dataUrl = reader.result;
                  // insert image at caret with proper wrapper and spacing
                  const html = `<div class="image-wrapper" contenteditable="false" style="display:block;margin:1rem 0;text-align:center;"><img src="${dataUrl}" alt="uploaded image" style="max-width:100%;height:auto;border-radius:4px;box-shadow:0 2px 8px rgba(0,0,0,0.1);" /></div><div><br></div>`;
                  document.execCommand("insertHTML", false, html);
                  // clear input
                  e.target.value = null;
                };
                reader.readAsDataURL(file);
              }}
              className="hidden"
            />

            {/* ContentEditable editor */}
            <div
              ref={editorRef}
              contentEditable
              suppressContentEditableWarning
              onInput={(e) => setDetails(e.currentTarget.innerHTML)}
              onClick={(e) => {
                // Handle image clicks specially but avoid blocking default focus behavior
                const isImage =
                  e.target.tagName === "IMG" ||
                  e.target.classList.contains("image-wrapper");
                if (isImage) {
                  // Remove previous selections
                  const prevSelected = editorRef.current?.querySelectorAll(
                    ".image-wrapper.selected"
                  );
                  prevSelected?.forEach((el) =>
                    el.classList.remove("selected")
                  );

                  // Add selection to clicked image wrapper
                  const wrapper = e.target.classList.contains("image-wrapper")
                    ? e.target
                    : e.target.closest(".image-wrapper");
                  if (wrapper) {
                    wrapper.classList.add("selected");

                    // Place caret after the wrapper so the editor remains focused and typing continues normally
                    try {
                      const sel = window.getSelection();
                      const range = document.createRange();
                      range.setStartAfter(wrapper);
                      range.collapse(true);
                      sel.removeAllRanges();
                      sel.addRange(range);
                      // ensure editor has focus
                      editorRef.current && editorRef.current.focus();
                    } catch (err) {
                      // ignore if range fails
                    }
                  }
                } else {
                  // For non-image clicks, clear image selections but allow normal text editing
                  const prevSelected = editorRef.current?.querySelectorAll(
                    ".image-wrapper.selected"
                  );
                  prevSelected?.forEach((el) =>
                    el.classList.remove("selected")
                  );
                  // Let browser handle focus and caret placement
                }
              }}
              className="mt-1 block w-full border border-gray-200 rounded-md p-4 min-h-[400px] max-h-[600px] overflow-y-auto bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{
                lineHeight: "1.6",
                fontSize: "16px",
                fontFamily: "system-ui, -apple-system, sans-serif",
                color: "#1f2937",
                cursor: "text",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
              }}
              onKeyDown={(e) => {
                // Handle Enter key for proper line breaks
                if (e.key === "Enter") {
                  if (e.shiftKey) {
                    // Shift+Enter = single line break
                    e.preventDefault();
                    document.execCommand("insertHTML", false, "<br>");
                  } else {
                    // Regular Enter = paragraph break
                    e.preventDefault();
                    document.execCommand(
                      "insertHTML",
                      false,
                      "<div><br></div>"
                    );
                  }
                }
                // Handle Tab key
                if (e.key === "Tab") {
                  e.preventDefault();
                  document.execCommand(
                    "insertHTML",
                    false,
                    "&nbsp;&nbsp;&nbsp;&nbsp;"
                  );
                }
              }}
              onPaste={(e) => {
                // Handle paste events to clean up formatting
                e.preventDefault();
                const text = e.clipboardData.getData("text/plain");
                document.execCommand("insertText", false, text);
              }}
              dangerouslySetInnerHTML={{ __html: details || "<div><br></div>" }}
            />
            <p className="text-xs text-gray-400 mt-2">
              Use the toolbar to format text and insert content. Press Enter for
              new paragraph, Shift+Enter for line break, Tab for indent.
            </p>
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

export default AddNewBlog;
