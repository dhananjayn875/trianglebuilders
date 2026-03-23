import { Triangle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Triangle className="w-6 h-6 text-zinc-900 fill-zinc-900/10" />
          <span className="font-display font-bold tracking-widest uppercase text-zinc-900">Triangle Builders</span>
        </div>
        
        <div className="flex items-center gap-6 text-sm text-zinc-500">
          <Link href="#" className="hover:text-zinc-900 transition-colors">Instagram</Link>
          <Link href="#" className="hover:text-zinc-900 transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-zinc-900 transition-colors">Twitter</Link>
        </div>
        
        <div className="text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Triangle Builders. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
