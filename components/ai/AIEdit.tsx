'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Edit3, Loader2, Download } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIEdit() {
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      const data = base64.split(',')[1];
      setImage({ data, mimeType: file.type });
      setResultUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = async () => {
    if (!image || !prompt.trim() || isLoading) return;
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-flash-image-preview',
        contents: {
          parts: [
            {
              inlineData: {
                data: image.data,
                mimeType: image.mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      let foundImage = false;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setResultUrl(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
          foundImage = true;
          break;
        }
      }
      if (!foundImage) setError('No image returned.');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to edit image.');
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Source Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-48 glass-panel border-2 border-dashed border-zinc-300 hover:border-zinc-900 flex flex-col items-center justify-center cursor-pointer transition-colors relative overflow-hidden"
            >
              {image ? (
                <img src={`data:${image.mimeType};base64,${image.data}`} alt="Source" className="w-full h-full object-cover opacity-50" />
              ) : (
                <>
                  <Upload className="w-8 h-8 text-zinc-400 mb-2" />
                  <span className="text-sm text-zinc-500">Click to upload image</span>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Edit Instructions</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Change the building material to exposed concrete..."
              className="w-full h-24 glass-input p-4 text-zinc-900 resize-none"
            />
          </div>
          <button
            onClick={handleEdit}
            disabled={isLoading || !image || !prompt.trim()}
            className="w-full py-4 glass-button-dark font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Edit3 className="w-5 h-5" />}
            {isLoading ? 'Processing...' : 'Apply Edits'}
          </button>
          {error && <div className="text-red-500 text-sm bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>}
        </div>

        <div className="glass-panel flex items-center justify-center overflow-hidden relative min-h-[300px]">
          {resultUrl ? (
            <>
              <img src={resultUrl} alt="Edited Concept" className="w-full h-full object-contain" />
              <a
                href={resultUrl}
                download="triangle-edit.png"
                className="absolute bottom-4 right-4 p-3 glass-button"
              >
                <Download className="w-5 h-5" />
              </a>
            </>
          ) : (
            <div className="text-zinc-400 flex flex-col items-center gap-2">
              <Edit3 className="w-12 h-12 opacity-50" />
              <span className="text-sm font-medium uppercase tracking-widest">Result Area</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
