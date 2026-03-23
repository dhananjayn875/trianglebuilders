'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, Loader2, BrainCircuit } from 'lucide-react';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import ReactMarkdown from 'react-markdown';

export default function AIChat() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string; thinking?: boolean }[]>([
    { role: 'model', text: 'Hello. I am the Triangle Builders AI Architect. How can I assist you with your project planning today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'You are an expert architect and construction consultant for Triangle Builders. Provide highly detailed, professional, and structurally sound advice. Format your response in markdown.',
          thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
          tools: [{ googleSearch: {} }],
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || 'No response.' }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: `Error: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col h-full"
    >
      <div className="flex-grow overflow-y-auto pr-4 space-y-6 mb-4 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-xl ${
              msg.role === 'user' 
                ? 'bg-zinc-900 text-white rounded-tr-none' 
                : 'bg-zinc-50 text-zinc-800 rounded-tl-none border border-zinc-200'
            }`}>
              {msg.role === 'model' && (
                <div className="flex items-center gap-2 mb-2 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  <BrainCircuit className="w-4 h-4" />
                  AI Architect
                </div>
              )}
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-zinc-50 p-4 rounded-xl rounded-tl-none border border-zinc-200 flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-zinc-500 animate-spin" />
              <span className="text-zinc-500 text-sm">Analyzing structural requirements...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative mt-auto">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about materials, zoning, or structural design..."
          className="w-full glass-input py-4 pl-4 pr-14 text-zinc-900"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 glass-button-dark disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}
