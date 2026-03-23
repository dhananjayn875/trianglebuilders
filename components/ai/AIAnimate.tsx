'use client';

import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, Video, Loader2, Download } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export default function AIAnimate() {
  const [image, setImage] = useState<{ data: string; mimeType: string } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string>('');
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
      setVideoUrl(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnimate = async () => {
    if (!image || isLoading) return;
    setIsLoading(true);
    setError(null);
    setStatus('Initializing generation...');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '' });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt || 'A cinematic slow pan of the architecture.',
        image: {
          imageBytes: image.data,
          mimeType: image.mimeType,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: aspectRatio as any,
        }
      });

      setStatus('Generating video (this may take a few minutes)...');

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        setStatus('Downloading video...');
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
          },
        });
        
        if (!response.ok) throw new Error('Failed to fetch video blob.');
        
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
        setStatus('');
      } else {
        throw new Error('No video URI returned.');
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to generate video.');
      setStatus('');
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
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Motion Prompt (Optional)</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Cinematic slow pan..."
                className="w-full glass-input p-3 text-zinc-900"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Aspect Ratio</label>
              <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full glass-input p-3 text-zinc-900"
              >
                <option value="16:9">16:9 (Landscape)</option>
                <option value="9:16">9:16 (Portrait)</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleAnimate}
            disabled={isLoading || !image}
            className="w-full py-4 glass-button-dark font-bold uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Video className="w-5 h-5" />}
            {isLoading ? 'Processing...' : 'Animate Concept'}
          </button>
          
          {status && <div className="text-zinc-900 text-sm font-medium animate-pulse">{status}</div>}
          {error && <div className="text-red-500 text-sm bg-red-50 p-4 rounded-xl border border-red-200">{error}</div>}
        </div>

        <div className="glass-panel flex items-center justify-center overflow-hidden relative min-h-[300px]">
          {videoUrl ? (
            <>
              <video src={videoUrl} controls autoPlay loop className="w-full h-full object-contain" />
              <a
                href={videoUrl}
                download="triangle-animation.mp4"
                className="absolute bottom-4 right-4 p-3 glass-button"
              >
                <Download className="w-5 h-5" />
              </a>
            </>
          ) : (
            <div className="text-zinc-400 flex flex-col items-center gap-2">
              <Video className="w-12 h-12 opacity-50" />
              <span className="text-sm font-medium uppercase tracking-widest">Video Result</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
