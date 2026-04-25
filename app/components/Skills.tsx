"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const skills = [
    { name: "MERN Stack", icon: "🌐" },
    { name: "Tailwind", icon: "💨" },
    { name: "Python", icon: "🐍" },
    { name: "Java", icon: "☕" },
    { name: "Blender", icon: "🧊" },
    { name: "Machine Learning", icon: "🧠" },
    { name: "Agentic AI", icon: "🤖" },
    { name: "LangGraph", icon: "🕸️" },
    { name: "Full Stack", icon: "🥞" },
    { name: "GitHub", icon: "🐙" },
    { name: "Supabase", icon: "🟩" },
    { name: "MongoDB", icon: "🍃" }
  ];

  useEffect(() => {
    // Floating animation
    cardsRef.current.forEach((card, index) => {
      gsap.to(card, {
        y: -15,
        rotation: index % 2 === 0 ? 5 : -5,
        duration: 2 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      x: x * 0.2,
      y: y * 0.2,
      scale: 1.1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <section id="skills" className="py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center text-white">Skills & Arsenal</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              ref={(el) => { if(el) cardsRef.current[idx] = el; }}
              onMouseMove={(e) => handleMouseMove(e, idx)}
              onMouseLeave={() => handleMouseLeave(idx)}
              className="w-40 h-40 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-shadow duration-300"
            >
              <div className="text-4xl md:text-5xl mb-4">{skill.icon}</div>
              <h3 className="text-lg font-medium text-white">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
