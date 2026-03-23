'use client';

import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="about" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6 text-zinc-900">
              Structural Integrity.<br />
              <span className="text-zinc-400">Precision Engineering.</span>
            </h2>
            <div className="w-20 h-1 bg-zinc-900 mb-8" />
            <p className="text-zinc-600 text-lg leading-relaxed mb-6">
              At TRIANGLE BUILDERS, we don&apos;t just construct buildings; we engineer landmarks. Our commitment to hyper-modern design and industrial-grade durability ensures that every project we undertake stands as a testament to human ingenuity.
            </p>
            <p className="text-zinc-600 text-lg leading-relaxed">
              From raw concrete to polished steel, we handle every material with absolute precision. We are the architects of tomorrow&apos;s skyline.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.3 }}
            className="relative h-[500px] glass-panel p-4"
          >
            <div className="w-full h-full bg-zinc-200 relative overflow-hidden rounded-2xl">
              <motion.div 
                initial={{ filter: 'grayscale(100%)', opacity: 0.8 }}
                whileInView={{ filter: 'grayscale(0%)', opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="absolute inset-0 bg-[url('/trianglebuilders/images/9.jpeg')] bg-cover bg-center" 
              />
              <motion.div 
                initial={{ borderColor: 'rgba(24, 24, 27, 0)' }}
                whileInView={{ borderColor: 'rgba(24, 24, 27, 0.2)' }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, delay: 0.4 }}
                className="absolute inset-0 border-2 m-4 rounded-xl" 
              />
            </div>
            
            <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-zinc-900 rounded-tr-3xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-zinc-900 rounded-bl-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
