import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BASE_URL } from "../../Redux/config";
import {
  getChatHistory,
  continueConversation,
  selectChatHistory,
  selectChatHistoryLoading,
  getAllChats,
  selectChatList,
  selectChatListLoading,
  selectChatListError,
} from "../../Redux/Chatbot";
import { FaEdit, FaArrowLeft } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaMicrophoneLines } from "react-icons/fa6";
import { FaPaperclip } from "react-icons/fa";
import Owner from "../../../public/chatlogo.svg";

function ChatDetail() {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const [localMessages, setLocalMessages] = useState([]);
  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Determine model_name from navigation state (fallback)
  const model_name = location.state?.model_name || "Academy_sow";

  // Chat list for sidebar (other chats)
  const chatList = useSelector((state) => selectChatList(state, model_name));
  const chatListLoading = useSelector((state) =>
    selectChatListLoading(state, model_name)
  );

  useEffect(() => {
    if (model_name) dispatch(getAllChats({ model_name }));
  }, [dispatch, model_name]);

  // Show all chats in the sidebar, highlight the current chat
  const displayedChats = chatList || [];
  const chatListError = useSelector((state) =>
    selectChatListError(state, model_name)
  );

  // Redux selectors
  const chatHistory = useSelector((state) => selectChatHistory(state, chatId));
  const historyLoading = useSelector((state) =>
    selectChatHistoryLoading(state, chatId)
  );

  // Fetch chat history when component mounts or chatId changes
  useEffect(() => {
    if (chatId) {
      dispatch(
        getChatHistory({ chat_id: chatId, user_message: "Hi", model_name })
      );
    }
  }, [dispatch, chatId, model_name]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setAttachments((prev) => [...prev, ...files]);
    // reset so the same file can be picked again if needed
    e.target.value = null;
  };

  const handleRemoveAttachment = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  // Transform API data to component format and keep a local message buffer
  const chatTitle =
    chatHistory?.title || (historyLoading ? "Loading..." : "Chat not found");

  // Sync server messages into localMessages whenever chatHistory updates
  useEffect(() => {
    const serverMsgs = chatHistory?.messages || [];
    if (serverMsgs && serverMsgs.length > 0) {
      const mapped = serverMsgs.map((msg) => {
        const role = (msg.role || "").toString().toLowerCase();
        return {
          id: msg.id,
          type: role === "user" ? "user" : "ai",
          content: msg.message,
          files: msg.files || [],
          timestamp: new Date(msg.timestamp_child).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
      });
      setLocalMessages(mapped);
    } else if (!historyLoading) {
      // If there are no server messages and we're not loading, clear local buffer
      setLocalMessages([]);
    }
  }, [chatHistory, historyLoading]);

  // Auto-scroll to bottom whenever localMessages change (new message appended)
  useEffect(() => {
    if (messagesEndRef.current) {
      try {
        messagesEndRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      } catch (e) {
        // fallback: set container scrollTop
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
        }
      }
    }
  }, [localMessages, historyLoading]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const text = (message || "").trim();
    if (!text) return;

    // Optimistically append user's message to local buffer so UI feels immediate
    const tempId = `local-${Date.now()}`;
    const userMsg = {
      id: tempId,
      type: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setLocalMessages((prev) => [...prev, userMsg]);
    setMessage("");

    try {
      const resultAction = await dispatch(
        continueConversation({
          chat_id: chatId,
          user_message: text,
          model_name,
          uploaded_files: attachments,
        })
      );

      if (continueConversation.fulfilled.match(resultAction)) {
        // If the thunk returned updated messages in payload, sync them.
        const payload = resultAction.payload || {};
        const returnedMessages =
          payload.messages || payload.chat?.messages || null;
        if (returnedMessages && Array.isArray(returnedMessages)) {
          const mapped = returnedMessages.map((msg) => {
            const role = (msg.role || "").toString().toLowerCase();
            return {
              id: msg.id,
              type: role === "user" ? "user" : "ai",
              content: msg.message,
              files: msg.files || [],
              timestamp: new Date(msg.timestamp_child).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            };
          });
          setLocalMessages(mapped);
        }
        // Clear attachments after successful send
        setAttachments([]);
      } else {
        console.error(
          "Failed to continue conversation:",
          resultAction.payload || resultAction.error
        );
      }
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-72 sm:w-80 md:w-96 bg-gradient-to-b from-gray-900 via-black to-gray-800 border-r border-gray-700/30 flex-col justify-between shadow-2xl backdrop-blur-lg h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <div className="px-4 sm:px-6 py-6 sm:py-8 mt-8">
            <button
              onClick={() => navigate("/chats", { state: { model_name } })}
              className="flex items-center gap-3 text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl px-4 py-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600 mb-4"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Chats
            </button>
            <div className="bg-gradient-to-r from-gray-800 to-black rounded-xl p-4 mb-6 shadow-lg border border-gray-600">
              <h3 className="text-white font-bold text-lg mb-1">
                🎓 Taught AI
              </h3>
              <p className="text-gray-300 text-sm">
                Your AI Teaching Assistant
              </p>
            </div>
          </div>
          {/* 
          <div className="px-4 sm:px-6 py-4 sm:py-6 ">
            <button className="flex items-center gap-3 w-full text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl px-4 py-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600">
              <FaEdit className="w-6 h-6" />
              New Chat
            </button>
          </div> */}

          <div className="px-4 sm:px-6 pb-6">
            <h4 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
              💬 Other Chats
            </h4>
            <div className="space-y-3">
              {chatListLoading ? (
                <div className="text-gray-300 text-sm">Loading chats...</div>
              ) : chatListError ? (
                <div className="text-red-400 text-sm">
                  Failed to load chats: {chatListError}
                </div>
              ) : displayedChats && displayedChats.length > 0 ? (
                <ul className="space-y-3">
                  {displayedChats.map((c) => {
                    const isActive = String(c.id) === String(chatId);
                    return (
                      <li
                        key={c.id}
                        onClick={() =>
                          navigate(`/chats/${c.id}`, {
                            state: {
                              from: location.pathname + location.search,
                              model_name,
                            },
                          })
                        }
                        className={`group ${
                          isActive
                            ? "ring-2 ring-indigo-500 bg-white/10"
                            : "bg-white/10"
                        } backdrop-blur-sm text-white hover:bg-white/20 rounded-lg px-4 py-3 cursor-pointer transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50 hover:shadow-lg transform hover:scale-102`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-white mt-2 group-hover:bg-gray-300 transition-colors"></div>
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-medium leading-relaxed truncate block">
                              {c.title}
                            </span>
                            {c.timestamp_parent && (
                              <span className="text-xs text-gray-400 mt-1 block">
                                {new Date(
                                  c.timestamp_parent
                                ).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="text-gray-300 text-sm">
                  No conversations yet. Start a new chat from the main page.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-600/30">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-gray-600/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-black flex items-center justify-center text-white font-semibold">
              B
            </div>
            <div>
              <div className="text-white font-semibold">Ben Duggan</div>
              <div className="text-gray-300 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-white rounded-full"></span>
                Educator Pro
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar (slide-over) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative w-72 bg-gradient-to-b from-gray-900 via-black to-gray-800 flex flex-col justify-between shadow-2xl backdrop-blur-lg">
            <div className="flex-1 overflow-y-auto">
              <div className="px-4 py-4 mt-6 flex items-center justify-between border-b border-gray-600/30">
                <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg p-3 border border-gray-600">
                  <h3 className="text-white font-bold text-sm">
                    💬 Chat Detail
                  </h3>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:text-gray-300 p-2 transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="px-4 pb-6">
                <h4 className="text-gray-300 font-semibold mb-3">
                  Other Chats
                </h4>
                <div className="text-gray-300 text-sm">
                  Go back to the chat list to see other conversations.
                </div>
              </div>
            </div>

            <div className="px-4 py-4 border-t border-gray-600/30">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-gray-600/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-black flex items-center justify-center text-white font-semibold">
                  B
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">
                    Ben Duggan
                  </div>
                  <div className="text-gray-300 text-xs">Educator Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main chat content */}
      <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-gray-300/20 to-black/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-white/30 to-gray-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-r from-black/10 to-gray-300/20 rounded-full blur-xl"></div>
        </div>

        {/* Chat header */}
        <div className="border-b border-gray-200 p-4 sm:p-6 flex-shrink-0 bg-gray-50 backdrop-blur-sm relative z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all shadow-lg mr-2"
            >
              <svg
                className="w-5 h-5 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-black rounded-full blur-sm opacity-30"></div>
              {/* <img
                src={Owner}
                alt="AI"
                className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-xl border-2 border-white/70"
              /> */}
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-700 via-black to-gray-600 bg-clip-text text-transparent">
                {chatTitle}
              </h1>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                {/* By Ben Duggan{" "}
                <CgProfile className="inline w-4 h-4 text-gray-600" /> */}
                {/* <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200 ml-2">
                  Verified Educator
                </span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 relative z-10"
        >
          {localMessages.length === 0 && historyLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-500">Loading chat history...</div>
            </div>
          ) : localMessages.length > 0 ? (
            <>
              {localMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3xl rounded-2xl p-4 sm:p-5 shadow-lg ${
                      msg.type === "user"
                        ? "bg-blue-100 text-gray-800 border border-blue-200"
                        : "bg-white/80 text-gray-800 border border-gray-200 backdrop-blur-sm"
                    }`}
                  >
                    <div className="markdown-content text-sm sm:text-base leading-relaxed">
                      {msg.type === "user" ? (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            table: ({ node, ...props }) => (
                              <div className="overflow-x-auto my-4">
                                <table
                                  className="min-w-full border-collapse border border-gray-300"
                                  {...props}
                                />
                              </div>
                            ),
                            thead: ({ node, ...props }) => (
                              <thead className="bg-gray-100" {...props} />
                            ),
                            th: ({ node, ...props }) => (
                              <th
                                className="border border-gray-300 px-4 py-2 text-left font-semibold text-gray-700"
                                {...props}
                              />
                            ),
                            td: ({ node, ...props }) => (
                              <td
                                className="border border-gray-300 px-4 py-2"
                                {...props}
                              />
                            ),
                            tr: ({ node, ...props }) => (
                              <tr className="hover:bg-gray-50" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong
                                className="font-bold text-gray-900"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p className="mb-2" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc list-inside mb-2"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal list-inside mb-2"
                                {...props}
                              />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="mb-1" {...props} />
                            ),
                            code: ({ node, inline, ...props }) =>
                              inline ? (
                                <code
                                  className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono"
                                  {...props}
                                />
                              ) : (
                                <code
                                  className="block bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto my-2"
                                  {...props}
                                />
                              ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                    {/* Display attached files (only for user messages) */}
                    {msg.type === "user" &&
                      msg.files &&
                      msg.files.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {msg.files.map((file, idx) => {
                            const fileName = file.file.split("/").pop();
                            const fileExt = fileName
                              .split(".")
                              .pop()
                              .toLowerCase();
                            const isImage = [
                              "jpg",
                              "jpeg",
                              "png",
                              "gif",
                              "webp",
                            ].includes(fileExt);
                            const isPdf = fileExt === "pdf";
                            const isDoc = ["doc", "docx"].includes(fileExt);

                            return (
                              <div
                                key={`${file.id}-${idx}`}
                                className={`flex items-center gap-3 p-3 rounded-lg border ${
                                  msg.type === "user"
                                    ? "bg-white border-blue-300"
                                    : "bg-gray-50 border-gray-300"
                                }`}
                              >
                                <div className="flex-shrink-0">
                                  {isImage ? (
                                    <svg
                                      className="w-8 h-8 text-blue-500"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : isPdf ? (
                                    <svg
                                      className="w-8 h-8 text-red-500"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : isDoc ? (
                                    <svg
                                      className="w-8 h-8 text-blue-600"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      className="w-8 h-8 text-gray-500"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <a
                                    href={`${BASE_URL}${file.file}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 hover:underline truncate block"
                                  >
                                    {fileName}
                                  </a>
                                  <p className="text-xs text-gray-500">
                                    {new Date(
                                      file.uploaded_at
                                    ).toLocaleString()}
                                  </p>
                                </div>
                                <a
                                  href={`${BASE_URL}${file.file}`}
                                  download
                                  className="flex-shrink-0 p-2 text-gray-500 hover:text-blue-600 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Download"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                    />
                                  </svg>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    <div
                      className={`text-xs mt-3 ${
                        msg.type === "user" ? "text-gray-600" : "text-gray-500"
                      } font-medium`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              ))}
              {/* sentinel element to scroll into view */}
              <div ref={messagesEndRef} />
            </>
          ) : (
            <div className="flex justify-center items-center h-32">
              <div className="text-gray-500">No messages in this chat yet.</div>
            </div>
          )}
        </div>

        {/* Message input (sticky) */}
        <div className="border-t border-gray-200 bg-white/70 backdrop-blur-sm flex-shrink-0 relative z-10">
          <div className="p-4 sm:p-6">
            {/* Attachment preview (if any) */}
            {attachments && attachments.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {attachments.map((f, idx) => (
                  <div
                    key={`${f.name}-${idx}`}
                    className="flex items-center gap-2 bg-white/90 border border-gray-200 rounded-full px-3 py-2 text-sm shadow-sm"
                  >
                    <span className="truncate max-w-xs">{f.name}</span>
                    <button
                      onClick={() => handleRemoveAttachment(idx)}
                      type="button"
                      className="ml-2 w-6 h-6 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-gray-700"
                      aria-label={`Remove ${f.name}`}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <form onSubmit={handleSendMessage} className="flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-black/20 rounded-full blur-sm"></div>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="relative w-full h-12 sm:h-14 rounded-full bg-white/90 border border-gray-200 px-6 pr-32 text-gray-700 placeholder-gray-500 shadow-lg outline-none font-medium text-base backdrop-blur-sm"
                />

                {/* Hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.pptx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current && fileInputRef.current.click()
                    }
                    className="w-9 h-9 rounded-full bg-white/90 border border-gray-200 flex items-center justify-center text-gray-700 shadow-sm hover:shadow-md transition-colors"
                    title="Attach files"
                  >
                    <FaPaperclip className="w-4 h-4" />
                  </button>

                  {/* <button
                    type="button"
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 flex items-center justify-center text-white shadow-lg transition-all transform hover:scale-105"
                  >
                    <FaMicrophoneLines className="w-4 h-4" />
                  </button> */}
                </div>
              </div>
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-6 py-3 sm:py-4 rounded-full bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ChatDetail;
