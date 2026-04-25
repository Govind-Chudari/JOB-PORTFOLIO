"use client";
import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function Interactive() {
  const [score, setScore] = useState(0);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const moveTarget = () => {
    if (!targetRef.current) return;
    const x = Math.random() * 80 - 40; // -40vw to 40vw
    const y = Math.random() * 60 - 30; // -30vh to 30vh
    
    gsap.to(targetRef.current, {
      x: `${x}vw`,
      y: `${y}vh`,
      duration: 0.5,
      ease: "power2.out",
    });
    setScore(s => s + 1);
  };

  useEffect(() => {
    gsap.to(targetRef.current, {
      scale: 1.1,
      duration: 0.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <section className="py-32 relative bg-black flex flex-col items-center justify-center min-h-[60vh] overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 z-10 pointer-events-none">
        Catch the orb! Score: <span className="text-cyan-400">{score}</span>
      </h2>
      <div 
        ref={targetRef}
        onMouseEnter={moveTarget}
        onClick={moveTarget}
        className="absolute w-16 h-16 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_30px_rgba(34,211,238,0.8)] cursor-pointer z-20 flex items-center justify-center text-white font-bold"
      >
        Catch
      </div>
    </section>
  );
}
