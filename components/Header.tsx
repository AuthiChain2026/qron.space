'use client';

import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-qron-gradient flex items-center justify-center">
            <span className="text-white font-bold text-sm">Q</span>
          </div>
          <span className="text-xl font-bold text-white">QRON</span>
          <span className="text-xs bg-qron-primary/20 text-qron-primary px-2 py-0.5 rounded-full">
            BETA
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/gallery" className="text-slate-400 hover:text-white transition-colors text-sm">
            Gallery
          </Link>
          <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm">
            Pricing
          </Link>
          <Link href="/docs" className="text-slate-400 hover:text-white transition-colors text-sm">
            Docs
          </Link>
        </nav>

        {/* Social & CTA */}
        <div className="flex items-center gap-3">
          <a 
            href="https://twitter.com/QRONofficial" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a 
            href="https://github.com/QRON-2026/qron-starter-v2" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <button className="qron-button-secondary text-sm">
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
