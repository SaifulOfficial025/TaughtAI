// ToolBar.jsx
import React from "react";
import { useSlate } from "slate-react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaCode,
  FaFont,
  FaHeading,
  FaTable,
} from "react-icons/fa";
import {
  isMarkActive,
  toggleMark,
  getActiveFontSize,
  toggleFontSize,
  isBlockActive,
  toggleBlock,
  insertTable,
} from "./ToolBarUtils";

const FONT_SIZES = ["12px", "16px", "20px", "24px", "30px"];

const Toolbar = () => {
  const editor = useSlate();

  const activeFontSize = getActiveFontSize(editor);

  // image/video handlers removed — those node types are not supported anymore

  return (
    <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border border-gray-200 rounded-md mb-3">
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "bold");
        }}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400 ${
          isMarkActive(editor, "bold")
            ? "bg-blue-100 text-blue-700 font-semibold border-blue-200 hover:bg-blue-50"
            : ""
        }`}
        title="Bold"
      >
        <FaBold className="text-base" />
      </button>

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "italic");
        }}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400 ${
          isMarkActive(editor, "italic")
            ? "bg-blue-100 text-blue-700 font-semibold border-blue-200 hover:bg-blue-50"
            : ""
        }`}
        title="Italic"
      >
        <FaItalic className="text-base" />
      </button>

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "underline");
        }}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400 ${
          isMarkActive(editor, "underline")
            ? "bg-blue-100 text-blue-700 font-semibold border-blue-200 hover:bg-blue-50"
            : ""
        }`}
        title="Underline"
      >
        <FaUnderline className="text-base" />
      </button>

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, "code");
        }}
        className={`flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400 ${
          isMarkActive(editor, "code")
            ? "bg-blue-100 text-blue-700 font-semibold border-blue-200 hover:bg-blue-50"
            : ""
        }`}
        title="Code"
      >
        <FaCode className="text-base" />
      </button>

      <div className="flex gap-1 p-1 bg-white border border-gray-200 rounded-md">
        {FONT_SIZES.map((size) => (
          <button
            type="button"
            key={size}
            onMouseDown={(e) => {
              e.preventDefault();
              toggleFontSize(editor, size);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400 ${
              activeFontSize === size
                ? "bg-blue-100 text-blue-700 font-semibold border-blue-200 hover:bg-blue-50"
                : ""
            }`}
            title={`Font Size ${size}`}
          >
            <FaFont className="text-base" />
            <span>{size}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-1 p-1 bg-white border border-gray-200 rounded-md">
        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-one");
          }}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400 ${
            isBlockActive(editor, "heading-one")
              ? "bg-blue-100 text-blue-700 font-semibold border-blue-200 hover:bg-blue-50"
              : ""
          }`}
          title="Heading 1"
        >
          <FaHeading className="text-base" />
          <span>H1</span>
        </button>

        <button
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            toggleBlock(editor, "heading-two");
          }}
          className={`flex items-center gap-1 px-3 py-1.5 text-xs text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400 ${
            isBlockActive(editor, "heading-two")
              ? "bg-blue-100 text-blue-700 font-semibold border-blue-200 hover:bg-blue-50"
              : ""
          }`}
          title="Heading 2"
        >
          <FaHeading className="text-base" />
          <span>H2</span>
        </button>
      </div>

      {/* Bulleted/Numbered list buttons removed */}

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          insertTable(editor);
        }}
        className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-300 rounded-md transition-all hover:bg-gray-100 hover:border-gray-400"
        title="Insert Table"
      >
        <FaTable className="text-base" />
      </button>
    </div>
  );
};

export default Toolbar;
