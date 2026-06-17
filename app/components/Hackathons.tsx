"use client";

import React, { useRef, useState } from "react";
import { Trophy, MapPin, Users } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const hackathons = [
  {
    id: 1,
    name: "HackOverflow 2024",
    date: "March 2024",
    location: "Mumbai, India",
    result: "1ST PLACE",
    resultColor: "text-cyan-400",
    project: "AI-Powered Code Review Bot",
    description:
      "Built an intelligent code review assistant that analyzes pull requests, detects bugs, and suggests improvements.",
    tech: ["Python", "LangGraph", "FastAPI", "React"],
    team: "Team Cipher",
    teamSize: 4,
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "DevHacks 3.0",
    date: "January 2024",
    location: "Hyderabad, India",
    result: "2ND PLACE",
    resultColor: "text-violet-400",
    project: "Real-Time Collaboration Engine",
    description:
      "A platform supporting real-time code editing, whiteboarding, and video chat.",
    tech: ["Next.js", "Node.js", "WebSocket", "WebRTC"],
    team: "Team Vortex",
    teamSize: 3,
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Hackathons() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".hack-reveal",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section id="hackathons" ref={containerRef} className="relative w-full bg-black text-white overflow-hidden">

      <div className="w-full h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-32">

        {/* Header */}
        <div className="hack-reveal flex flex-col md:flex-row justify-between gap-8 mb-16 md:mb-24">
          <h2 className="editorial-large text-white">HACKATHONS</h2>
          <div className="md:max-w-sm">
            <p className="text-white/25 text-xs leading-relaxed uppercase tracking-[0.1em]">
              From overnight builds to week-long sprints — pushing limits and
              shipping real products.
            </p>
          </div>
        </div>

        {/* List - editorial stacked rows */}
        <div className="hack-reveal">
          {hackathons.map((hack) => (
            <div key={hack.id}>
              {/* Divider */}
              <div className="h-px bg-white/8" />

              {/* Hackathon Row */}
              <div
                className="group py-8 md:py-10 cursor-pointer"
                onMouseEnter={() => setHoveredId(hack.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Mobile: stacked layout */}
                <div className="md:hidden">
                  {/* Image */}
                  <div className="relative w-full h-[200px] overflow-hidden mb-5">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-active:scale-105"
                      style={{ backgroundImage: `url(${hack.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className={`absolute top-4 left-4 text-[9px] tracking-[0.2em] uppercase flex items-center gap-1.5 ${hack.resultColor}`}>
                      <Trophy size={10} /> {hack.result}
                    </span>
                    <span className="absolute top-4 right-4 text-[10px] font-mono text-white/15">0{hack.id}</span>
                  </div>

                  {/* Info */}
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-1">
                    {hack.name}
                  </h3>
                  <p className="text-[10px] font-mono tracking-[0.1em] uppercase text-cyan-400 mb-3">
                    {hack.project}
                  </p>
                  <p className="text-white/30 text-xs leading-relaxed mb-4">
                    {hack.description}
                  </p>
                  
                  {/* Tech */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {hack.tech.map((t, j) => (
                      <span key={j} className="text-[9px] font-mono tracking-[0.1em] text-white/20 uppercase">{t}</span>
                    ))}
                  </div>

                  {/* Team/Location */}
                  <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/40 uppercase">
                      <MapPin size={12} /> {hack.location}
                    </p>
                    <p className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/40 uppercase">
                      <Users size={12} /> {hack.team} · {hack.teamSize}
                    </p>
                  </div>
                </div>

                {/* Desktop: horizontal row */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-8 md:items-center">
                  {/* Number */}
                  <div className="col-span-1">
                    <span className="text-sm font-mono text-white/10 group-hover:text-white/30 transition-colors">0{hack.id}</span>
                  </div>

                  {/* Image */}
                  <div className="col-span-3">
                    <div className="relative w-full h-[160px] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${hoveredId === hack.id ? 'scale-105 grayscale-0' : 'scale-100 grayscale-[40%]'}`}
                        style={{ backgroundImage: `url(${hack.image})` }}
                      />
                      <div className={`absolute inset-0 transition-colors duration-500 ${hoveredId === hack.id ? 'bg-black/20' : 'bg-black/40'}`} />
                      <span className={`absolute bottom-3 left-4 text-[9px] tracking-[0.2em] uppercase flex items-center gap-1.5 ${hack.resultColor}`}>
                        <Trophy size={10} /> {hack.result}
                      </span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="col-span-5">
                    <h3 className={`text-3xl font-bold tracking-tight mb-2 transition-colors duration-300 ${hoveredId === hack.id ? 'text-white' : 'text-white/60'}`}>
                      {hack.name}
                    </h3>
                    <p className={`text-[10px] font-mono tracking-[0.1em] uppercase mb-3 transition-colors duration-300 ${hoveredId === hack.id ? 'text-cyan-400' : 'text-cyan-400/60'}`}>
                      {hack.project}
                    </p>
                    <p className={`text-xs leading-relaxed max-w-sm transition-colors duration-300 ${hoveredId === hack.id ? 'text-white/40' : 'text-white/20'}`}>
                      {hack.description}
                    </p>
                  </div>

                  {/* Tech + actions */}
                  <div className="col-span-3 flex flex-col items-end gap-4">
                    <div className="flex flex-wrap gap-2 justify-end">
                      {hack.tech.map((t, j) => (
                        <span key={j} className="text-[9px] font-mono tracking-[0.1em] text-white/20 uppercase">{t}</span>
                      ))}
                    </div>
                    <div className={`flex flex-col items-end gap-2 transition-all duration-300 ${hoveredId === hack.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      <p className="text-[10px] tracking-[0.15em] text-white/50 flex items-center gap-1.5 uppercase">
                         {hack.location} <MapPin size={12} />
                      </p>
                      <p className="text-[10px] tracking-[0.15em] text-white/50 flex items-center gap-1.5 uppercase">
                         {hack.team} · {hack.teamSize} <Users size={12} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {/* Final divider */}
          <div className="h-px bg-white/8" />
        </div>

      </div>
    </section>
  );
}