// Editor.jsx
import React, { useMemo, useState } from "react";
import { createEditor, Editor, Element as SlateElement } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "./editorHelp/ToolBar";
import serializeToMarkdown from "./editorHelp/sateToMarkdown";
import Header from "./Header";
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
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState([
    { type: "paragraph", children: [{ text: "" }] },
  ]);
  const [coverPreview, setCoverPreview] = useState("");
  const [coverFile, setCoverFile] = useState(null);
  const [coverName, setCoverName] = useState("");
  const [title, setTitle] = useState("");
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
    setCoverName(file.name || "");
    const reader = new FileReader();
    reader.onload = () => {
      setCoverPreview(reader.result);
    };
    reader.readAsDataURL(file);
  }

  // Convert Slate value to a simple HTML string. Covers common node types used in the editor.
  function slateValueToHtml(nodes) {
    if (!nodes) return "";

    const escapeHtml = (str) =>
      String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    function renderLeaf(leaf, text) {
      let t = escapeHtml(text);
      if (leaf.code) t = `<code>${t}</code>`;
      if (leaf.bold) t = `<strong>${t}</strong>`;
      if (leaf.italic) t = `<em>${t}</em>`;
      if (leaf.underline) t = `<u>${t}</u>`;
      if (leaf.fontSize)
        t = `<span style="font-size:${leaf.fontSize}">${t}</span>`;
      return t;
    }

    function nodeToHtml(node) {
      if (node.text !== undefined) {
        // leaf node
        return node.text;
      }
      const children = (node.children || [])
        .map((n) => {
          if (n.text !== undefined) return renderLeaf(n, n.text);
          // for nested leaves
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
    // Basic full HTML wrapper (user-provided example looks like a full document)
    const html = `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n<title>${escapeHtml(
      title || "Post"
    )}</title>\n<style>body{font-family:Arial,Helvetica,sans-serif;margin:20px;line-height:1.6;color:#222}h1,h2{color:#111}p{color:#333}</style>\n</head>\n<body>\n${inner}\n</body>\n</html>`;
    return html;
  }

  return (
    <div className="max-w-full overflow-hidden">
      <Header />
      <section className="w-full max-w-4xl mx-auto p-4">
        <div className="">
          <div className="">
            <label className="block">
              <span className="text-lg font-medium text-gray-700">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear, descriptive title"
                className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </label>

            <div className="mt-10">
              <label className="text-lg font-medium text-gray-700 block">
                Cover photo (upload)
              </label>
              <div className="mt-2 flex items-center gap-3">
                <label
                  htmlFor="coverFile"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition"
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
                <div className="text-sm text-gray-500">
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="cover preview"
                      className="h-20 object-contain border rounded"
                    />
                  ) : (
                    <span>No file selected</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Slate
        editor={editor}
        value={value}
        initialValue={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <Toolbar />
        <Editable
          renderElement={(props) => <Element {...props} />}
          renderLeaf={(props) => <Leaf {...props} />}
          placeholder="Type something..."
          spellCheck
          autoFocus
          style={{
            border: "1px solid #ccc",
            borderRadius: 4,
            padding: 12,
            minHeight: "300px",
          }}
        />
      </Slate>
      <div className="w-full flex items-center justify-center">
        <button
          onClick={async () => {
            // simple validation
            if (!title || !title.trim()) {
              alert("Please enter a title.");
              return;
            }
            const htmlField = slateValueToHtml(value);

            const formData = new FormData();
            formData.append("title", title);
            if (coverFile) formData.append("banner", coverFile);
            formData.append("html_field", htmlField);

            try {
              // try to pick token from localStorage (consistent with Redux slice)
              const token =
                localStorage.getItem("access_token") ||
                localStorage.getItem("accessToken");
              const headers = token ? { Authorization: `Bearer ${token}` } : {};

              const res = await fetch(`${BASE_URL}/admin_dashboard/add_blog/`, {
                method: "POST",
                headers,
                body: formData,
              });
              const data = await res.json();
              if (!res.ok) {
                const msg =
                  data?.message || JSON.stringify(data) || "Failed to add blog";
                alert(`Error: ${msg}`);
                return;
              }
              alert("Blog added successfully.");
              // optional: reset form
              setTitle("");
              setCoverFile(null);
              setCoverName("");
              setCoverPreview("");
              setValue([{ type: "paragraph", children: [{ text: "" }] }]);
              console.log("server response:", data);
            } catch (err) {
              alert(`Network error: ${err.message}`);
            }
          }}
          className="btn mt-4 mb-10 bg-blue-600 text-xl font-bold px-8 py-2 text-white rounded hover:cursor-pointer"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default SlateEditor;
