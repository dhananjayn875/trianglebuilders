'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Image as ImageIcon, Edit3, Video } from 'lucide-react';
import AIChat from './ai/AIChat';
import AIGenerate from './ai/AIGenerate';
import AIEdit from './ai/AIEdit';
import AIAnimate from './ai/AIAnimate';

const tabs = [
  { id: 'chat', label: 'Architect Chat', icon: <MessageSquare className="w-4 h-4" /> },
  { id: 'generate', label: 'Generate Concept', icon: <ImageIcon className="w-4 h-4" /> },
  { id: 'edit', label: 'Edit Concept', icon: <Edit3 className="w-4 h-4" /> },
  { id: 'animate', label: 'Animate Concept', icon: <Video className="w-4 h-4" /> },
];

export default function AIVisionStudio() {
  const [activeTab, setActiveTab] = useState('chat');

  return (
    <div className="glass-panel overflow-hidden flex flex-col min-h-[700px]">
      {/* Tabs Header */}
      <div className="flex flex-wrap border-b border-white/60 bg-white/50 rounded-t-3xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === tab.id ? 'text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-grow p-6 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && <AIChat key="chat" />}
          {activeTab === 'generate' && <AIGenerate key="generate" />}
          {activeTab === 'edit' && <AIEdit key="edit" />}
          {activeTab === 'animate' && <AIAnimate key="animate" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
