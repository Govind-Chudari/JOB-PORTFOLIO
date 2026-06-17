"use client";

import React, { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useGSAP(() => {
    gsap.fromTo(".work-reveal",
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

const projects = [
  {
    id: 1,
    title: "RailNerv Sentinel",
    category: "AGENTIC AI SAFETY",
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?q=80&w=984&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Next-generation autonomous safety & telemetry platform for railways. Real-time multi-agent intelligence system with 6 specialized AI agents orchestrating acoustic anomaly detection, weather correlation, dynamic routing, and predictive maintenance via Apache Kafka streaming.",
    tech: ["FastAPI", "Next.js", "PyTorch", "Kafka", "PostgreSQL", "Redis"],
    num: "01",
    repo: "https://github.com/Govind-Chudari/FARAWAY",
    link: "https://faraway-railmind.vercel.app/"
  },
  {
    id: 2,
    title: "VaultMind",
    category: "FINTECH AI",
    image: "https://images.unsplash.com/photo-1601597110547-78516f198ce4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "AI-powered fraud detection platform for Union Bank of India's iDEA 2.0 hackathon. Coordinated multi-agent system with sentiment analysis, deception detection, and pre-crime prediction agents for real-time transaction risk assessment.",
    tech: ["Python", "JavaScript", "FastAPI", "SQLite", "LLM Integration"],
    num: "02",
    repo: "https://github.com/Govind-Chudari/IDEA-2.0-POJECT",
    link: "https://idea-2-0-poject.vercel.app/"
  },
  {
    id: 3,
    title: "Confession Wall",
    category: "FULL STACK APP",
    image: "https://images.unsplash.com/photo-1535615615570-3b839f4359be?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG92ZXxlbnwwfHwwfHx8MA%3D%3D",
    description: "Anonymous & verified confession platform for YCCE students. Real-time social platform with identity verification, Supabase backend, and interactive UI for safe anonymous expression and community engagement.",
    tech: ["Next.js", "TypeScript", "Supabase", "TailwindCSS", "React 18"],
    num: "03",
    repo: "https://github.com/Govind-Chudari/CONFESSION-WALL",
    link: "https://confessycce.vercel.app/"
  },
  {
    id: 4,
    title: "CyberShield",
    category: "NLP SECURITY",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    description: "Anti-India disinformation detection system recognized at MP Police & SBI CYBERSHIELD Hackathon 2024. Advanced NLP-based platform identifying and combating malicious misinformation with real-time analysis and threat scoring.",
    tech: ["Python", "Streamlit", "NLP", "BERT", "MLOps"],
    num: "04",
    repo: "https://github.com/Govind-Chudari/CYBERSHEILD",
    link: "https://govind-chudari-cybersheild-cybersheildmain-b4onxn.streamlit.app/"
  },
  {
    id: 5,
    title: "BillFlow",
    category: "SAAS FINTECH",
    image: "https://plus.unsplash.com/premium_photo-1678139620956-cbd87b6ba3d0?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Multi-tenant SaaS billing engine designed for Zoho Setu challenge. Enterprise-grade subscription management with invoice generation, payment processing, recurring billing automation, and comprehensive financial reporting.",
    tech: ["Python", "JavaScript", "Docker", "PostgreSQL", "Render Deployment"],
    num: "05",
    repo: "https://github.com/Govind-Chudari/BILLINGENGINE_ZOHO",
    link: "https://billflow-frontend-production.up.railway.app/login"
  }
];

  return (
    <section id="work" ref={containerRef} className="relative w-full bg-black text-white overflow-hidden">

      <div className="w-full h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-6 md:px-14 py-16 md:py-32">

        {/* Header */}
        <div className="work-reveal flex flex-col md:flex-row justify-between gap-8 mb-16 md:mb-24">
          <h2 className="editorial-large text-white">MY WORKS</h2>
          <div className="md:max-w-sm">
            <p className="text-white/25 text-xs leading-relaxed uppercase tracking-[0.1em]">
              Every project is a meticulously crafted exploration.
              Built with intention, shipped with craft.
            </p>
          </div>
        </div>


        {/* Project list - editorial stacked rows */}
        <div className="work-reveal">
          {projects.map((project, i) => (
            <div key={project.id}>
              {/* Divider */}
              <div className="h-px bg-white/8" />

              {/* Project Row */}
              <div
                className="group py-8 md:py-10 cursor-pointer"
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Mobile: stacked layout */}
                <div className="md:hidden">
                  {/* Image */}
                  <div className="relative w-full h-[200px] overflow-hidden mb-5">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-active:scale-105"
                      style={{ backgroundImage: `url(${project.image})` }}
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <span className="absolute top-4 left-4 text-[9px] tracking-[0.2em] text-white/40 uppercase">{project.category}</span>
                    <span className="absolute top-4 right-4 text-[10px] font-mono text-white/15">{project.num}</span>
                  </div>

                  {/* Info */}
                  <h3 className="text-2xl font-bold text-white tracking-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-white/30 text-xs leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-4">
                    {project.tech.map((t, j) => (
                      <span key={j} className="text-[9px] font-mono tracking-[0.1em] text-white/20 uppercase">{t}</span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/40 hover:text-cyan-400 uppercase transition-colors">
                      <ExternalLink size={12} /> View
                    </a>
                    <a href={project.repo || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/40 hover:text-cyan-400 uppercase transition-colors">
                      <GitBranch size={12} /> Code
                    </a>
                  </div>
                </div>

                {/* Desktop: horizontal row */}
                <div className="hidden md:grid md:grid-cols-12 md:gap-8 md:items-center">
                  {/* Number */}
                  <div className="col-span-1">
                    <span className="text-sm font-mono text-white/10 group-hover:text-white/30 transition-colors">{project.num}</span>
                  </div>

                  {/* Image */}
                  <div className="col-span-3">
                    <div className="relative w-full h-[160px] overflow-hidden">
                      <div
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${hoveredId === project.id ? 'scale-105 grayscale-0' : 'scale-100 grayscale-[40%]'}`}
                        style={{ backgroundImage: `url(${project.image})` }}
                      />
                      <div className={`absolute inset-0 transition-colors duration-500 ${hoveredId === project.id ? 'bg-black/20' : 'bg-black/40'}`} />
                      <span className="absolute bottom-3 left-4 text-[9px] tracking-[0.2em] text-white/40 uppercase">{project.category}</span>
                    </div>
                  </div>

                  {/* Title + description */}
                  <div className="col-span-5">
                    <h3 className={`text-3xl font-bold tracking-tight mb-2 transition-colors duration-300 ${hoveredId === project.id ? 'text-white' : 'text-white/60'}`}>
                      {project.title}
                    </h3>
                    <p className={`text-xs leading-relaxed max-w-sm transition-colors duration-300 ${hoveredId === project.id ? 'text-white/40' : 'text-white/20'}`}>
                      {project.description}
                    </p>
                  </div>

                  {/* Tech + actions */}
                  <div className="col-span-3 flex flex-col items-end gap-4">
                    <div className="flex flex-wrap gap-2 justify-end">
                      {project.tech.map((t, j) => (
                        <span key={j} className="text-[9px] font-mono tracking-[0.1em] text-white/20 uppercase">{t}</span>
                      ))}
                    </div>
                    <div className={`flex gap-4 transition-all duration-300 ${hoveredId === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                      <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/50 hover:text-cyan-400 uppercase transition-colors">
                        View <ArrowUpRight size={12} />
                      </a>
                      <a href={project.repo || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/50 hover:text-cyan-400 uppercase transition-colors">
                        Code <GitBranch size={12} />
                      </a>
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
