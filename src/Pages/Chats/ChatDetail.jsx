import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaEdit, FaArrowLeft } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"
import { FaMicrophoneLines } from "react-icons/fa6"
import Owner from "../../../public/chatlogo.svg"

function ChatDetail() {
  const { chatId } = useParams()
  const navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const chatData = {
    1: {
      title: "Create lesson plan for Year 7 Science",
      messages: [
        {
          id: 1,
          type: 'user',
          content: 'Can you help me create a lesson plan for Year 7 Science on the topic of acids and bases?',
          timestamp: '10:30 AM'
        },
        {
          id: 2,
          type: 'ai',
          content: 'I\'d be happy to help you create a comprehensive lesson plan for Year 7 Science on acids and bases. Here\'s a structured 60-minute lesson plan:\n\n**Learning Objectives:**\n- Students will understand what acids and bases are\n- Students will identify common acids and bases in everyday life\n- Students will learn about the pH scale\n\n**Starter Activity (10 mins):**\nShow students various household items (lemon, soap, baking soda) and ask them to predict which are acids or bases.\n\n**Main Activity (35 mins):**\n1. Introduction to acids and bases (10 mins)\n2. pH scale demonstration (15 mins)\n3. Testing common substances with pH strips (10 mins)\n\n**Plenary (15 mins):**\nStudents present their findings and create a classroom chart of acids vs bases.',
          timestamp: '10:31 AM'
        },
        {
          id: 3,
          type: 'user',
          content: 'This is great! Can you also suggest some safety considerations for this lesson?',
          timestamp: '10:35 AM'
        },
        {
          id: 4,
          type: 'ai',
          content: '**Safety Considerations for Acids and Bases Lesson:**\n\n**Essential Safety Measures:**\n- Safety goggles must be worn at all times\n- Ensure proper ventilation in the laboratory\n- Use only dilute solutions (0.1M or less)\n- Have eye wash station readily available\n\n**Handling Guidelines:**\n- Students should not touch chemicals directly\n- Use plastic pipettes or droppers for transfers\n- Clean up spills immediately with plenty of water\n- Wash hands thoroughly after the practical\n\n**Emergency Procedures:**\n- Know location of first aid kit and emergency shower\n- Have neutralizing agents available (weak base for acid spills)\n- Brief students on what to do if they get chemicals on skin or in eyes\n\n**Recommended Safe Substances for Testing:**\n- Lemon juice, vinegar (acids)\n- Soap solution, baking soda solution (bases)\n- Distilled water (neutral)',
          timestamp: '10:36 AM'
        }
      ]
    },
    2: {
      title: "Help with assessment criteria",
      messages: [
        {
          id: 1,
          type: 'user',
          content: 'I need help creating assessment criteria for a Year 9 English essay on Shakespeare.',
          timestamp: '2:15 PM'
        },
        {
          id: 2,
          type: 'ai',
          content: 'Here\'s a comprehensive assessment criteria for a Year 9 Shakespeare essay:\n\n**Assessment Criteria - Shakespeare Essay (Total: 40 marks)**\n\n**Content & Understanding (15 marks)**\n- Demonstrates clear understanding of the play/character\n- Uses relevant quotations to support points\n- Shows insight into Shakespeare\'s themes and techniques\n\n**Analysis & Interpretation (15 marks)**\n- Analyzes language, structure, and dramatic techniques\n- Explains the effect on audience/reader\n- Makes connections between different parts of the text\n\n**Expression & Structure (10 marks)**\n- Clear, coherent argument throughout\n- Appropriate essay structure (introduction, body, conclusion)\n- Accurate spelling, grammar, and punctuation\n\nWould you like me to break this down into specific grade boundaries?',
          timestamp: '2:16 PM'
        }
      ]
    },
    3: {
      title: "Scheme of work for Mathematics",
      messages: [
        {
          id: 1,
          type: 'user',
          content: 'I need a scheme of work for Year 8 Mathematics focusing on algebra.',
          timestamp: '9:45 AM'
        },
        {
          id: 2,
          type: 'ai',
          content: '**Year 8 Algebra Scheme of Work (6 weeks)**\n\n**Week 1: Introduction to Algebraic Expressions**\n- Understanding variables and constants\n- Writing simple expressions\n- Substituting values into expressions\n\n**Week 2: Simplifying Expressions**\n- Collecting like terms\n- Expanding single brackets\n- Factorizing simple expressions\n\n**Week 3: Linear Equations**\n- Solving one-step equations\n- Solving two-step equations\n- Equations with unknowns on both sides\n\n**Week 4: Inequalities**\n- Understanding inequality symbols\n- Solving simple inequalities\n- Representing solutions on number lines\n\n**Week 5: Sequences**\n- Finding terms in sequences\n- nth term of arithmetic sequences\n- Generating sequences from rules\n\n**Week 6: Assessment & Review**\n- Formal assessment covering all topics\n- Peer review and self-assessment activities\n- Consolidation of key concepts',
          timestamp: '9:46 AM'
        }
      ]
    }
  }

  const chats = [
    { id: 1, title: "Create lesson plan for Year 7 Science" },
    { id: 2, title: "Help with assessment criteria" },
    { id: 3, title: "Scheme of work for Mathematics" },
    { id: 4, title: "Homework ideas for English" },
    { id: 5, title: "Behavior management strategies" }
  ]

  const currentChat = chatData[chatId] || { title: "Chat not found", messages: [] }
  const otherChats = chats.filter(chat => chat.id !== parseInt(chatId))

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (message.trim()) {
      // In a real app, this would send the message to the AI
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen flex bg-white">
  {/* Sidebar (desktop) */}
  <aside className="hidden md:flex w-72 sm:w-80 md:w-96 bg-[#f1f5f9] border-r border-gray-100 flex-col justify-between shadow-2xl">
        <div>
          <div className="px-4 sm:px-6 py-4 sm:py-6 mt-16 sm:mt-20">
            <button 
              onClick={() => navigate('/chats')}
              className="flex items-center gap-3 text-sm text-gray-800 font-medium mb-4 hover:bg-gray-100 rounded-md p-2 -m-2"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Chats
            </button>
            <button className="flex items-center gap-3 text-sm text-gray-800 font-medium">
              <FaEdit className="w-6 h-6" />
              New Chat
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-6">
            <h4 className="text-sm sm:text-md text-gray-500 mb-3">Other Chats</h4>
            <ul className="space-y-2">
              {otherChats.map((c) => (
                <li 
                  key={c.id} 
                  onClick={() => navigate(`/chats/${c.id}`)}
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
                <button onClick={() => setSidebarOpen(false)} className="text-gray-700 px-2">Close</button>
              </div>
              <div className="px-4 pb-6">
                <h4 className="text-sm text-gray-500 mb-3">Other Chats</h4>
                <ul className="space-y-2">
                  {Object.keys(chatData).map((k) => (
                    <li key={k} onClick={() => { setSidebarOpen(false); navigate(`/chats/${k}`); }} className="text-sm text-gray-800 hover:bg-gray-100 rounded-md px-3 py-2 cursor-pointer truncate">{chatData[k].title}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-800 flex items-center justify-center text-white font-semibold">B</div>
                <div>
                  <div className="text-sm sm:text-md font-medium">Ben Duggan</div>
                  <div className="text-xs text-gray-500">Free</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main chat content */}
      <main className="flex-1 flex flex-col h-screen">
        {/* Chat header */}
        <div className="border-b border-gray-100 p-4 sm:p-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-2 rounded-md bg-gray-100 mr-2">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <img src={Owner} alt="AI" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
            <div>
              <h1 className="text-lg sm:text-xl font-serif font-bold">{currentChat.title}</h1>
              <div className="text-sm text-gray-500">By Ben Duggan <CgProfile className="inline w-4 h-4 text-gray-500" /></div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {currentChat.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl rounded-lg p-3 sm:p-4 ${
                msg.type === 'user' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <div className="whitespace-pre-wrap text-sm sm:text-base">{msg.content}</div>
                <div className={`text-xs mt-2 ${msg.type === 'user' ? 'text-gray-300' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message input (sticky) */}
        <div className="border-t border-gray-100 bg-white flex-shrink-0">
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full h-10 sm:h-12 rounded-full bg-[#ebebeb] px-4 sm:px-6 pr-12 sm:pr-14 text-sm sm:text-base text-gray-600 shadow-sm outline-none"
                />
                <button 
                  type="button"
                  className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-gray-600"
                >
                  <FaMicrophoneLines className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-900 text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ChatDetail