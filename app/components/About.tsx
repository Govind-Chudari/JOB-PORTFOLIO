"use client";

import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".about-reveal",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  const journey = [
    { year: "1ST YEAR", title: "Web Development", desc: "Built my first websites. Fell in love with making things appear on screen." },
    { year: "2ND YEAR", title: "Full Stack", desc: "Backend, databases, APIs — learned to build complete systems end to end." },
    { year: "3RD YEAR", title: "Machine Learning", desc: "Neural networks, data pipelines, predictive models that actually learn." },
    { year: "4TH YEAR", title: "Agentic AI", desc: "Autonomous agents, LangGraph, pushing boundaries of what AI can do." },
  ];

  return (
    <section id="about" ref={containerRef} className="relative w-full bg-black text-white overflow-hidden">

      <div className="w-full h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-32">

        {/* Header */}
        <div className="about-reveal flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-10 mb-16 md:mb-24">
          <h2 className="editorial-large text-white">ABOUT ME</h2>
          <span className="text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase whitespace-nowrap md:pt-4">EST. 2022</span>
        </div>

        {/* Bio Grid */}
        <div className="about-reveal grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 mb-20 md:mb-32">
          <div>
            <p className="text-white/60 text-sm md:text-lg leading-[1.8] tracking-wide uppercase">
              Distinguished by a passion for intelligent systems and creative code,
              Govind stands as a builder in the realm of modern web engineering.
              A vibe coder who transforms ideas into living, breathing digital experiences.
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <p className="text-white/30 text-sm leading-relaxed mb-8">
              Whether it's architecting full-stack applications, training machine learning models,
              or building autonomous AI agents — every project is an exploration of what's possible
              when curiosity meets craft.
            </p>
            <div className="flex items-center gap-2 text-white/50 text-[11px] tracking-[0.2em] uppercase">
              <span className="font-bold">UNTIL... NOW</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="about-reveal w-full h-px bg-white/8 mb-16" />

        {/* Journey Row */}
        <div className="about-reveal grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6">
          {journey.map((item, i) => (
            <div key={i} className="group cursor-default">
              <span className="text-[10px] font-mono tracking-[0.2em] text-white/15 uppercase block mb-3">{item.year}</span>
              <h4 className="text-lg md:text-xl font-bold text-white/80 mb-2 tracking-tight group-hover:text-cyan-400 transition-colors duration-300">
                {item.title}
              </h4>
              <p className="text-white/25 text-xs leading-relaxed uppercase tracking-wide">
                {item.desc}
              </p>
              <div className="mt-4 h-px w-full bg-white/5 group-hover:bg-cyan-500/20 transition-colors" />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="about-reveal flex items-center gap-4 mt-16">
          <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
            <ArrowRight size={16} className="text-white/30 rotate-180" />
          </button>
          <button className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
            <ArrowRight size={16} className="text-white/30" />
          </button>
        </div>

      </div>
    </section>
  );
}
