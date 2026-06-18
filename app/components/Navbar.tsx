"use client";

import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "ABOUT ME", href: "#about" },
    { name: "MY WORKS", href: "#work" },
    { name: "MY SKILLS", href: "#skills" },
    // { name: "HACKATHONS", href: "#hackathons" },
    { name: "CONTACT ME", href: "#contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Desktop */}
      <div className="hidden md:flex items-center justify-between px-10 py-5 mix-blend-difference">
        <a href="#" className="text-[11px] font-mono tracking-[0.25em] text-white/70 hover:text-white transition-colors uppercase">
          GOVIND·CHUDARI
        </a>
        <div className="flex items-center gap-10">
          {navLinks.map((item) => (
            <a
              key={item.name}
              className="text-[10px] tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 uppercase"
              href={item.href}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile */}
      <div className="md:hidden flex items-center justify-between px-6 py-4 bg-black shadow-[0_15px_40px_rgba(0,0,0,1)] relative z-20">
        <a href="#" className="text-[11px] font-mono tracking-[0.25em] text-white/70 uppercase">
          GOVIND.CHUDARI
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] z-10"
          style={{ transform: isOpen ? 'rotate(135deg)' : 'rotate(0deg)', transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
          <span className={`w-5 h-[2px] bg-white/70 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full ${isOpen ? 'translate-y-[3.5px]' : 'translate-y-0'}`} />
          <span className={`w-5 h-[2px] bg-white/70 transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full ${isOpen ? '-translate-y-[3.5px] rotate-90' : 'translate-y-0'}`} />
        </button>
      </div>

      {/* Background Dimming Overlay */}
      <div 
        className={`md:hidden fixed inset-0 top-[52px] bg-black/70 backdrop-blur-md transition-opacity duration-500 ease-out z-10 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setIsOpen(false)}
        style={{ height: '100vh' }}
      />

      {/* Small Box Options Menu */}
      <div className={`md:hidden absolute top-[68px] right-6 w-[91vw] bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-right z-20 ${isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
        <div className="flex flex-col">
          {navLinks.map((item, index) => (
            <a
              key={item.name}
              className="px-4 py-3.5 rounded-xl text-[10px] tracking-[0.2em] text-white/60 hover:text-cyan-400 hover:bg-white/5 transition-all duration-300 uppercase flex items-center"
              href={item.href}
              onClick={() => setIsOpen(false)}
              style={{
                transition: 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)',
                transitionDelay: isOpen ? `${index * 0.05}s` : '0s',
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateY(0)' : 'translateY(5px)'
              }}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
