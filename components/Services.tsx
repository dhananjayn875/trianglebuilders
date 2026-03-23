'use client';

import { motion } from 'motion/react';
import { Building2, Home, Hammer, Briefcase } from 'lucide-react';

const services = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: 'Commercial Construction',
    description: 'Large-scale industrial and commercial spaces engineered for maximum efficiency and modern aesthetics.',
  },
  {
    icon: <Home className="w-8 h-8" />,
    title: 'Residential Architecture',
    description: 'Bespoke, high-end residential builds that blend concrete minimalism with luxurious comfort.',
  },
  {
    icon: <Hammer className="w-8 h-8" />,
    title: 'Renovations',
    description: 'Transforming outdated structures into hyper-modern masterpieces with surgical precision.',
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: 'Project Management',
    description: 'End-to-end oversight ensuring absolute perfection from blueprint to final inspection.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-zinc-50 relative border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 text-zinc-900"
          >
            Our Expertise
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: 80 }}
            viewport={{ once: true }}
            className="h-1 bg-zinc-900 mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative glass-panel p-10 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/50 rounded-2xl flex items-center justify-center text-zinc-900 mb-6 group-hover:scale-110 transition-transform duration-300 border border-white/60 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-display font-bold uppercase mb-4 text-zinc-900">{service.title}</h3>
                <p className="text-zinc-500 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
