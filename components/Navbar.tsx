'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Triangle, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', hash: '#about' },
    { name: 'Services', hash: '#services' },
    { name: 'Portfolio', hash: '#portfolio' },
    { name: 'Pricing', hash: '#pricing' },
    { name: 'Contact', hash: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-8 mt-2 ${scrolled ? 'py-2' : 'py-6'
        }`}
    >
      <div className={`max-w-7xl mx-auto flex items-center justify-between transition-all duration-500 rounded-2xl relative overflow-hidden ${scrolled ? 'px-6 py-3 shadow-sm' : 'px-2 py-3'}`}>
        {/* Smooth background layer */}
        <div
          className={`absolute inset-0 bg-zinc-100/80 backdrop-blur-md border border-zinc-200 transition-opacity duration-500 -z-10 ${scrolled ? 'opacity-90 ' : 'opacity-0'}`}
        />

        <Link href="/" className="flex items-center gap-3 group">
          <Triangle className={`w-8 h-8 transition-colors duration-300 ${scrolled ? 'text-zinc-800 fill-zinc-800/10 group-hover:fill-zinc-900' : 'text-black fill-black/10 group-hover:fill-black'}`} />
          <span className={`font-display font-bold text-xl tracking-widest uppercase transition-colors duration-300 ${scrolled ? 'text-zinc-1000' : 'text-black'}`}>Triangle Builders</span>&nbsp;<span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 ml-auto mr-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={pathname === '/' ? link.hash : `/${link.hash}`}
              className={`text-sm font-medium transition-colors uppercase tracking-wider ${scrolled ? 'text-zinc-800 hover:text-black' : 'text-black hover:text-zinc-700'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <Link
            href="/vision"
            className="px-6 py-3 glass-button-dark flex items-center gap-2 uppercase tracking-wider text-sm font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            AI Studio
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${scrolled ? 'text-zinc-800 hover:text-black' : 'text-black hover:text-zinc-700'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: .1, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="md:hidden mt-4 mx-4 glass-panel bg-zinc-100/80 "
          >
            <div className="px-6 py-6 bg-zinc-100/80 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={pathname === '/' ? link.hash : `/${link.hash}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-zinc-500 hover:text-zinc-900 font-medium uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/vision"
                onClick={() => setMobileMenuOpen(false)}
                className="glass-button-dark px-6 py-4 flex items-center justify-center gap-2 uppercase tracking-wider text-sm font-bold"
              >
                <span className="w-2 h-2 rounded-full bg-white" />
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
