"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<HTMLElement[]>([]);
  const objectRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      textRefs.current,
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
      }
    );

    // 🔥 Stats animation
    gsap.fromTo(
      statsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        delay: 0.8,
        ease: "power3.out",
      }
    );

    // Floating avatar
    gsap.to(objectRef.current, {
      y: -20,
      rotation: 6,
      scale: 1.03,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Background blobs
    gsap.to(blob1Ref.current, {
      x: 80,
      y: -40,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    gsap.to(blob2Ref.current, {
      x: -60,
      y: 50,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Scroll indicator
    gsap.to(scrollRef.current, {
      y: 10,
      repeat: -1,
      yoyo: true,
      duration: 0.8,
    });

    // Mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      if (!objectRef.current) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;

      gsap.to(objectRef.current, {
        x,
        y,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Background texture */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-[spin_120s_linear_infinite]"></div>
      </div>

      {/* Blobs */}
      <div className="absolute inset-0 z-0">
        <div
          ref={blob1Ref}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px] mix-blend-screen"
        />
        <div
          ref={blob2Ref}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen"
        />
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-6">
        
        {/* LEFT */}
        <div className="flex-1 space-y-6">

          <div className="overflow-hidden">
            <h1
              ref={(el) => { if (el) textRefs.current[0] = el; }}
              className="text-5xl md:text-8xl font-bold tracking-tighter"
            >
              GOVIND
            </h1>
          </div>

          <div className="overflow-hidden">
            <h1
              ref={(el) => { if (el) textRefs.current[1] = el; }}
              className="text-5xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-[length:200%_200%] animate-gradient"
            >
              CHUDARI
            </h1>
          </div>

          <div className="overflow-hidden">
            <p
              ref={(el) => { if (el) textRefs.current[2] = el; }}
              className="text-xl text-gray-400 max-w-md"
            >
              I craft smooth, interactive experiences blending design, code, and AI.
            </p>
          </div>

          {/* 🔥 CTA */}
          <div className="flex gap-4 pt-4">
            <a href="#projects" className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition">
              Contact Me
            </a>
          </div>

          {/* 🔥 STATS */}
          <div className="flex gap-6 pt-6 text-white">
            {["10+ Projects", "5+ Tech", "2+ Hackathons"].map((item, i) => (
              <div
                key={i}
                ref={(el) => { if (el) statsRef.current[i] = el; }}
                className="text-sm md:text-base font-medium opacity-80"
              >
                {item}
              </div>
            ))}
          </div>

          {/* 🔥 TECH PILLS */}
          <div className="flex flex-wrap gap-3 pt-4">
            {["MERN", "JAVSCRIPT", "BLENDER", "AGENTIC AI",].map((tech, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/20 backdrop-blur-md hover:bg-white/20 transition"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1 mt-12 md:mt-0 flex justify-center perspective-[1000px]">
          <div
            ref={objectRef}
            className="w-64 h-64 md:w-96 md:h-96 relative transform-style-3d bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl shadow-[0_0_80px_rgba(34,211,238,0.25)] flex items-center justify-center"
          >
            <div className="absolute inset-4 border border-white/10 rounded-2xl z-20 pointer-events-none"></div>
            <div className="absolute inset-8 border border-white/5 rounded-xl z-20 pointer-events-none"></div>

            <img
              src="/logo.png"
              alt="Hero Graphic"
              className="w-full h-full object-cover rounded-3xl opacity-90 z-10 p-2"
            />
          </div>
        </div>
      </div>

      {/* Scroll */}
      <div
        ref={scrollRef}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm opacity-70"
      >
        ↓ Scroll
      </div>

      {/* Gradient animation */}
      <style jsx>{`
        .animate-gradient {
          animation: gradientMove 6s linear infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}