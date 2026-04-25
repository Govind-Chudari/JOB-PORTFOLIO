"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 });
  }, []);

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tighter text-white">PORTFOLIO</div>
        <div className="hidden md:flex space-x-8">
          {["About", "Skills", "Projects", "Experience", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors duration-300">
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
