"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  const experiences = [
    {
      role: "Full Stack Developer",
      company: "Personal Projects & Freelance",
      year: "2023 - Present",
      desc: "Building full-stack applications using Next.js, Node.js, and Supabase. Developed platforms like ConfessYCCE with real-time features, authentication, and modern UI/UX."
    },
    {
      role: "AI/ML Developer",
      company: "Academic & Hackathon Projects",
      year: "2022 - 2023",
      desc: "Worked on AI-based systems including call sentiment analysis and computer vision for assistive communication. Focused on practical ML applications and real-world problem solving."
    },
    {
      role: "Frontend Developer",
      company: "Self Learning & Projects",
      year: "2020 - 2022",
      desc: "Started web development journey with HTML, CSS, and JavaScript. Built responsive websites and explored animations, UI design, and interactive user experiences."
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    itemsRef.current.forEach((item, idx) => {
      gsap.fromTo(
        item,
        { x: idx % 2 === 0 ? -100 : 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: idx * 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-32 bg-black overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-bold text-center text-white mb-20">
          Experience
        </h2>

        <div className="space-y-16">
          {experiences.map((exp, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) itemsRef.current[idx] = el;
              }}
              className={`group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl transition-all duration-500 hover:border-cyan-400/40 hover:bg-white/10
              ${
                idx % 2 === 0 ? "ml-0 md:mr-16" : "mr-0 md:ml-16"
              }`}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 bg-cyan-500/10 blur-xl"></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                
                {/* Left Content */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-cyan-400 text-lg mb-2">
                    {exp.company}
                  </p>

                  <p className="text-gray-400 text-sm leading-relaxed max-w-md opacity-80 group-hover:opacity-100 transition">
                    {exp.desc}
                  </p>
                </div>

                {/* Right Year */}
                <div className="text-gray-500 font-mono tracking-widest text-sm md:text-base whitespace-nowrap">
                  {exp.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}