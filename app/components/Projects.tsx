"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const projects = [
  {
    title: "ConfessYCCE",
    desc: "An anonymous campus confession platform with real-time posting, secure authentication, and a modern UI designed for safe and open student expression.",
    tech: ["Next.js", "Supabase", "Tailwind CSS", "JavaScript"],
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
  },
  {
    title: "CyberShield",
    desc: "A cybersecurity-focused project designed to monitor, detect, and prevent potential threats, emphasizing system safety and secure data handling.",
    tech: ["Python", "Machine Learning", "Network Security", "Linux"],
    img: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87"
  },
  {
    title: "Zoho Billing System",
    desc: "A billing and management system inspired by Zoho, built to handle invoices, transactions, and user data with a clean and efficient interface.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    img: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df"
  },
  {
    title: "Paralytic Patient Communication System",
    desc: "An assistive technology solution that enables paralytic patients to communicate effectively using smart input methods, improving accessibility and quality of life.",
    tech: ["Python", "OpenCV", "Machine Learning", "Computer Vision"],
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309"
  }
];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (wrapperRef.current && containerRef.current) {
      const sections = cardsRef.current;
      
      const ctx = gsap.context(() => {
        gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + wrapperRef.current?.offsetWidth,
          }
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="projects" ref={containerRef} className="overflow-hidden bg-black py-20 min-h-screen flex flex-col justify-center">
      <div className="max-w-[100vw] overflow-hidden">
        <h2 className="text-4xl md:text-6xl flex items-center justify-center font-bold mb-10 pl-10 text-white">Selected Works</h2>
        <div ref={wrapperRef} className="flex w-[400vw] sm:w-[200vw] h-[60vh]">
          {projects.map((project, idx) => (
            <div
              key={idx}
              ref={(el) => { if(el) cardsRef.current[idx] = el; }}
              className="w-screen sm:w-[50vw] h-full flex flex-col items-center justify-center p-8"
            >
              <div className="relative group w-full max-w-2xl h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{project.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
