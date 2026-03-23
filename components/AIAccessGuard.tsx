'use client';

import { useState, useEffect } from 'react';
import { Key } from 'lucide-react';

export default function AIAccessGuard({ children }: { children: React.ReactNode }) {
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  useEffect(() => {
    const checkKey = async () => {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        const keySelected = await (window as any).aistudio.hasSelectedApiKey();
        setHasKey(keySelected);
      } else {
        // Fallback if not in AI Studio environment
        setHasKey(true);
      }
    };
    checkKey();
  }, []);

  const handleSelectKey = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      setHasKey(true); // Assume success per instructions
    }
  };

  if (hasKey === null) return null;

  if (!hasKey) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center glass-panel">
        <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-900 mb-6">
          <Key className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-display font-bold uppercase mb-4 text-zinc-900">API Key Required</h2>
        <p className="text-zinc-500 max-w-md mb-8">
          To use the advanced AI Vision Studio features (High-res Image Generation and Video Animation), you must select your Google Cloud API key.
        </p>
        <button
          onClick={handleSelectKey}
          className="px-8 py-4 glass-button-dark uppercase tracking-wider font-bold"
        >
          Select API Key
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
