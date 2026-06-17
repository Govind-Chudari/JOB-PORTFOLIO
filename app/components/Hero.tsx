"use client";

import React, { useRef, useState, useEffect } from "react";
import { GitBranch, Link as LinkIcon, Code2, FileText, Terminal, ArrowUpRight } from "lucide-react";
import Canvas from "./Canvas";

const LOGOS = [
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+PGNpcmNsZSBjeD0iMCIgY3k9IjAiIHI9IjIuMDUiIGZpbGw9IndoaXRlIi8+PGcgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIj48ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiLz48ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPjxlbGxpcHNlIHJ4PSIxMSIgcnk9IjQuMiIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwKSIvPjwvZz48L3N2Zz4=",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI0NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSI4Ii8+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0zNSAzMCBMNDUgMzAgTDY1IDYwIEw2NSAzMCBMNzUgMzAgTDc1IDcwIEw2NSA3MCBMNDUgNDAgTDQ1IDcwIEwzNSA3MCBaIi8+PC9zdmc+",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48dGV4dCB4PSI1MCIgeT0iNTUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC13ZWlnaHQ9ImJvbGQiIGZvbnQtc2l6ZT0iMzAiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSI+R1NBUDwvdGV4dD48L3N2Zz4=",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMTAgMTEwIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTU1LjggMTEuMmMtMjMuNyAwLTIyLjMgMTAuMy0yMi4zIDEwLjNsLjIgMTAuN2gyMy4ydjMuM0gzMi42cy0xNS42LTEuNS0xNS42IDE1LjFjMCAxNi42IDEzLjYgMTUuNiAxMy42IDE1LjZoNy42di0xMC44cy0uMy0xMi43IDEyLjMtMTIuN2gxNi4yczEwLjktLjMgMTAuOS0xMVYyMS40czEuMi0xMC4yLTIxLjgtMTAuMnptLTEwLjUgNy4xYzEuOCAwIDMuMyAxLjUgMy4zIDMuMyAwIDEuOC0xLjUgMy4zLTMuMyAzLjMtMS44IDAtMy4zLTEuNS0zLjMtMy4zIDAtMS44IDEuNS0zLjMgMy4zLTMuM3ptMzEuMyAyNy41cy0xMC45LjMtMTAuOSAxMXYxMS4xcy0uMyAxMi43LTEyLjMgMTIuN0gzNy4ydjEwLjhzLTEuMSAxMC4yIDIxLjggMTAuMmMyMy43IDAgMjIuMy0xMC4zIDIyLjMtMTAuM2wtLjItMTAuN0g1Ny45di0zLjNoMjQuM3MxNS42IDEuNSAxNS42LTE1LjFjMC0xNi42LTEzLjYtMTUuNi0xMy42LTE1LjZoLTcuNnpNNjUuNCA4OC41YzEuOCAwIDMuMyAxLjUgMy4zIDMuMyAwIDEuOC0xLjUgMy4zLTMuMyAzLjMtMS44IDAtMy4zLTEuNS0zLjMtMy4zIDAtMS44IDEuNS0zLjMgMy4zLTMuM3oiLz48L3N2Zz4=",
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0id2hpdGUiIGQ9Ik0xMiAwYy02LjYyNiAwLTEyIDUuMzczLTEyIDEyIDAgNS4zMDIgMy40MzggOS44IDguMjA3IDExLjM4Ny41OTkuMTExLjc5My0uMjYxLjc5My0uNTc3di0yLjIzNGMtMy4zMzguNzI2LTQuMDMzLTEuNDE2LTQuMDMzLTEuNDE2LS41NDYtMS4zODctMS4zMzMtMS43NTYtMS4zMzMtMS43NTYtMS4wODktLjc0NS4wODMtLjcyOS4wODMtLjcyOSAxLjIwNS4wODQgMS44MzkgMS4yMzcgMS44MzkgMS4yMzcgMS4wNyAxLjgzNCAyLjgwNyAxLjMwNCAzLjQ5Mi45OTcuMTA3LS43NzUuNDE4LTEuMzA1Ljc2Mi0xLjYwNC0yLjY2NS0uMzA1LTUuNDY3LTEuMzM0LTUuNDY3LTUuOTMxIDAtMS4zMTEuNDY5LTIuMzgxIDEuMjM2LTMuMjIxLS4xMjQtLjMwMy0uNTM1LTEuNTI0LjExNy0zLjE3NiAwIDAgMS4wMDgtLjMyMiAzLjMwMSAxLjIzLjk1Ny0uMjY2IDEuOTgzLS4zOTkgMy4wMDMtLjQwNCAxLjAyLjAwNSAyLjA0Ny4xMzggMy4wMDYuNDA0IDIuMjkxLTEuNTUyIDMuMjk3LTEuMjMgMy4yOTctMS4yMy42NTMgMS42NTMuMjQyIDIuODc0LjExOCAzLjE3Ni43Ny44NCAxLjIzNSAxLjkxMSAxLjIzNSAzLjIyMSAwIDQuNjA5LTIuODA3IDUuNjI0LTUuNDc5IDUuOTIxLjQzLjM3Mi44MjMgMS4xMDIuODIzIDIuMjIydjMuMjkzYzAgLjMxOS4xOTIuNjk0LjgwMS41NzYgNC43NjUtMS41ODkgOC4xOTktNi4wODYgOC4xOTktMTEuMzg2IDAtNi42MjctNS4zNzMtMTItMTItMTJ6Ii8+PC9zdmc+"
];

