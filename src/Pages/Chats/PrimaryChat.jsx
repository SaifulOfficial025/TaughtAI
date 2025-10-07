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
    <div className="min-h-screen flex bg-white">
  {/* Sidebar (desktop) */}
  <aside className="hidden md:flex w-72 sm:w-80 md:w-96 bg-[#f1f5f9] border-r border-gray-100 flex-col justify-between shadow-2xl">
        <div>
          <div className="px-4 sm:px-6 py-4 sm:py-6 mt-16 sm:mt-20">
            <button className="flex items-center gap-3 text-sm text-gray-800 font-medium">
              <FaEdit className="w-6 h-6" />
              New Chat
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-6">
            <h4 className="text-sm sm:text-md text-gray-500 mb-3">Chats</h4>
            <ul className="space-y-2">
              {chats.map((c) => (
                <li 
                  key={c.id} 
                    onClick={() => handleChatClick(c.id)}
                  className="text-sm sm:text-md text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer truncate"
                >
                  {c.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-semibold">B</div>
            <div>
              <div className="text-sm sm:text-md font-medium">Ben Duggan</div>
              <div className="text-xs text-gray-500">Free</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar (slide-over) */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-[#f1f5f9] border-r border-gray-100 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="px-4 py-4 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-3 text-sm text-gray-800 font-medium">
                  <FaEdit className="w-6 h-6" />
                  New Chat
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-gray-700 px-2">Close</button>
              </div>

              <div className="px-4 pb-6">
                <h4 className="text-sm text-gray-500 mb-3">Chats</h4>
                <ul className="space-y-2">
                  {chats.map((c) => (
                    <li key={c.id} onClick={() => { setSidebarOpen(false); handleChatClick(c.id); }} className="text-sm text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer truncate">{c.title}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-semibold">B</div>
                <div>
                  <div className="text-sm font-medium">Ben Duggan</div>
                  <div className="text-xs text-gray-500">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-between relative">
        <div className="w-full max-w-7xl mt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md bg-gray-100">
                <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/></svg>
              </button>
              <div className="text-md text-gray-900 text-left md:-ml-20 pl-2 md:pl-0">Taught AI Academy SOW GPT 5 <span className="text-gray-400">▾</span></div>
            </div>
          </div>

          <div className="flex flex-col items-center mt-8 sm:mt-12 px-4 sm:px-6">
            <img src={Owner} alt="badge" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full shadow-md" />
            <h1 className="mt-4 sm:mt-6 text-xl sm:text-2xl md:text-3xl font-serif font-bold">Taught AI Academy SOW GPT</h1>
            <div className="text-sm text-gray-500 mt-2">By Ben Duggan  <CgProfile className="inline w-4 h-4 text-gray-500" /></div>
            <p className="text-base sm:text-lg text-gray-900 mt-3 sm:mt-4">Develop Schemes of work for your subject or topic</p>

            <button className="mt-8 sm:mt-10 px-6 sm:px-8 py-2 sm:py-3 rounded-full border border-gray-900 text-gray-700">Agree &amp; Continue</button>
          </div>
        </div>

        {/* Bottom input */}
        <div className="w-full flex justify-center py-6 sm:py-8">
          <div className="w-full max-w-3xl px-4 sm:px-6">
            <div className="relative">
              <input placeholder="Ask anythings" className="w-full h-10 sm:h-12 rounded-full bg-[#ebebeb] px-4 sm:px-6 pr-12 sm:pr-14 text-sm sm:text-base text-gray-600 shadow-sm outline-none" />
              <button className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-gray-600">
                <FaMicrophoneLines className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PrimaryChat
