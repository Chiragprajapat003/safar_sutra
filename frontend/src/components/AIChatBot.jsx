import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatWithSafarAI, getStoredApiKey, setStoredApiKey } from '../services/aiService';

const STARTER_PROMPTS = [
  'Plan a 3-day Ayodhya & Varanasi spiritual yatra',
  'What are the Aarti timings at Ram Janmabhoomi?',
  'Top forts and royal spots in Jaipur',
  'Estimate budget for a 5-day Andaman trip',
  'Best time for Kaziranga wildlife safari',
  'Recommend 4 days in Kedarnath & Rishikesh',
];

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(getStoredApiKey());

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Namaste! 🙏 I am Safar AI, your intelligent spiritual & global travel guide.\n\nAsk me for custom itineraries, Aarti timings, secret temple viewpoints, or cost estimates for anywhere in India & the world!',
      time: 'Just now',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = async (userText) => {
    const query = (userText || inputVal).trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      // Call real AI service with Gemini / OpenAI
      const aiReply = await chatWithSafarAI(query, messages);

      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiMsg]);
    } catch (e) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: `I experienced a connection issue. Please check your network or API Key settings.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setStoredApiKey(apiKeyInput);
    setShowKeyModal(false);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: apiKeyInput
          ? '✓ AI API Key saved! Live generative models (Gemini / OpenAI) are now actively powering your travel queries.'
          : 'API Key cleared. Switched back to smart AI mode.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <>
      {/* ── Floating Chat Button (Bottom Right) ── */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl shadow-[#4A2E18]/40 border-2 border-[#D4A373] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none"
        aria-label="Open Safar-sutra AI Assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E8C59A] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4A373]" />
        </span>
        <span className="material-symbols-outlined text-2xl text-[#E8C59A]">auto_awesome</span>
        <span className="hidden sm:inline-block font-bold text-xs tracking-wide">Ask Safar AI</span>
      </button>

      {/* ── AI Chat Dialog Drawer ── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#FAF7F2] rounded-3xl border border-[#EADBCE] shadow-2xl flex flex-col overflow-hidden animate-slideUp select-none">
          {/* Header */}
          <div className="bg-[#4A2E18] text-white p-4 px-5 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#5C3B20] flex items-center justify-center text-[#E8C59A] border border-[#D4A373]/40">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
              </div>
              <div>
                <h3 className="text-sm font-extrabold tracking-tight text-[#FFFDF9] flex items-center gap-1.5">
                  <span>Safar-sutra AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </h3>
                <p className="text-[10px] text-[#EADBCE]">Live Generative Travel Intelligence</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowKeyModal(true)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-[#EADBCE] hover:text-white transition-colors cursor-pointer"
                title="Configure Gemini / OpenAI API Key"
              >
                <span className="material-symbols-outlined text-lg">settings</span>
              </button>
              <button
                onClick={() => setMessages([messages[0]])}
                className="p-1.5 rounded-xl hover:bg-white/10 text-[#EADBCE] hover:text-white transition-colors cursor-pointer"
                title="Clear Chat"
              >
                <span className="material-symbols-outlined text-lg">delete_sweep</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-[#EADBCE] hover:text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>
          </div>

          {/* API Key Modal Dialog within Chat */}
          {showKeyModal && (
            <div className="p-4 bg-white border-b border-[#EADBCE] shadow-sm animate-fadeIn">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-[#2A180C] flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-[#C88A4B]">key</span>
                  AI API Key Settings
                </span>
                <button onClick={() => setShowKeyModal(false)} className="text-xs text-[#8A715F] font-bold">✕</button>
              </div>
              <p className="text-[11px] text-[#6B5646] mb-3">
                Paste your Google Gemini API Key or OpenAI Key (<code>sk-...</code>) for real-time live travel reasoning.
              </p>
              <form onSubmit={handleSaveApiKey} className="space-y-2">
                <input
                  type="password"
                  placeholder="AIzaSy... or sk-proj-..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-xl text-xs text-[#2A180C]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setApiKeyInput('');
                      setStoredApiKey('');
                      setShowKeyModal(false);
                    }}
                    className="px-3 py-1 bg-[#FAF7F2] text-[#5A4536] rounded-xl text-[11px] font-bold"
                  >
                    Clear
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 bg-[#4A2E18] text-white rounded-xl text-[11px] font-bold shadow-xs"
                  >
                    Save Key
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isAi = msg.sender === 'ai';
              return (
                <div key={msg.id} className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}>
                  {isAi && (
                    <div className="w-7 h-7 rounded-xl bg-[#4A2E18] text-[#E8C59A] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      <span className="material-symbols-outlined text-sm">temple_hindu</span>
                    </div>
                  )}

                  <div className={`max-w-[85%] space-y-1.5`}>
                    <div
                      className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-xs ${
                        isAi
                          ? 'bg-white text-[#2A180C] border border-[#EADBCE] rounded-tl-sm'
                          : 'bg-[#4A2E18] text-[#FFFDF9] rounded-tr-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className={`text-[10px] text-[#8A715F] block px-1 ${isAi ? 'text-left' : 'text-right'}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-7 h-7 rounded-xl bg-[#4A2E18] text-[#E8C59A] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                </div>
                <div className="bg-white border border-[#EADBCE] p-3 rounded-2xl text-[#8A715F] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A373] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-[#8A715F] ml-1 font-semibold">Generating answer...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Starter Chips */}
          <div className="p-2.5 bg-white border-t border-[#EADBCE] overflow-x-auto no-scrollbar flex gap-2 shrink-0">
            {STARTER_PROMPTS.map((prompt) => (
              <button
                key={prompt}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-[#FAF7F2] hover:bg-[#F5ECE1] text-[#5A4536] hover:text-[#4A2E18] border border-[#D8C6B6] px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#EADBCE] flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. Kedarnath helicopter, Varanasi Aarti...)"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-[#FAF7F2] border border-[#D8C6B6] rounded-2xl text-xs text-[#2A180C] placeholder:text-[#9E8777] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4A2E18]/15"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="w-10 h-10 rounded-2xl bg-[#4A2E18] hover:bg-[#341F0E] text-[#FFFDF9] flex items-center justify-center shadow-md shadow-[#4A2E18]/25 cursor-pointer disabled:opacity-40 transition-all active:scale-95 shrink-0"
            >
              <span className="material-symbols-outlined text-lg text-[#E8C59A]">send</span>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
