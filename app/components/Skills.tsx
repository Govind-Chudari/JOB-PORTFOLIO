"use client";

import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    title: "FULL STACK DEV",
    skills: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"],
  },
  {
    title: "MACHINE LEARNING",
    skills: ["Python", "TensorFlow", "Neural Networks", "Data Pipelines"],
  },
  {
    title: "AGENTIC AI",
    skills: ["LangGraph", "GenAI", "Autonomous Agents", "LLM Systems"],
  },
  {
    title: "FRONTEND",
    skills: ["React", "Tailwind CSS", "GSAP", "Three.js"],
  },
  {
    title: "CREATIVE & 3D",
    skills: ["Blender", "After Effects", "Motion Design"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useGSAP(() => {
    gsap.fromTo(".skill-reveal",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="skills" ref={containerRef} className="relative w-full bg-black text-white overflow-hidden">

      <div className="w-full h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-32">

        {/* Header */}
        <div className="skill-reveal flex flex-col md:flex-row justify-between gap-8 mb-16 md:mb-24">
          <h2 className="editorial-large text-white">MY SKILLS</h2>
          <div className="md:max-w-sm">
            <p className="text-white/25 text-xs leading-relaxed uppercase tracking-[0.1em]">
              Whether it's building production-grade systems,
              training intelligent models, or crafting immersive 3D experiences —
              I bring craft and curiosity to every project.
            </p>
          </div>
        </div>

        {/* Service list */}
        <div className="skill-reveal">
          {services.map((service, i) => (
            <div
              key={i}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {i === 0 && <div className="h-px bg-white/8" />}

              <div className="flex items-center justify-between py-6 md:py-8 cursor-default">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    hoveredIndex === i
                      ? 'bg-white text-black'
                      : 'border border-white/15 text-white/30'
                  }`}>
                    <ArrowRight size={16} />
                  </div>
                  <div>
                    <h3 className={`text-lg md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                      hoveredIndex === i ? 'text-white' : 'text-white/60'
                    }`}>
                      {service.title}
                    </h3>
                    <p className="md:hidden text-[9px] font-mono text-white/20 tracking-[0.1em] uppercase mt-1">
                      {service.skills.join(" · ")}
                    </p>
                  </div>
                </div>

                <div className={`hidden md:flex items-center gap-4 transition-all duration-300 ${
                  hoveredIndex === i ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                }`}>
                  {service.skills.map((skill, j) => (
                    <span key={j} className="text-[10px] font-mono tracking-[0.1em] text-white/25 uppercase">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/8" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
