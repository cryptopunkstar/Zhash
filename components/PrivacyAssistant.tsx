
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { Bot, Send, Sparkles, Loader2, ShieldQuestion } from 'lucide-react';

const PrivacyAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    
    const advice = await geminiService.getPrivacyAdvice(query);
    setResponse(advice);
    setLoading(false);
  };

  return (
    <div className="glass-card rounded-2xl border border-white/5 flex flex-col h-[400px]">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <Bot size={18} className="text-blue-400" />
          </div>
          <div>
            <h4 className="text-sm font-bold">Privacy Assistant</h4>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] text-gray-500 font-medium">Powered by Gemini</span>
            </div>
          </div>
        </div>
        <Sparkles size={16} className="text-purple-400 animate-pulse" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm scrollbar-thin scrollbar-thumb-gray-800">
        {!response && !loading && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4 space-y-3 opacity-60">
            <ShieldQuestion size={32} className="text-gray-600" />
            <p className="text-xs text-gray-400">Ask me anything about FHE, Zama protocol, or how Zhash keeps your transfers private.</p>
            <div className="flex flex-wrap justify-center gap-2">
              <button 
                onClick={() => setQuery("How does FHE work in Zhash?")}
                className="px-3 py-1 bg-gray-800/50 rounded-full text-[10px] border border-white/5 hover:border-blue-500/30 transition-colors"
              >
                What is FHE?
              </button>
              <button 
                onClick={() => setQuery("Is Zama protocol safe?")}
                className="px-3 py-1 bg-gray-800/50 rounded-full text-[10px] border border-white/5 hover:border-blue-500/30 transition-colors"
              >
                Is it safe?
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-start gap-3 animate-in fade-in duration-300">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-blue-400" />
            </div>
            <div className="bg-gray-800/50 p-3 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
              <Loader2 className="animate-spin text-blue-400" size={14} />
              <span className="text-xs text-gray-400">Zhash AI is thinking...</span>
            </div>
          </div>
        )}

        {response && (
          <div className="flex items-start gap-3 animate-in slide-in-from-left-2 duration-300">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
              <Bot size={16} className="text-blue-400" />
            </div>
            <div className="bg-gray-800/50 p-4 rounded-2xl rounded-tl-none border border-white/5 text-gray-300 leading-relaxed text-xs">
              {response}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-black/20">
        <div className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask Zhash Assistant..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-4 pr-12 text-xs focus:outline-none focus:border-blue-500 transition-all"
          />
          <button 
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-500 hover:text-blue-400 disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrivacyAssistant;
