'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, Maximize2, MapPin, Calendar, Ruler, Layers } from 'lucide-react';

const projects = [
  { 
    id: 1,
    name: 'The Glass Pavilion', 
    location: 'Malibu, CA', 
    image: '/images/8.jpeg',
    description: 'A stunning cantilevered structure that seemingly floats above the Pacific coastline. The Glass Pavilion redefines indoor-outdoor living with its floor-to-ceiling structural glass and minimalist steel framework.',
    year: '2024',
    area: '4,500 sq ft',
    materials: 'Structural Glass, Steel, Polished Concrete',
    gallery: [
      '/images/6.jpeg',
      '/images/8.jpeg',
      '/images/7.jpeg',
      '/images/1.jpeg',
    ],
    blueprint: '/images/2.jpg'
  },
  { 
    id: 2,
    name: 'Concrete Oasis', 
    location: 'Austin, TX', 
    image: '/images/9.jpeg',
    description: 'A brutalist masterpiece softened by lush internal courtyards. Concrete Oasis uses board-formed concrete to create a thermal mass that keeps the interior cool during harsh Texas summers.',
    year: '2023',
    area: '6,200 sq ft',
    materials: 'Board-formed Concrete, Teak Wood, Glass',
    gallery: [
      '/images/7.jpeg',
      '/images/8.jpeg',
      '/images/9.jpeg',
      '/images/10.jpeg',
    ],
    blueprint: '/images/2.jpg'
  },
  { 
    id: 3,
    name: 'Minimalist Haven', 
    location: 'Portland, OR', 
    image: '/images/3.jpeg',
    description: 'Nestled in a dense forest, this home uses blackened timber to blend into its surroundings. The interior is a stark contrast, featuring bright, gallery-like spaces for the owner\'s art collection.',
    year: '2025',
    area: '3,800 sq ft',
    materials: 'Shou Sugi Ban Timber, White Oak, Steel',
    gallery: [
      '/images/3.jpeg',
      '/images/4.jpeg',
      '/images/5.jpeg',
      '/images/6.jpeg',
    ],
    blueprint: '/images/5.jpg'
  },
  { 
    id: 4,
    name: 'Luminous Box', 
    location: 'Denver, CO', 
    image: '/images/1.jpeg',
    description: 'An urban infill project that maximizes natural light while maintaining privacy. The Luminous Box features a translucent polycarbonate facade that glows like a lantern at night.',
    year: '2022',
    area: '2,900 sq ft',
    materials: 'Polycarbonate, Aluminum, Concrete',
    gallery: [
      '/images/9.jpeg',
      '/images/10.jpeg',
      '/images/1.jpeg',
      '/images/2.jpeg',
    ],
    blueprint: '/images/5.jpg'
  },
];

export default function Portfolio() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  return (
    <>
      <section ref={targetRef} id="portfolio" className="relative h-[800vh] bg-zinc-50">
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          
          <div className="absolute top-24 left-12 md:left-24 z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight text-zinc-900">
              Selected Works
            </h2>
            <div className="w-12 h-1 bg-zinc-900 mt-4" />
          </div>

          <motion.div style={{ x }} className="flex gap-16 px-6 md:px-24 pt-32 h-[80vh] md:h-[85vh]">
            {projects.map((project) => (
              <motion.div 
                key={project.id} 
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.4 }}
                className="relative w-[92vw] md:w-[65vw] h-full shrink-0 group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="w-full h-full relative overflow-hidden bg-zinc-200 rounded-3xl shadow-xl">
                  <motion.div
                    variants={{
                      hidden: { filter: 'grayscale(100%)', scale: 1 },
                      visible: { filter: 'grayscale(0%)', scale: 1.05 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="w-full h-full"
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                      <Maximize2 className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <motion.div 
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: .8, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute bottom-8 left-1/2 -translate-x-1/2 p-6 w-[90%] flex flex-col items-center text-center z-20 rounded-2xl overflow-hidden border border-white/25 shadow-lg"
                >
                  <div className="absolute inset-0">
                    <Image
                      src={project.image}
                      alt={`${project.name} card background`}
                      fill
                      className="object-cover scale-110 opacity-70"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-black/20" />
                  <div className="absolute inset-0 backdrop-blur-[1px]" />
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-display font-bold uppercase text-white drop-shadow-md">{project.name}</h3>
                    <p className="text-zinc-100 font-semibold tracking-wider uppercase text-sm mt-2 drop-shadow-sm">{project.location}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Project Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-50 overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedProject(null)}
              className="fixed top-8 right-8 z-[110] p-4 bg-white/80 hover:bg-zinc-900 hover:text-white text-zinc-900 rounded-full backdrop-blur-md transition-colors border border-zinc-200 shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Content */}
            <div className="min-h-screen pb-32">
              {/* Hero Image */}
              <div className="relative w-full h-[60vh] md:h-[80vh]">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter"
                  >
                    {selectedProject.name}
                  </motion.h2>
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-2 mt-4 text-zinc-300 text-lg md:text-xl uppercase tracking-widest"
                  >
                    <MapPin className="w-5 h-5" />
                    {selectedProject.location}
                  </motion.div>
                </div>
              </div>

              <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 md:mt-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {/* Left Column: Description & Specs */}
                  <div className="md:col-span-1 space-y-12">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">About the Project</h3>
                      <p className="text-zinc-800 text-lg leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-4">Specifications</h3>
                      <div className="flex items-center gap-4 text-zinc-800 border-b border-zinc-200 pb-4">
                        <Calendar className="w-5 h-5 text-zinc-400" />
                        <span className="font-medium">Completed:</span>
                        <span className="ml-auto">{selectedProject.year}</span>
                      </div>
                      <div className="flex items-center gap-4 text-zinc-800 border-b border-zinc-200 pb-4">
                        <Ruler className="w-5 h-5 text-zinc-400" />
                        <span className="font-medium">Area:</span>
                        <span className="ml-auto">{selectedProject.area}</span>
                      </div>
                      <div className="flex items-center gap-4 text-zinc-800 border-b border-zinc-200 pb-4">
                        <Layers className="w-5 h-5 text-zinc-400" />
                        <span className="font-medium">Materials:</span>
                        <span className="ml-auto text-right max-w-[60%]">{selectedProject.materials}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Gallery & Blueprint */}
                  <div className="md:col-span-2 space-y-16">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-8">Gallery</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {selectedProject.gallery.map((img, idx) => (
                          <div key={idx} className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-200 shadow-md">
                            <Image
                              src={img}
                              alt={`${selectedProject.name} Gallery ${idx + 1}`}
                              fill
                              className="object-cover hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-8">Building Plan / Blueprint</h3>
                      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-zinc-900 shadow-xl border border-zinc-800">
                        <Image
                          src={selectedProject.blueprint}
                          alt={`${selectedProject.name} Blueprint`}
                          fill
                          className="object-cover opacity-80 mix-blend-screen"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="glass-panel px-6 py-3 text-white font-mono text-sm tracking-widest uppercase">
                            Confidential Plan
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
