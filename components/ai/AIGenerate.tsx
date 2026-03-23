'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageIcon, Loader2, Download } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIGenerate() {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [imageSize, setImageSize] = useState('1K');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: prompt }]
        },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio as any,
            imageSize: imageSize as any,
          }
        }
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setImageUrl(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }
      if (!foundImage) setError('No image generated.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-col h-full gap-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Concept Description</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A hyper-modern concrete and glass residential building in a dense forest..."
            className="w-full h-24 glass-input p-4 text-zinc-900 resize-none"
          />
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Aspect Ratio</label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value)}
              className="w-full glass-input p-3 text-zinc-900"
            >
              <option value="1:1">1:1 (Square)</option>
              <option value="3:2">3:2</option>
              <option value="4:3">4:3</option>
              <option value="16:9">16:9 (Widescreen)</option>
              <option value="21:9">21:9 (Cinematic)</option>
              <option value="9:16">9:16 (Vertical)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Resolution</label>
            <select
              value={imageSize}
              onChange={(e) => setImageSize(e.target.value)}
              className="w-full glass-input p-3 text-zinc-900"
            >
              <option value="1K">1K (Standard)</option>
              <option value="2K">2K (High)</option>
              <option value="4K">4K (Ultra)</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleGenerate}
        disabled={isLoading || !prompt.trim()}
        className="w-full py-4 glass-button-dark font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ImageIcon className="w-5 h-5" />}
        {isLoading ? 'Rendering Concept...' : 'Generate Concept'}
      </button>

      {error && <div className="text-red-500 text-sm bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>}

      <div className="flex-grow glass-panel flex items-center justify-center overflow-hidden relative min-h-[300px]">
        {imageUrl ? (
          <>
            <img src={imageUrl} alt="Generated Concept" className="w-full h-full object-contain" />
            <a
              href={imageUrl}
              download="triangle-concept.png"
              className="absolute bottom-4 right-4 p-3 glass-button"
            >
              <Download className="w-5 h-5" />
            </a>
          </>
        ) : (
          <div className="text-zinc-400 flex flex-col items-center gap-2">
            <ImageIcon className="w-12 h-12 opacity-50" />
            <span className="text-sm font-medium uppercase tracking-widest">Preview Area</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
