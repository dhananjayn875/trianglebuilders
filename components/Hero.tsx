'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Non-linear scroll mapping for a longer, smoother animation
  // 0 to 0.2: Crossfade text inversion
  // 0.2 to 0.7: Scale and move elements
  // 0.7 to 1.0: Fade out

  // House Transform values
  const houseScale = useTransform(scrollYProgress, [0, 0.2, 0.7], [0.5, 0.5, 1.1]);
  const houseOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  // SVG drawing animation (starts after background fades to white at 0.35)
  const strokeOpacity = useTransform(scrollYProgress, [0.3, 0.35], [0, 1]);
  const pathLength = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const fillOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);

  // Text Transform values
  const textScale = useTransform(scrollYProgress, [0, 0.2, 0.7], [1, 1, 0.65]);
  const overallOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  // Movement progress (0 to 1) for responsive positioning
  const moveProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1]);

  // Crossfade for the text inversion effect
  const bgWhiteOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const startStateOpacity = useTransform(scrollYProgress, [0.05, 0.1], [1, 0]);
  const endStateOpacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);

  // Scroll Prompt Color
  const scrollPromptColor = useTransform(scrollYProgress, [0, 0.1], ["#000000", "#27272a"]);

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-zinc-900">
      <motion.div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ opacity: overallOpacity } as any}
      >

        {/* Background Image Grid (z-0) */}
        <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 grid-rows-4 md:grid-rows-2 w-full h-full opacity-60">
          <Image unoptimized src="/trianglebuilders/images/8.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
          <Image unoptimized src="/trianglebuilders/images/7.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
          <Image unoptimized src="/trianglebuilders/images/3.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
          <Image unoptimized src="/trianglebuilders/images/4.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
          <Image unoptimized src="/trianglebuilders/images/5.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
          <Image unoptimized src="/trianglebuilders/images/10.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
          <Image unoptimized src="/trianglebuilders/images/1.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
          <Image unoptimized src="/trianglebuilders/images/2.jpeg" width={800} height={800} className="w-full h-full object-cover" alt="" />
        </div>

        {/* End State: Solid White background (z-10) */}
        <motion.div
          style={{ opacity: bgWhiteOpacity }}
          className="absolute inset-0 z-10 bg-white pointer-events-none"
        />

        {/* 3D House SVG inside Triangle Logo (z-20) */}
        <motion.div
          style={{
            opacity: houseOpacity,
            '--house-scale': houseScale,
            '--move': moveProgress
          } as any}
          className="absolute z-20 w-[70vw] md:w-full max-w-xs md:max-w-md aspect-square flex items-center justify-center pointer-events-none scale-[var(--house-scale)] -translate-y-[calc(var(--move)*15vh)] md:translate-y-0 md:-translate-x-[calc(var(--move)*18vw)] mt-16 md:mt-0 md:mr-20"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
            <defs>
              <clipPath id="triangle-clip">
                <polygon points="200,20 380,360 20,360" />
              </clipPath>
              <linearGradient id="cube-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f4f4f5" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="cube-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e4e4e7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#d4d4d8" stopOpacity="0.3" />
              </linearGradient>
              <linearGradient id="cube-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fafafa" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e4e4e7" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Triangle Logo Border */}
            <motion.polygon
              points="200,20.5 380,360 20,360 200,20 "
              fill="none"
              stroke="#18181b"
              strokeWidth="6"
               strokeLinejoin="round" 
              style={{ pathLength, opacity: strokeOpacity }}
            />

            <g clipPath="url(#triangle-clip)">
              {/* Base Box */}
              <motion.path d="M200 320 L80 260 L80 140 L200 200 Z" fill="url(#cube-grad-1)" stroke="#18181b" strokeWidth="2" style={{ pathLength, fillOpacity, opacity: strokeOpacity }} />
              <motion.path d="M200 320 L320 260 L320 140 L200 200 Z" fill="url(#cube-grad-2)" stroke="#18181b" strokeWidth="2" style={{ pathLength, fillOpacity, opacity: strokeOpacity }} />

              {/* The Triangle Roof / Structure */}
              <motion.path d="M80 140 L200 20 L320 140 L200 200 Z" fill="url(#cube-grad-1)" stroke="#18181b" strokeWidth="2" style={{ pathLength, fillOpacity, opacity: strokeOpacity }} />

              {/* Cantilever Box intersecting */}
              <motion.path d="M140 250 L20 190 L20 110 L140 170 Z" fill="url(#cube-grad-3)" stroke="#18181b" strokeWidth="2" style={{ pathLength, fillOpacity, opacity: strokeOpacity }} />
              <motion.path d="M140 250 L260 190 L260 110 L140 170 Z" fill="url(#cube-grad-1)" stroke="#18181b" strokeWidth="2" style={{ pathLength, fillOpacity, opacity: strokeOpacity }} />
              <motion.path d="M20 110 L140 170 L260 110 L140 50 Z" fill="url(#cube-grad-1)" stroke="#18181b" strokeWidth="2" style={{ pathLength, fillOpacity, opacity: strokeOpacity }} />
            </g>
          </svg>
        </motion.div>

        {/* Text Layer (z-30) */}
        <motion.div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center mt-32 md:mt-0">
          <motion.div
            style={{
              '--text-scale': textScale,
              '--move': moveProgress
            } as any}
            className="relative flex flex-col items-center justify-center w-full scale-[var(--text-scale)] translate-y-[calc(var(--move)*15vh)] md:translate-y-0 md:translate-x-[calc(var(--move)*18vw)]"
          >

            {/* Start State Text */}
            <motion.div style={{ opacity: startStateOpacity }} className="absolute flex flex-col items-center justify-center w-full">
              <h1 className="text-[15vw] md:text-[160px] font-black font-display tracking-tighter text-white leading-[0.85]">TRIANGLE</h1>
              <h1 className="text-[15vw] md:text-[160px] font-black font-display tracking-tighter text-white leading-[0.85]">BUILDERS</h1>
            </motion.div>

            {/* End State Text & Motto */}
            <motion.div style={{ opacity: endStateOpacity }} className="absolute flex flex-col items-center justify-center w-full">
              <h1 className="text-[15vw] md:text-[160px] font-black font-display tracking-tighter text-black leading-[0.85]">TRIANGLE</h1>
              <h1 className="text-[15vw] md:text-[160px] font-black font-display tracking-tighter text-black leading-[0.85]">BUILDERS</h1>
              <p className="text-[4vw] md:text-[24px] font-bold tracking-[0.3em] text-zinc-800 mt-4 md:mt-6 uppercase">Building The Future</p>
                <div className="flex items-center gap-3 mt-3 md:mt-6 md:ml-30">
                <span className="text-[3vw] md:text-[26px] font-semibold text-zinc-700">Building with Confidence:<span className='text-[3vw] md:text-[36px] font-bold text-black' > LENSFED Accredited Firm</span></span>
                <Image unoptimized src="/trianglebuilders/images/lensfed.jpeg" width={144} height={144} alt="LENSFED" className="w-15 h-15 md:w-36 md:h-36" />
                </div>
            </motion.div>

          </motion.div>
        </motion.div>

        {/* Scroll Prompt */}
        <motion.div
          className="absolute bottom-5 flex flex-col items-center gap-4 z-10"
          style={{ color: scrollPromptColor }}
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <span className="text-xs uppercase tracking-widest font-bold bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm">Scroll to Build</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
