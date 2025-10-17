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
    <div className="min-h-screen flex bg-gradient-to-br from-gray-50 via-white to-gray-100">
  {/* Sidebar (desktop) */}
  <aside className="hidden md:flex w-72 sm:w-80 md:w-96 bg-gradient-to-b from-gray-900 via-black to-gray-800 border-r border-gray-700/30 flex-col justify-between shadow-2xl backdrop-blur-lg">
        <div>
             <div className="px-4 sm:px-6 py-6 sm:py-8 mt-8">
            <button 
              onClick={() => navigate('/chats')}
              className="flex items-center gap-3 text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl px-4 py-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600 mb-4"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Chats
            </button>
                      <div className="bg-gradient-to-r from-gray-800 to-black rounded-xl p-4 mb-6 shadow-lg border border-gray-600">
                        <h3 className="text-white font-bold text-lg mb-1">🎓 Taught AI</h3>
                        <p className="text-gray-300 text-sm">Your AI Teaching Assistant</p>
                      </div>
                </div>
          
          <div className="px-4 sm:px-6 py-4 sm:py-6 ">
            <button className="flex items-center gap-3 w-full text-white font-semibold bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 rounded-xl px-4 py-3 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 border border-gray-600">
              <FaEdit className="w-6 h-6" />
              New Chat
            </button>
          </div>

          <div className="px-4 sm:px-6 pb-6">
            <h4 className="text-gray-300 font-semibold mb-4 flex items-center gap-2">
              💬 Other Chats
            </h4>
            <ul className="space-y-3">
              {otherChats.map((c) => (
                <li 
                  key={c.id} 
                  onClick={() => navigate(`/chats/${c.id}`)}
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

        <div className="px-4 sm:px-6 py-4 sm:py-6 border-t border-gray-600/30">
          <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-gray-600/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-black flex items-center justify-center text-white font-semibold">B</div>
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
              <div className="px-4 py-4 mt-6 flex items-center justify-between border-b border-gray-600/30">
                <div className="bg-gradient-to-r from-gray-800 to-black rounded-lg p-3 border border-gray-600">
                  <h3 className="text-white font-bold text-sm">💬 Chat Detail</h3>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-white hover:text-gray-300 p-2 transition-colors">
                  ✕
                </button>
              </div>
              <div className="px-4 pb-6">
                <h4 className="text-gray-300 font-semibold mb-3">Other Chats</h4>
                <ul className="space-y-2">
                  {Object.keys(chatData).map((k) => (
                    <li key={k} onClick={() => { setSidebarOpen(false); navigate(`/chats/${k}`); }} className="bg-white/10 text-white hover:bg-white/20 rounded-lg px-3 py-2 cursor-pointer transition-all text-sm border border-gray-600/30 truncate">{chatData[k].title}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="px-4 py-4 border-t border-gray-600/30">
              <div className="flex items-center gap-3 bg-white/10 rounded-lg p-3 border border-gray-600/30">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-600 to-black flex items-center justify-center text-white font-semibold">B</div>
                <div>
                  <div className="text-white font-semibold text-sm">Ben Duggan</div>
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
        <div className="border-b border-gray-200 p-4 sm:p-6 flex-shrink-0 bg-white/70 backdrop-blur-sm relative z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-gray-200 hover:bg-white/90 transition-all shadow-lg mr-2">
              <svg className="w-5 h-5 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-400 to-black rounded-full blur-sm opacity-30"></div>
              <img src={Owner} alt="AI" className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-xl border-2 border-white/70" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-gray-700 via-black to-gray-600 bg-clip-text text-transparent">{currentChat.title}</h1>
              <div className="text-sm text-gray-600 flex items-center gap-1">
                By Ben Duggan <CgProfile className="inline w-4 h-4 text-gray-600" />
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium border border-gray-200 ml-2">Verified Educator</span>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 relative z-10">
          {currentChat.messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl rounded-2xl p-4 sm:p-5 shadow-lg ${
                msg.type === 'user' 
                  ? 'bg-gradient-to-r from-gray-800 to-black text-white border border-gray-700' 
                  : 'bg-white/80 text-gray-800 border border-gray-200 backdrop-blur-sm'
              }`}>
                <div className="whitespace-pre-wrap text-sm sm:text-base leading-relaxed">{msg.content}</div>
                <div className={`text-xs mt-3 ${msg.type === 'user' ? 'text-gray-300' : 'text-gray-500'} font-medium`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message input (sticky) */}
        <div className="border-t border-gray-200 bg-white/70 backdrop-blur-sm flex-shrink-0 relative z-10">
          <div className="p-4 sm:p-6">
            <form onSubmit={handleSendMessage} className="flex gap-3">
              <div className="flex-1 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-black/20 rounded-full blur-sm"></div>
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="relative w-full h-12 sm:h-14 rounded-full bg-white/90 border border-gray-200 px-6 pr-14 text-gray-700 placeholder-gray-500 shadow-lg outline-none font-medium text-base backdrop-blur-sm"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 flex items-center justify-center text-white shadow-lg transition-all transform hover:scale-105"
                >
                  <FaMicrophoneLines className="w-4 h-4" />
                </button>
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
  )
}

export default ChatDetail