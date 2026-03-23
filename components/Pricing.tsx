'use client';

import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Consultation',
    price: 'Starting at $5k',
    description: 'Initial architectural planning, feasibility studies, and blueprint drafting.',
    features: ['Site Analysis', 'Conceptual Design', 'Budget Estimation', 'Permit Consulting'],
  },
  {
    name: 'Remodel',
    price: 'Starting at $50k',
    description: 'High-end interior and exterior renovations for existing structures.',
    features: ['Structural Updates', 'Modern Material Sourcing', 'Dedicated Project Manager', '6-Month Warranty'],
    highlight: true,
  },
  {
    name: 'Ground-Up Build',
    price: 'Custom Quote',
    description: 'Complete construction from foundation to final finishing touches.',
    features: ['Full Architectural Engineering', 'Industrial-Grade Construction', 'Turnkey Delivery', 'Lifetime Structural Guarantee'],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-white border-y border-zinc-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 text-zinc-900">
            Project Scope
          </h2>
          <div className="w-20 h-1 bg-zinc-900 mx-auto mb-6" />
          <p className="text-zinc-500 max-w-2xl mx-auto">
            Transparent estimation frameworks. We build with precision, and we price with clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative p-8 flex flex-col ${
                tier.highlight 
                  ? 'glass-panel border-2 border-zinc-900 shadow-2xl md:scale-105 z-10' 
                  : 'glass-panel'
              }`}
            >
              {tier.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full shadow-lg">
                  Most Common
                </div>
              )}
              
              <h3 className="text-xl font-display font-bold uppercase mb-2 text-zinc-900">{tier.name}</h3>
              <div className="text-3xl font-light text-zinc-900 mb-4">{tier.price}</div>
              <p className="text-zinc-500 text-sm mb-8 flex-grow">{tier.description}</p>
              
              <ul className="space-y-4 mb-8">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3 text-sm text-zinc-600">
                    <Check className="w-5 h-5 text-zinc-900 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-4 uppercase tracking-wider text-sm font-bold transition-colors ${
                tier.highlight
                  ? 'glass-button-dark'
                  : 'glass-button'
              }`}>
                Inquire Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
