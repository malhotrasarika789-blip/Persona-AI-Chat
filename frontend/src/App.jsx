import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, RefreshCw, Send, Code, Sparkles, User, Terminal, HelpCircle } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/chat';

function App() {
  const [persona, setPersona] = useState('hitesh');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to the latest chat response safely
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle switching personas smoothly with cache flushes
  const handlePersonaChange = (selectedPersona) => {
    setPersona(selectedPersona);
    setMessages([]);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: input,
          history: messages,
          persona: persona,
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'persona', text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev, 
          { sender: 'persona', text: "Hey, internal server validation issue over the network logs. Let's trace it again!" }
        ]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev, 
        { sender: 'persona', text: "Network connection refused! Double check if your backend port 5000 server script is running." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0e12] text-gray-100 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white relative overflow-x-hidden">
      
      {/* Background Radial Ambient Glow Systems */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className={`absolute bottom-0 right-1/4 w-[600px] h-[600px] ${persona === 'hitesh' ? 'bg-teal-500/5' : 'bg-indigo-500/5'} rounded-full blur-[160px] pointer-events-none transition-colors duration-700`} />

      {/* Glassmorphic Top Bar Navigation Layout */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#13151a]/80 border-b border-gray-800/60 px-4 md:px-8 py-4 flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-start">
          <div className={`p-2.5 rounded-xl bg-gradient-to-tr ${persona === 'hitesh' ? 'from-teal-500 to-emerald-400' : 'from-indigo-500 to-purple-400'} text-black font-bold shadow-lg shadow-black/20 transition-all duration-500`}>
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">Persona AI</h1>
            <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">GenAI Simulator Workbench</p>
          </div>
        </div>

        {/* Dynamic Interactive Tab Switcher Switches */}
        <div className="flex bg-[#181a20] p-1.5 rounded-xl border border-gray-800/80 shadow-inner w-full sm:w-auto justify-center">
          <button
            onClick={() => handlePersonaChange('hitesh')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 flex-1 sm:flex-initial ${
              persona === 'hitesh' 
                ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-black shadow-md shadow-teal-500/10' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            }`}
          >
            <User size={16} /> Hitesh Choudhary
          </button>
          <button
            onClick={() => handlePersonaChange('piyush')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 flex-1 sm:flex-initial ${
              persona === 'piyush' 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/10' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800/30'
            }`}
          >
            <Code size={16} /> Piyush Garg
          </button>
        </div>
      </header>

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-3 md:p-6 flex flex-col min-h-0 z-10">
        <div className="flex-1 bg-[#13151a]/70 backdrop-blur-2xl border border-gray-800/80 rounded-2xl flex flex-col overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]">
          
          {/* Header Action Indicator Dashboard */}
          <div className="px-6 py-4 bg-[#181a20]/60 border-b border-gray-800/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${persona === 'hitesh' ? 'bg-teal-400' : 'bg-indigo-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-3 w-3 ${persona === 'hitesh' ? 'bg-teal-400' : 'bg-indigo-400'}`}></span>
              </span>
              <span className="text-sm text-gray-400">
                Active Streaming Model: <strong className={`font-semibold ${persona === 'hitesh' ? 'text-teal-400' : 'text-indigo-400'}`}>{persona === 'hitesh' ? 'Hitesh Choudhary' : 'Piyush Garg'} Mode</strong>
              </span>
            </div>
            <button 
              onClick={() => setMessages([])} 
              className="text-xs text-gray-400 hover:text-gray-200 hover:border-gray-700 transition-all flex items-center gap-1.5 bg-[#181a20] px-3 py-2 rounded-lg border border-gray-800 shadow-sm"
              title="Flush Context Buffers"
            >
              <RefreshCw size={12} /> Clear Session
            </button>
          </div>

          {/* Core Dialogue Stream Feed */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 scrollbar-thin scrollbar-thumb-gray-800">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 max-w-md mx-auto">
                <div className={`w-16 h-16 bg-[#181a20] border rounded-2xl flex items-center justify-center mb-5 text-gray-400 shadow-inner ${persona === 'hitesh' ? 'border-teal-500/20 text-teal-400/80' : 'border-indigo-500/20 text-indigo-400/80'}`}>
                  {persona === 'hitesh' ? <Terminal size={28} /> : <HelpCircle size={28} />}
                </div>
                <h3 className="text-xl font-bold text-gray-100 tracking-tight">
                  Interact with {persona === 'hitesh' ? 'Hitesh Sir' : 'Piyush Sir'}
                </h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                  {persona === 'hitesh' 
                    ? 'Ask about standard web development ecosystems, community growth channels, open-source architectures, or dynamic JavaScript modules!' 
                    : 'Deep dive into complex backend system designs, custom framework setups, high-performance Docker microservices, or optimization algorithms!'}
                </p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                  <div className={`max-w-[85%] rounded-2xl px-5 py-4 leading-relaxed text-[15px] shadow-md transition-all ${
                    msg.sender === 'user' 
                      ? 'bg-[#181a20] border border-gray-700/60 text-gray-100 rounded-tr-none' 
                      : persona === 'hitesh'
                        ? 'bg-gradient-to-br from-teal-950/30 to-emerald-950/10 border border-teal-500/20 text-teal-100 rounded-tl-none font-medium'
                        : 'bg-gradient-to-br from-indigo-950/30 to-purple-950/10 border border-indigo-500/20 text-indigo-100 rounded-tl-none font-medium'
                  }`}>
                    {/* Preserves technical indentation strings nicely */}
                    <p className="whitespace-pre-wrap selection:bg-purple-500 selection:text-white">{msg.text}</p> 
                  </div>
                </div>
              ))
            )}
            
            {/* Typing Loader Stream Interface */}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-[#181a20]/60 border border-gray-800/80 rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:-0.3s] ${persona === 'hitesh' ? 'bg-teal-400' : 'bg-indigo-400'}`} />
                  <span className={`w-2 h-2 rounded-full animate-bounce [animation-delay:-0.15s] ${persona === 'hitesh' ? 'bg-teal-400' : 'bg-indigo-400'}`} />
                  <span className={`w-2 h-2 rounded-full animate-bounce ${persona === 'hitesh' ? 'bg-teal-400' : 'bg-indigo-400'}`} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Dialogue Form Submission Input Field Processing Engine */}
          <form onSubmit={sendMessage} className="p-4 bg-[#14161d] border-t border-gray-800/70 flex gap-3 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Ask ${persona === 'hitesh' ? 'Hitesh Choudhary about production code...' : 'Piyush Garg about internal architecture...'}`}
              className="flex-1 bg-[#0d0e12] border border-gray-800 text-gray-100 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gray-600 placeholder-gray-600 transition-colors shadow-inner"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`p-3.5 rounded-xl flex items-center justify-center transition-all ${
                input.trim() && !loading
                  ? persona === 'hitesh'
                    ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-black shadow-md shadow-teal-500/20 hover:scale-[1.02] active:scale-[0.98]'
                    : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98]'
                  : 'bg-gray-800/40 text-gray-600 cursor-not-allowed'
              }`}
            >
              <Send size={16} />
            </button>
          </form>

        </div>
      </main>
    </div>
  );
}

export default App;