'use client';

import { motion } from 'motion/react';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4 text-zinc-900">
              Initiate Project
            </h2>
            <div className="w-20 h-1 bg-zinc-900 mb-8" />
            <p className="text-zinc-600 mb-12">
              Ready to break ground? Contact our engineering team to discuss your vision, timeline, and structural requirements.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-200">
                  <MapPin />
                </div>
                <div>
                  <h4 className="text-zinc-900 font-bold uppercase tracking-wider mb-1">Headquarters</h4>
                  <p className="text-zinc-500">123 Architecture Ave<br />Industrial District, NY 10001</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-200">
                  <Phone />
                </div>
                <div>
                  <h4 className="text-zinc-900 font-bold uppercase tracking-wider mb-1">Direct Line</h4>
                  <p className="text-zinc-500">1-800-TRIANGLE</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-white flex items-center justify-center text-zinc-900 shrink-0 border border-zinc-200">
                  <Mail />
                </div>
                <div>
                  <h4 className="text-zinc-900 font-bold uppercase tracking-wider mb-1">Email</h4>
                  <p className="text-zinc-500">contact@trianglebuilders.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel p-8"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                  <input 
                    type="text" 
                    className="w-full glass-input px-4 py-4 text-zinc-900"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full glass-input px-4 py-4 text-zinc-900"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Estimated Budget</label>
                <select className="w-full glass-input px-4 py-4 text-zinc-900 appearance-none">
                  <option value="">Select a range...</option>
                  <option value="5k-50k">$5,000 - $50,000</option>
                  <option value="50k-250k">$50,000 - $250,000</option>
                  <option value="250k-1m">$250,000 - $1,000,000</option>
                  <option value="1m+">$1,000,000+</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-zinc-500">Project Details</label>
                <textarea 
                  rows={4}
                  className="w-full glass-input px-4 py-4 text-zinc-900 resize-none"
                  placeholder="Describe your vision..."
                />
              </div>

              <button className="w-full py-4 glass-button-dark uppercase tracking-wider font-bold">
                Submit Inquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
