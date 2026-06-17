"use client";

import React, { useRef, useState, useEffect } from "react";
import { Send, Mail, ArrowUpRight, GitBranch, Briefcase, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isFocused, setIsFocused] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.fromTo(".contact-reveal",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%"
        }
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:govindchudari@gmail.com?subject=Contact via Portfolio from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nFrom: ' + formState.email)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" ref={containerRef} className="relative w-full bg-black text-white overflow-hidden">

      {/* Top divider */}
      <div className="w-full h-px bg-white/10" />

      <div className="max-w-7xl mx-auto px-8 md:px-14 py-20 md:py-32">

        {/* Massive CONTACT title - like reference */}
        <div className="contact-reveal mb-12 md:mb-24 relative">
          <h2 className="text-[18vw] sm:text-[15vw] md:text-8xl lg:editorial-huge text-white leading-[0.82] font-black tracking-tighter">
            CONT
            <span className="relative inline-block">
              A
              {/* Cyan circle accent like the red circle in reference */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[0.6em] h-[0.6em] rounded-full bg-cyan-500 -z-10 shadow-[0_0_30px_rgba(0,212,255,0.4)]" />
            </span>
            CT
          </h2>
        </div>

        {/* Form + Info grid */}
        <div className="contact-reveal grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">

          {/* Left - Info */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-white/30 text-xs leading-relaxed uppercase tracking-[0.1em] mb-12 max-w-sm">
                Have a project in mind? Want to collaborate?
                Or just want to say hi? Drop me a message
                and let's build something together.
              </p>

              <div className="space-y-6 mb-12">
                {[
                  { label: "EMAIL", value: "govindchudari@gmail.com" },
                  { label: "LOCATION", value: "India" },
                  { label: "PHONE", value: "+91 9373860325" },
                ].map((item, i) => (
                  <div key={i}>
                    <span className="text-[10px] font-mono tracking-[0.2em] text-white/20 uppercase block mb-1">{item.label}</span>
                    <span className="text-white/60 text-sm tracking-wide">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="flex gap-6">
              {[
                { icon: <GitBranch size={16} />, label: "GITHUB", url: "https://github.com/Govind-Chudari" },
                { icon: <Briefcase size={16} />, label: "LINKEDIN", url: "https://www.linkedin.com/in/govind-chudari/" },
                { icon: <Globe size={16} />, label: "HACKERRANK", url: "https://www.hackerrank.com/profile/govindchudari" },
              ].map((item, i) => (
                <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[10px] tracking-[0.15em] text-white/25 hover:text-white uppercase transition-colors duration-300">
                  <span className="group-hover:text-cyan-400 transition-colors">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </div>

            {/* Mobile divider between Info and Form */}
          </div>

          {/* Right - Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 bg-white/[0.03] border border-white/10 p-6 md:p-10 rounded-2xl mt-8 lg:mt-0 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            {[
              { name: "name", type: "text", label: "YOUR NAME" },
              { name: "email", type: "email", label: "YOUR EMAIL" }
            ].map((field) => (
              <div key={field.name} className="relative">
                <label className="text-[10px] tracking-[0.2em] text-white/20 uppercase block mb-3">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={(formState as any)[field.name]}
                  onChange={handleChange}
                  onFocus={() => setIsFocused(field.name)}
                  onBlur={() => setIsFocused(null)}
                  required
                  className="w-full bg-transparent border-b border-white/10 py-3 text-white text-sm tracking-wide focus:outline-none transition-colors"
                />
                <div className={`absolute bottom-0 left-0 h-px bg-cyan-500 transition-all duration-500 ${isFocused === field.name ? 'w-full' : 'w-0'}`} />
              </div>
            ))}

            <div className="relative">
              <label className="text-[10px] tracking-[0.2em] text-white/20 uppercase block mb-3">YOUR MESSAGE</label>
              <textarea
                id="contactMessage"
                name="message"
                value={formState.message}
                onChange={handleChange}
                onFocus={() => setIsFocused("message")}
                onBlur={() => setIsFocused(null)}
                required
                rows={4}
                placeholder="I would like to collaborate on..."
                className="w-full bg-transparent border border-white/10 rounded-xl p-4 text-white text-sm tracking-wide focus:outline-none focus:border-cyan-500/50 transition-colors resize-none placeholder:text-white/30"
              />
            </div>

            <button
              type="submit"
              className="group flex items-center gap-3 self-start mt-4 text-[11px] tracking-[0.2em] text-white/60 hover:text-white uppercase transition-colors duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-cyan-500 group-hover:bg-cyan-500 group-hover:text-black transition-all duration-300">
                <Send size={14} className="translate-x-0.5" />
              </div>
              SEND MESSAGE
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