const TechLogoMorph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationRef = useRef<number>();
  const [logoIndex, setLogoIndex] = useState(0);

  // 1. Animation Loop (Runs continuously, never restarted)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = 280;
    const height = 280;
    canvas.width = width;
    canvas.height = height;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(34, 211, 238, 0.4)";
      
      particlesRef.current.forEach(p => {
        if(p.originX === undefined) return;
        
        // Pure spring physics, no cursor distortion
        p.x += (p.originX - p.x) * 0.12 + p.vx;
        p.y += (p.originY - p.y) * 0.12 + p.vy;
        p.vx *= 0.82;
        p.vy *= 0.82;

        ctx.fillRect(p.x, p.y, 2.5, 2.5);
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // 2. Load Logos and Assign Targets (Runs only when index changes)
  useEffect(() => {
    const width = 280;
    const height = 280;
    const img = new Image();
    
    img.onload = () => {
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      offCtx.clearRect(0, 0, width, height);
      offCtx.drawImage(img, 30, 30, 220, 200);

      const pixels = offCtx.getImageData(0, 0, width, height).data;
      const step = 3; 
      
      const newTargets: {x:number, y:number}[] = [];
      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (pixels[index + 3] > 128) {
            newTargets.push({ x, y });
          }
        }
      }

      if (particlesRef.current.length === 0) {
         particlesRef.current = newTargets.map(t => ({
            x: width/2 + (Math.random()-0.5)*300,
            y: height/2 + (Math.random()-0.5)*300,
            originX: t.x,
            originY: t.y,
            vx: 0, vy: 0
         }));
      } else {
         const current = particlesRef.current;
         if (newTargets.length > current.length) {
            const toAdd = newTargets.length - current.length;
            for(let i=0; i<toAdd; i++) {
               current.push({
                 x: width/2 + (Math.random()-0.5)*200,
                 y: height/2 + (Math.random()-0.5)*200,
                 vx: (Math.random()-0.5)*20, 
                 vy: (Math.random()-0.5)*20
               });
            }
         } else if (newTargets.length < current.length) {
            current.splice(newTargets.length);
         }
         
         // Shuffle targets so particles cross paths dramatically during morph
         const shuffledTargets = [...newTargets].sort(() => Math.random() - 0.5);
         
         shuffledTargets.forEach((t, i) => {
            current[i].originX = t.x;
            current[i].originY = t.y;
            current[i].vx += (Math.random() - 0.5) * 20;
            current[i].vy += (Math.random() - 0.5) * 20;
         });
      }
    };
    img.src = LOGOS[logoIndex];
  }, [logoIndex]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[280px]">
      <canvas 
        ref={canvasRef} 
        onClick={() => setLogoIndex((prev) => (prev + 1) % LOGOS.length)}
        className="cursor-pointer block mx-auto touch-none transition-transform duration-300 hover:scale-105 active:scale-95" 
        style={{ width: '280px', height: '280px' }}
      />
      <span className="text-[9px] font-mono tracking-[0.3em] text-cyan-400/50 uppercase absolute bottom-0 animate-pulse pointer-events-none">
        TAP TO MORPH
      </span>
    </div>
  );
};

