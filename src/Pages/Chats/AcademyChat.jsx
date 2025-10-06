import React from 'react'
import Owner from "../../../public/chatlogo.svg";
import { FaEdit } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaMicrophoneLines } from "react-icons/fa6";

function AcademyChat() {
  const chats = new Array(5).fill(0).map((_, i) => ({
    id: i + 1,
    title: `Lorem ipsum dolor sit amet......`,
  }));

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-96 bg-[#f1f5f9] border-r border-gray-100 flex flex-col justify-between shadow-2xl">
        <div>
          <div className="px-6 py-6 mt-20">
            <button className="flex items-center gap-3 text-sm text-gray-800 font-medium">
              <FaEdit className="w-6 h-6" />
              New Chat
            </button>
          </div>

          <div className="px-6 pb-6">
            <h4 className="text-md text-gray-500 mb-3">Chats</h4>
            <ul className="space-y-3">
              {chats.map((c) => (
                <li key={c.id} className="text-md text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer">{c.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-semibold">B</div>
            <div>
              <div className="text-md font-medium">Ben Duggan</div>
              <div className="text-xs text-gray-500">Free</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-between relative">
        <div className="w-full max-w-7xl mt-8">
          <div className="text-md text-gray-900 text-left -ml-20">Taught AI Academy SOW GPT 5 <span className="text-gray-400">▾</span></div>

          <div className="flex flex-col items-center mt-12 px-6">
            <img src={Owner} alt="badge" className="w-24 h-24 rounded-full shadow-md" />
            <h1 className="mt-6 text-2xl md:text-3xl font-serif font-bold">Taught AI Academy SOW GPT</h1>
            <div className="text-sm text-gray-500 mt-2">By Ben Duggan  <CgProfile className="inline w-4 h-4 text-gray-500" /></div>
            <p className="text-lg text-gray-900 mt-4">Develop Schemes of work for your subject or topic</p>

            <button className="mt-10 px-8 py-3 rounded-full border border-gray-900 text-gray-700">Agree &amp; Continue</button>
          </div>
        </div>

        {/* Bottom input */}
        <div className="w-full flex justify-center py-8">
          <div className="w-full max-w-3xl px-6">
            <div className="relative">
              <input placeholder="Ask anythings" className="w-full h-12 rounded-full bg-[#ebebeb] px-6 pr-14 text-gray-600 shadow-sm outline-none" />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center text-gray-600">
                <FaMicrophoneLines className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default AcademyChat
