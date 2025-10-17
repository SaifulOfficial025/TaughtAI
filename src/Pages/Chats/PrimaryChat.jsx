import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Owner from "../../../public/chatlogo.svg";
import { FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaMicrophoneLines } from "react-icons/fa6";

function PrimaryChat() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const chats = [
    { id: 1, title: "Create lesson plan for Year 7 Science" },
    { id: 2, title: "Help with assessment criteria" },
    { id: 3, title: "Scheme of work for Mathematics" },
    { id: 4, title: "Homework ideas for English" },
    { id: 5, title: "Behavior management strategies" }
  ];

  const handleChatClick = (chatId) => {
    navigate(`/chats/${chatId}`);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
  {/* Sidebar (desktop) */}
  <aside className="hidden md:flex w-72 sm:w-80 md:w-96 bg-gradient-to-b from-gray-900 via-black to-gray-800 border-r border-gray-700/30 flex-col justify-between shadow-2xl backdrop-blur-lg">
        <div>
          <div className="px-4 sm:px-6 py-6 sm:py-8 mt-8">
            <div className="bg-gradient-to-r from-gray-800 to-black rounded-xl p-4 mb-6 shadow-lg border border-gray-600">
              <h3 className="text-white font-bold text-lg mb-1">🎓 Primary Chat</h3>
              <p className="text-gray-300 text-sm">Your AI Teaching Assistant</p>
            </div>
            <button className="flex items-center gap-3 w-full text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl px-4 py-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600">
              <FaEdit className="w-6 h-6" />
              New Chat
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-6">
            <h4 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
              📚 Recent Conversations
            </h4>
            <ul className="space-y-3">
              {chats.map((c) => (
                <li 
                  key={c.id} 
                    onClick={() => handleChatClick(c.id)}
                  className="group bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 rounded-lg px-4 py-3 cursor-pointer transition-all duration-200 border border-gray-600/30 hover:border-gray-500/50 hover:shadow-lg transform hover:scale-102"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-white mt-2 group-hover:bg-gray-300 transition-colors"></div>
                    <span className="text-sm font-medium leading-relaxed truncate">{c.title}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-6 border-t border-gray-600/30">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-gray-600/30">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-600 to-black flex items-center justify-center text-white font-bold text-lg shadow-lg">B</div>
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
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-gradient-to-b from-gray-900 via-black to-gray-800 flex flex-col justify-between shadow-2xl backdrop-blur-lg">
            <div>
              <div className="px-4 py-6 flex items-center justify-between border-b border-gray-600/30">
                <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg p-3 border border-gray-600">
                  <h3 className="text-white font-bold text-sm">🎓 Primary Chat</h3>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300 p-2 transition-colors">
                  ✕
                </button>
              </div>

              <div className="px-4 py-4">
                <button className="flex items-center gap-3 w-full text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg px-3 py-2 mb-4 border border-gray-600">
                  <FaEdit className="w-6 h-6" />
                  New Chat
                </button>
                <h4 className="text-gray-300 font-semibold mb-3">📚 Conversations</h4>
                <ul className="space-y-2">
                  {chats.map((c) => (
                    <li key={c.id} onClick={() => { setSidebarOpen(false); handleChatClick(c.id); }} className="bg-white/10 text-white hover:bg-white/20 rounded-lg px-3 py-2 cursor-pointer transition-all text-sm border border-gray-600/30 truncate">{c.title}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-4 py-4 border-t border-gray-600/30">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-gray-600/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-black flex items-center justify-center text-white font-bold">B</div>
                <div>
                  <div className="text-white font-semibold text-sm">Ben Duggan</div>
                  <div className="text-gray-300 text-xs">Educator Pro</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-between relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-gray-300/20 to-black/10 rounded-full blur-xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-white/30 to-gray-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-r from-black/10 to-gray-300/20 rounded-full blur-xl"></div>
        </div>

        <div className="w-full max-w-6xl mt-6 relative z-10">
          <div className="flex items-center justify-between px-4 sm:px-6">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all shadow-lg">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              <div className="bg-white/70 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200 shadow-lg">
                <span className="text-gray-800 font-semibold">📖 Taught AI Academy SOW GPT 5</span>
                <span className="text-gray-600 ml-2">▾</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-12 sm:mt-16 px-4 sm:px-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-black rounded-full blur-lg opacity-30"></div>
              <img src={Owner} alt="badge" className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-2xl border-4 border-white/70" />
            </div>
            
            <div className="text-center mt-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-700 via-black to-gray-600 bg-clip-text text-transparent mb-4 leading-tight">
                🎓 Taught AI Academy SOW GPT
              </h1>
              <div className="flex items-center justify-center gap-2 text-gray-700 mb-3">
                <span className="font-semibold">By Ben Duggan</span>
                <CgProfile className="w-5 h-5" />
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200">Verified Educator</span>
              </div>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Develop comprehensive schemes of work for your subject or topic
              </p>

              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200 shadow-lg">
                  <span className="text-sm font-semibold text-gray-700">📚 Curriculum Planning</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200 shadow-lg">
                  <span className="text-sm font-semibold text-gray-800">🎯 Assessment Design</span>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-200 shadow-lg">
                  <span className="text-sm font-semibold text-gray-700">♿ SEND Support</span>
                </div>
              </div>

              <button className="mt-8 px-8 py-4 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                Agree & Continue
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced bottom input */}
        <div className="w-full py-8 relative z-10">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-black/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-2 shadow-2xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <input 
                    placeholder="Ask me about lesson planning, curriculum design, or educational strategies..." 
                    className="flex-1 h-12 sm:h-14 bg-transparent px-6 text-gray-700 placeholder-gray-500 outline-none font-medium text-base"
                  />
                  <button className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    <FaMicrophoneLines className="w-5 h-5" />
                  </button>
                  <button className="px-6 py-3 sm:py-4 bg-gradient-to-r from-gray-800 to-black hover:from-gray-700 hover:to-gray-800 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    Send
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick action buttons */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              <button className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 hover:bg-white/90 transition-all border border-gray-200 shadow-lg">
                📝 Create Lesson Plan
              </button>
              <button className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800 hover:bg-white/90 transition-all border border-gray-200 shadow-lg">
                📊 Design Assessment
              </button>
              <button className="px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full text-sm font-medium text-gray-700 hover:bg-white/90 transition-all border border-gray-200 shadow-lg">
                🎯 Differentiation Help
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PrimaryChat
