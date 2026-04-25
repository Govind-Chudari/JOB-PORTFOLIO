"use client";
import React from "react";

export default function Footer() {
  const socials = [
    { name: "GitHub", link: "https://github.com/Govind-Chudari" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/govind-chudari/" },
    { name: "Instagram", link: "https://www.instagram.com/govind_chudari/" },
  ];

  return (
    <footer className="w-full bg-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo */}
        <a
          href="#hero"
          className="text-2xl font-bold tracking-tighter text-white hover:text-cyan-400 transition"
        >
          PORTFOLIO
        </a>

        {/* Social Links */}
        <div className="flex space-x-6">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group text-gray-400 hover:text-cyan-400 transition duration-300"
            >
              {social.name}

              {/* underline animation */}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-gray-500 text-sm">
          © {new Date().getFullYear()} Govind Chudari. All rights reserved.
        </div>

      </div>
    </footer>
  );
}