// Editor.jsx
import React, { useMemo, useState, useEffect } from "react";
import { createEditor, Editor, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./editorHelp/ToolBar";
import serializeToMarkdown from "./editorHelp/sateToMarkdown";
import Header from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogDetails } from "../../Redux/Blogs";
import { BASE_URL } from "../../Redux/config";

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    /* horizontal-rule, image and video node types removed — fall through to default paragraph */
    case "table":
      return (
        <table {...attributes}>
          <tbody>{children}</tbody>
        </table>
      );
    case "table-row":
      return <tr {...attributes}>{children}</tr>;
    case "table-cell":
      return (
        <td
          {...attributes}
          style={{ border: "1px solid #ccc", padding: "8px" }}
        >
          {children}
        </td>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.code) children = <code>{children}</code>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.fontSize)
    children = <span style={{ fontSize: leaf.fontSize }}>{children}</span>;
  return <span {...attributes}>{children}</span>;
};

const SlateEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogsState = useSelector((s) => s.blogs || {});

  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [coverPreview, setCoverPreview] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [title, setTitle] = useState("");
  const [htmlField, setHtmlField] = useState("");
  const [loading, setLoading] = useState(false);
  const [datetime] = useState(() => {
    const dt = new Date();
    const pad = (n) => String(n).padStart(2, "0");
    return `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(
      dt.getDate()
    )} ${pad(dt.getHours())}:${pad(dt.getMinutes())}`;
  });

  function handleCoverFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // --- Slate <-> HTML helpers -------------------------------------------------
  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function slateValueToHtml(nodes) {
    if (!nodes) return "";

    function renderLeaf(leaf, text) {
      let t = escapeHtml(text || "");
      if (leaf.code) t = `<code>${t}</code>`;
      if (leaf.bold) t = `<strong>${t}</strong>`;
      if (leaf.italic) t = `<em>${t}</em>`;
      if (leaf.underline) t = `<u>${t}</u>`;
      if (leaf.fontSize)
        t = `<span style=\"font-size:${leaf.fontSize}\">${t}</span>`;
      return t;
    }

    function nodeToHtml(node) {
      if (node.text !== undefined) return escapeHtml(node.text);
      const children = (node.children || [])
        .map((n) => {
          if (n.text !== undefined) return renderLeaf(n, n.text);
          if (Array.isArray(n.children))
            return n.children
              .map((c) => (c.text ? renderLeaf(c, c.text) : nodeToHtml(c)))
              .join("");
          return nodeToHtml(n);
        })
        .join("");

      switch (node.type) {
        case "heading-one":
          return `<h1>${children}</h1>`;
        case "heading-two":
          return `<h2>${children}</h2>`;
        case "bulleted-list":
          return `<ul>${children}</ul>`;
        case "numbered-list":
          return `<ol>${children}</ol>`;
        case "list-item":
          return `<li>${children}</li>`;
        case "table":
          return `<table><tbody>${children}</tbody></table>`;
        case "table-row":
          return `<tr>${children}</tr>`;
        case "table-cell":
          return `<td style=\"border:1px solid #ccc;padding:8px\">${children}</td>`;
        default:
          return `<p>${children}</p>`;
      }
    }

    const inner = nodes.map((n) => nodeToHtml(n)).join("\n");
    return `<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n<meta charset=\"utf-8\">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title></title>\n<style>body{font-family:Arial,Helvetica,sans-serif;margin:20px;line-height:1.6;color:#222}h1,h2{color:#111}p{color:#333}</style>\n</head>\n<body>\n${inner}\n</body>\n</html>`;
  }

  function htmlToSlateNodes(html) {
    console.log("htmlToSlateNodes called with:", html);

    if (!html) {
      console.log("No HTML provided, returning default");
      return [{ type: "paragraph", children: [{ text: "" }] }];
    }

    // Clean up the HTML - remove \r\n and normalize whitespace
    const cleanHtml = html
      .replace(/\\r\\n/g, "\n")
      .replace(/\r\n/g, "\n")
      .replace(/\\"/g, '"');
    console.log("Cleaned HTML:", cleanHtml);

    // Parse the full HTML document
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHtml, "text/html");
    console.log("Parsed document:", doc);
    console.log("Document body:", doc.body);
    console.log("Body innerHTML:", doc.body?.innerHTML);

    function walk(node, marks = {}) {
      const out = [];
      node.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent || "";
          if (text.trim()) {
            // Only add non-empty text
            out.push({ text, ...marks });
          }
          return;
        }
        if (child.nodeType === Node.ELEMENT_NODE) {
          const tag = child.tagName.toLowerCase();

          // Handle inline formatting
          if (tag === "strong" || tag === "b") {
            out.push(...walk(child, { ...marks, bold: true }));
            return;
          }
          if (tag === "em" || tag === "i") {
            out.push(...walk(child, { ...marks, italic: true }));
            return;
          }
          if (tag === "u") {
            out.push(...walk(child, { ...marks, underline: true }));
            return;
          }
          if (tag === "code") {
            out.push(...walk(child, { ...marks, code: true }));
            return;
          }
          if (tag === "mark") {
            // Treat mark as bold for now since Slate doesn't have highlight
            out.push(...walk(child, { ...marks, bold: true }));
            return;
          }
          if (tag === "span") {
            // Handle span elements with style attributes
            const style = child.getAttribute("style") || "";
            let newMarks = { ...marks };

            // Extract font-size from style attribute
            if (style.includes("font-size:")) {
              const fontSizeMatch = style.match(/font-size:\s*(\d+)px/);
              if (fontSizeMatch) {
                newMarks.fontSize = fontSizeMatch[1] + "px";
              }
            }

            out.push(...walk(child, newMarks));
            return;
          }

          // Handle block elements
          if (tag === "p") {
            const children = walk(child, {});
            if (children.length === 0) {
              children.push({ text: "" });
            }
            out.push({
              type: "paragraph",
              children: children,
            });
            return;
          }
          if (tag === "h1") {
            const children = walk(child, {});
            if (children.length === 0) {
              children.push({ text: "" });
            }
            out.push({
              type: "heading-one",
              children: children,
            });
            return;
          }
          if (tag === "h2") {
            const children = walk(child, {});
            if (children.length === 0) {
              children.push({ text: "" });
            }
            out.push({
              type: "heading-two",
              children: children,
            });
            return;
          }
          if (tag === "ul") {
            const items = [];
            child.childNodes.forEach((li) => {
              if (li.tagName && li.tagName.toLowerCase() === "li") {
                const children = walk(li, {});
                if (children.length === 0) {
                  children.push({ text: "" });
                }
                items.push({
                  type: "list-item",
                  children: children,
                });
              }
            });
            if (items.length > 0) {
              out.push({ type: "bulleted-list", children: items });
            }
            return;
          }
          if (tag === "ol") {
            const items = [];
            child.childNodes.forEach((li) => {
              if (li.tagName && li.tagName.toLowerCase() === "li") {
                const children = walk(li, {});
                if (children.length === 0) {
                  children.push({ text: "" });
                }
                items.push({
                  type: "list-item",
                  children: children,
                });
              }
            });
            if (items.length > 0) {
              out.push({ type: "numbered-list", children: items });
            }
            return;
          }
          if (tag === "pre") {
            // Convert pre to paragraph with code formatting
            const text = child.textContent || "";
            out.push({
              type: "paragraph",
              children: [{ text, code: true }],
            });
            return;
          }
          if (tag === "br") {
            // Add line break as empty paragraph
            out.push({
              type: "paragraph",
              children: [{ text: "" }],
            });
            return;
          }

          // Skip style, script, meta, title, head tags
          if (["style", "script", "meta", "title", "head"].includes(tag)) {
            return;
          }

          // For other tags, recurse into children
          const children = walk(child, marks);
          out.push(...children);
        }
      });
      return out;
    }

    // Extract content from body only
    const bodyContent = doc.body || doc.documentElement || doc;
    const bodyChildren = walk(bodyContent, {});
    console.log("Body children after walking:", bodyChildren);

    // Filter out empty blocks and organize
    const blocks = [];
    bodyChildren.forEach((node) => {
      if (node.type) {
        // It's a block element
        blocks.push(node);
      } else if (node.text !== undefined && node.text.trim()) {
        // It's loose text, wrap in paragraph
        blocks.push({
          type: "paragraph",
          children: [node],
        });
      }
    });

    console.log("Final blocks:", blocks);
    const result =
      blocks.length > 0
        ? blocks
        : [{ type: "paragraph", children: [{ text: "" }] }];

    console.log("Returning from htmlToSlateNodes:", result);
    return result;
  }

  // small helper to unescape HTML entities like &lt; &gt; that some APIs return
  function unescapeHtmlEntities(s) {
    if (!s || typeof s !== "string") return s;
    return s
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }

  // load blog details when mounted or id changes
  useEffect(() => {
    if (!id) return;
    // Prefer using Redux thunk if available
    dispatch(fetchBlogDetails(id));
  }, [dispatch, id]);

  // populate local state when detail arrives
  useEffect(() => {
    const detail = blogsState.detail;
    console.log("Detail received:", detail);
    console.log("Current ID:", id);

    if (!detail || Number(detail.id) !== Number(id)) {
      console.log("Detail not matching or missing");
      return;
    }

    setTitle(detail.title || "");
    console.log("Title set:", detail.title);

    // backend may return full HTML string
    let incomingHtml = detail.html_field || detail.html || "";
    console.log("Raw HTML received:", incomingHtml);

    // some APIs return the HTML escaped (entities). Detect and unescape.
    if (incomingHtml.includes("&lt;") || incomingHtml.includes("&gt;")) {
      incomingHtml = unescapeHtmlEntities(incomingHtml);
      console.log("HTML after unescaping:", incomingHtml);
    }

    setHtmlField(incomingHtml);

    // banner may be a URL
    setCoverPreview(detail.banner || detail.cover || "");
    console.log("Cover preview set:", detail.banner || detail.cover);

    // try to convert incoming HTML into Slate nodes for direct editing
    try {
      const nodes = htmlToSlateNodes(incomingHtml);
      console.log("Converted Slate nodes:", nodes);
      if (nodes && nodes.length) {
        // Force the editor to update by setting a new object reference
        const newValue = [...nodes];
        setValue(newValue);
        console.log("Value set to:", newValue);

        // Also force a re-render after a short delay
        setTimeout(() => {
          setValue([...newValue]);
        }, 100);
      }
    } catch (e) {
      console.error("Error converting HTML to Slate:", e);
      setValue([{ type: "paragraph", children: [{ text: "" }] }]);
    }
  }, [blogsState.detail, id]);

  async function handleUpdate() {
    if (!title || !title.trim()) {
      alert("Please enter a title.");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("blog_id", id);
      formData.append("title", title);
      formData.append("html_field", htmlField || "");
      if (coverFile) formData.append("banner", coverFile);

      const token =
        localStorage.getItem("access_token") ||
        localStorage.getItem("accessToken");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await fetch(`${BASE_URL}/admin_dashboard/update_blog/`, {
        method: "PATCH",
        headers,
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`Update failed: ${data?.message || JSON.stringify(data)}`);
        setLoading(false);
        return;
      }
      alert("Blog updated successfully.");
      // navigate to details page for this blog
      navigate(`/admin/blogdetails/${id}`);
    } catch (err) {
      alert(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="">
      <Header />

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800">Edit post</h2>
          <p className="mt-1 text-sm text-gray-500">
            Edit the fields and click Update to save changes.
          </p>

          <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block">
                <span className="text-base font-medium text-gray-700">
                  Title
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear, descriptive title"
                  className="mt-2 block w-full border border-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800"
                />
              </label>
            </div>

            <div>
              <label className="text-base font-medium text-gray-700 block">
                Cover photo
              </label>
              <div className="mt-2 flex items-center gap-4">
                <label
                  htmlFor="coverFile"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition text-sm"
                >
                  Choose file
                </label>
                <input
                  id="coverFile"
                  type="file"
                  accept="image/*"
                  onChange={handleCoverFile}
                  className="hidden"
                />
                <div className="flex items-center gap-3">
                  <div className="w-24 h-16 bg-gray-50 border rounded overflow-hidden flex items-center justify-center">
                    {coverPreview ? (
                      <img
                        src={coverPreview}
                        alt="cover preview"
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <span className="text-xs text-gray-400 px-1">
                        No file
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="text-base font-medium text-gray-700 block">
                Content
              </label>
              <div className="mt-2 border border-gray-200 rounded-md p-3 bg-white">
                <Slate
                  key={id + "-" + (value.length || 0)} // Force re-render when content changes
                  editor={editor}
                  value={value}
                  initialValue={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                    try {
                      const html = slateValueToHtml(newValue);
                      setHtmlField(html);
                    } catch (e) {
                      // ignore
                    }
                  }}
                >
                  <Toolbar />
                  <Editable
                    renderElement={(props) => <Element {...props} />}
                    renderLeaf={(props) => <Leaf {...props} />}
                    placeholder="Write your post content here..."
                    spellCheck
                    autoFocus
                    style={{
                      minHeight: 400,
                      padding: "12px",
                      fontSize: "16px",
                      lineHeight: "1.6",
                    }}
                  />
                </Slate>
              </div>
            </div>
          </section>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpdate}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md text-sm shadow"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlateEditor;