export default function Hero() {
  const introRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");

  const roles = ["VIBE CODER", "FULL STACK DEV", "ML ENGINEER", "AI AGENT BUILDER"];

  // Removed setTimeout for setMounted, will be triggered by Canvas onLoaded

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let charIndex = 0;
    let deleting = false;
    let timeout: NodeJS.Timeout;

    const type = () => {
      if (!deleting) {
        setDisplayedRole(currentRole.slice(0, charIndex + 1));
        charIndex++;
        if (charIndex === currentRole.length) {
          timeout = setTimeout(() => { deleting = true; type(); }, 2200);
          return;
        }
        timeout = setTimeout(type, 70 + Math.random() * 30);
      } else {
        setDisplayedRole(currentRole.slice(0, charIndex));
        charIndex--;
        if (charIndex === 0) {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
        timeout = setTimeout(type, 35);
      }
    };

    type();
    return () => clearTimeout(timeout);
  }, [roleIndex]);

  const links = [
    { name: "LinkedIn", icon: <LinkIcon size={12} />, url: "https://www.linkedin.com/in/govind-chudari/" },
    { name: "GitHub", icon: <GitBranch size={12} />, url: "https://github.com/Govind-Chudari" },
    { name: "LeetCode", icon: <Code2 size={12} />, url: "https://leetcode.com/u/govindchudari/" },
    { name: "HackerRank", icon: <Terminal size={12} />, url: "https://www.hackerrank.com/profile/govindchudari" },
    { name: "Resume", icon: <FileText size={12} />, url: "https://drive.google.com/file/d/17-3Ii9JXsQWA_aeF4-yTzs_bbKTFZue7/view?usp=sharing" },
  ];

  return (
    <Canvas introRef={introRef} onLoaded={() => setMounted(true)}>
      <div
        ref={introRef}
        className="relative w-full z-20 px-6 md:px-14 min-h-[100dvh] md:min-h-0 md:absolute md:inset-0 flex flex-col justify-between md:flex-col md:justify-between py-24 md:py-24 mt-0 md:mt-0"
      >
        <div className={`hidden md:block max-w-xs transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-[10px] leading-relaxed text-white/30 uppercase tracking-[0.15em] mt-12">
            A vibe coder who loves
            <br />building intelligent systems.
            <br />Turning ideas into
            <br />reality through code.
          </p>
        </div>

        <div className={`hidden md:flex absolute top-28 right-14 flex-col items-end gap-4 transition-all duration-1000 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.3s' }}>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-white/30 tracking-[0.15em] uppercase">scroll</span>
            <span className="text-[10px] font-mono text-white/30">&darr;</span>
          </div>
        </div>

        <div className="md:hidden flex flex-col pt-8">
          <div className={`flex items-center gap-2.5 mb-3 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
            <span className="text-[11px] font-bold tracking-[0.15em] text-cyan-400 uppercase font-mono">
              {displayedRole}
              <span className="inline-block w-[2px] h-[0.9em] bg-cyan-400 ml-0.5 align-middle animate-blink" />
            </span>
          </div>

          <div className={`flex flex-col transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <h1 className="text-8xl font-black tracking-tighter text-white leading-[0.85]">
              GOVIND
            </h1>
            <h1 className="text-8xl font-black tracking-tighter text-transparent leading-[1] -mt-1" style={{ WebkitTextStroke: '1px rgba(34, 211, 238, 0.4)' }}>
              CHUDARI
            </h1>
          </div>

          <div className={`flex flex-wrap gap-5 mt-8 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.5s' }}>
            {links.filter(l => l.name !== "HackerRank").map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/50 hover:text-white uppercase transition-colors duration-300"
              >
                <span className="text-cyan-400 opacity-70 group-hover:opacity-100">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="md:hidden flex-1 flex flex-col items-center justify-center relative w-full opacity-90 min-h-[220px]">
          <TechLogoMorph />
        </div>

        <div className="flex flex-col md:mt-auto">
          <div className={`hidden md:flex items-center gap-2.5 mb-6 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.2s' }}>
            <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(0,212,255,0.8)]" />
            <span className="text-base font-bold tracking-[0.15em] text-cyan-400 uppercase font-mono">
              {displayedRole}
              <span className="inline-block w-[2px] h-[0.9em] bg-cyan-400 ml-0.5 align-middle animate-blink" />
            </span>
          </div>

          {/* Massive name (Desktop) */}
          <div className={`hidden md:block transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: '0.4s' }}>
            <h1 className="editorial-huge text-white leading-[0.82]">
              GOVIND
            </h1>
            <h1 className="editorial-huge-outline text-white/30 leading-[0.82] -mt-2">
              CHUDARI
            </h1>
          </div>

          {/* Mobile: short bio below name */}
          <p className={`md:hidden text-[11px] leading-[1.8] text-white/40 uppercase tracking-[0.15em] mt-6 max-w-[300px] transition-all duration-1000 ease-out ${mounted ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0.5s' }}>
            Full Stack &amp; ML Engineer. Building intelligent, high-performance systems.
          </p>

          {/* Links row (Desktop) */}
          <div className={`hidden md:flex flex-wrap gap-4 mt-8 transition-all duration-1000 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: '0.7s' }}>
            {links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1.5 text-[10px] tracking-[0.15em] text-white/25 hover:text-white uppercase transition-colors duration-300"
              >
                <span className="group-hover:text-cyan-400 transition-colors">{link.icon}</span>
                <span>{link.name}</span>
                <ArrowUpRight size={8} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

        </div>
      </div>
    </Canvas>
  );
}
