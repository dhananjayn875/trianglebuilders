'use client';

import { motion } from 'motion/react';

export default function Marquee() {
  return (
    <div className="w-full bg-slate-800 text-white py-4 overflow-hidden flex whitespace-nowrap border-y border-zinc-800 relative z-20">
      <motion.div 
        className="flex gap-10 items-center font-mono text-sm uppercase tracking-widest"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex gap-10 items-center">
            <span>PH NO: 9388426494</span>
            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
            <span>EMAIL ID: suresh3nvr@gmail.com</span>
            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
            <span>ADDRESS: Njarrekattuvallapil House, Peringandoor PO, Thrissur, 680581</span>
            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
