"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (cardsRef.current.length > 0) {
      gsap.fromTo(
        cardsRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
          },
        }
      );
    }
  }, []);
const timeline = [
  {
    year: "2020",
    text: "Started my journey into web development — where 'Hello World' felt like a huge achievement 😅. Explored React, broke things daily, fixed them somehow, and discovered that Google is every developer’s true best friend."
  },
  {
    year: "2021",
    text: "Dived deep into frontend architecture and animations. Turned static pages into smooth, interactive experiences — and spent hours debugging one tiny CSS issue 💀. Learned that making things look simple is actually very hard."
  },
  {
    year: "2022",
    text: "Worked on design systems and scalable applications. Started thinking beyond just code — focusing on structure, reusability, and clean UI/UX. Also realized naming variables might be harder than coding itself 🤡."
  },
  {
    year: "2023",
    text: "Entered the world of 3D web experiences, making the web more immersive and dynamic. From flat designs to interactive visuals — and yes, occasionally making GPUs struggle due to heavy rendering 😭."
  }
];

  return (
    <section id="about" ref={containerRef} className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-[spin_120s_linear_infinite]"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-6xl font-bold mb-16 text-center">My Story</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {timeline.map((item, idx) => (
            <div
              key={idx}
              ref={(el) => { if(el) cardsRef.current[idx] = el; }}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:bg-white/10 transition-colors duration-300"
            >
              <h3 className="text-3xl font-bold text-cyan-400 mb-4">{item.year}</h3>
              <p className="text-gray-300 text-lg leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
