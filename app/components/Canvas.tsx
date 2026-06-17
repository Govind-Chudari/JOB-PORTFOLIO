"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Briefcase, GitBranch, Code2, FileText } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CanvasProps {
  children?: React.ReactNode;
  introRef?: React.RefObject<HTMLDivElement | null>;
  onLoaded?: () => void;
}

export default function Canvas({ children, introRef, onLoaded }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);
  const loadingRef = useRef<HTMLDivElement>(null);
  const startOverlayRef = useRef<HTMLDivElement>(null);
  const leftInfoRef = useRef<HTMLDivElement>(null);
  const rightInfoRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedPercentage, setLoadedPercentage] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 80 });
  const animationFrameRef = useRef<number>();
  const scrollProgressRef = useRef(0);

  const [frameCount, setFrameCount] = useState(0);

  useEffect(() => {
    setFrameCount(window.innerWidth < 768 ? 222 : 290);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  }, []);

  const currentFrame = (index: number) =>
    `https://res.cloudinary.com/dovwhmf3h/image/upload/q_auto:low,f_auto,w_1200/v1781713776/${index.toString().padStart(6, "0")}.webp`;

  const renderFrame = useCallback((index: number) => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const img = imagesRef.current[index];
    if (!img || !img.complete) return;

    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    context.imageSmoothingEnabled = true;

    const hRatio = width / img.width;
    const vRatio = height / img.height;
    const ratio = Math.max(hRatio, vRatio);

    const centerShift_x = (width - img.width * ratio) / 2;
    const centerShift_y = (height - img.height * ratio) / 2;

    context.clearRect(0, 0, width, height);
    context.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }, []);

  useEffect(() => {
    if (frameCount === 0) return;
    if (imagesRef.current.length > 0) return;

    const mountTimer = setTimeout(() => setIsMounted(true), 50);
    let loadedCount = 0;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);

      img.onload = () => {
        loadedCount++;
        const requiredFrames = Math.min(30, frameCount);
        const percentage = Math.min(100, Math.round((loadedCount / requiredFrames) * 100));
        setLoadedPercentage(percentage);
        if (i === 0) renderFrame(0);
      };

      img.onerror = () => {
        console.error(`Failed to load Cloudinary image: ${img.src}. Please check that the file exists and the URL is correct.`);
      };

      imagesRef.current.push(img);
    }

    return () => clearTimeout(mountTimer);
  }, [renderFrame, frameCount]);

  // Hide navbar initially
  useGSAP(() => {
    const navbar = document.querySelector('nav');
    if (navbar) {
      gsap.set(navbar, { opacity: 0, pointerEvents: 'none' });
    }
  }, []);

  useGSAP(() => {
    gsap.set(bgCanvasRef.current, { scale: 1.2, opacity: 0, filter: 'brightness(0.5) blur(10px) saturate(0.3) contrast(0.6)' });

    if (isMounted) {
      gsap.to(bgCanvasRef.current, { 
        scale: 1, 
        opacity: 0.8, 
        filter: 'brightness(0.4) blur(0.2px) saturate(1) contrast(1)', 
        duration: 2, 
        ease: "power3.out" 
      });
    }
  }, { dependencies: [isMounted] });

  useGSAP(() => {
    if (loadedPercentage === 100 && loadingRef.current) {
      const navbar = document.querySelector('nav');
      gsap.to(loadingRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          if (loadingRef.current) {
            loadingRef.current.style.display = "none";
          }
          if (navbar) {
            gsap.to(navbar, { opacity: 1, pointerEvents: 'auto', duration: 0.8, ease: "power2.out", clearProps: "all" });
          }
          if (onLoaded) onLoaded();
        }
      });
    }
  }, { dependencies: [loadedPercentage] });

  useGSAP(() => {
    if (frameCount === 0) return;
    const frameObj = { frame: 0 };
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#canvas-container",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          renderFrame(Math.round(frameObj.frame));
        }
      }
    });

    tl.to(frameObj, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      duration: 1
    }, 0);

    if (window.innerWidth < 768 && bgCanvasRef.current) {
      tl.to(bgCanvasRef.current, {
        opacity: 0,
        ease: "power2.in",
        duration: 0.2
      }, 0.8);
    }

    if (textCanvasRef.current) {
      tl.to(textCanvasRef.current, {
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.3
      }, 0);
    }

    if (startOverlayRef.current) {
      tl.to(startOverlayRef.current, {
        autoAlpha: 0,
        ease: "power2.inOut",
        duration: 0.4
      }, 0);
    }

    if (leftInfoRef.current) {
      tl.to(leftInfoRef.current, {
        y: 200,
        autoAlpha: 0,
        ease: "power2.in",
        duration: 0.3
      }, 0);
    }

    if (rightInfoRef.current) {
      tl.to(rightInfoRef.current, {
        y: 200,
        autoAlpha: 0,
        ease: "power2.in",
        duration: 0.3
      }, 0);
    }

    if (introRef && introRef.current) {
      gsap.set(introRef.current, { autoAlpha: 0, y: 100 });
      tl.to(introRef.current, {
        autoAlpha: 1,
        y: 0,
        ease: "power2.out",
        duration: 0.2
      }, 1.0);
    }

    const handleResize = () => renderFrame(frameObj.frame);
    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, { dependencies: [renderFrame, introRef, frameCount] });

  useEffect(() => {
    const canvas = textCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const initParticles = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      particlesRef.current = [];

      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return;

      const verticalStretch = 1.3;
      offCtx.scale(1, verticalStretch);

      const isMobileMode = width < 768;
      const isTablet = width < 1024;
      
      const fontSize = isMobileMode 
        ? Math.min(width * 0.1, 50) 
        : isTablet 
          ? Math.min(width * 0.12, 100) 
          : Math.min(width * 0.08, 120);
          
      offCtx.font = `${fontSize}px 'Rubik Iso', system-ui`;
      offCtx.fillStyle = "white";
      offCtx.textBaseline = "middle";

      const textY = isMobileMode 
        ? (height * 0.1) / verticalStretch 
        : (height * 0.35) / verticalStretch; 
        
      offCtx.textAlign = "center";
      
      if (!isTablet) {
        offCtx.fillText("VIBE", width * 0.22, textY);
        offCtx.fillText("CODER", width * 0.78, textY);
      }

      const pixels = offCtx.getImageData(0, 0, width, height).data;
      const step = Math.max(Math.floor(width / 500), 4); // Increased density while keeping some optimization

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          const alpha = pixels[index + 3];

          if (alpha > 128) {
            const startX = x < width / 2 ? x - width - Math.random() * 500 : x + width + Math.random() * 500;
            const startY = y + (Math.random() - 0.5) * 200;

            let cx, cy;
            if (isMobileMode) {
              cx = width * 0.5;
              cy = textY * verticalStretch;
            } else if (isTablet) {
              cx = width * 0.5;
              cy = (y < textY * verticalStretch ? textY - fontSize * 0.6 : textY + fontSize * 0.6) * verticalStretch;
            } else {
              cx = x < width / 2 ? width * 0.22 : width * 0.78;
              cy = textY * verticalStretch;
            }

            particlesRef.current.push({
              x: startX,
              y: startY,
              baseX: x,
              baseY: y,
              cx: cx,
              cy: cy,
              baseSize: Math.random() * 1.5 + 1,
              size: 0,
              density: Math.random() * 15 + 5,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
    };

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");
    // gradient.addColorStop(0.5, "rgba(59, 130, 246, 0.95)");
    // gradient.addColorStop(1, "rgba(45, 212, 191, 0.95)");
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.7)");

    const animateParticles = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = gradient;

      // Performance optimization: Removed expensive shadowBlur

      const scrollProgress = scrollProgressRef.current;
      
      const scrollSpread = scrollProgress * (width * 0.8); 

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        const mouse = mouseRef.current;

        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          let force = (mouse.radius - distance) / mouse.radius;
          let forceX = (dx / distance) * force * p.density * 0.05;
          let forceY = (dy / distance) * force * p.density * 0.05;
          p.vx -= forceX;
          p.vy -= forceY;
        }

        const edgeDist = p.baseX < width / 2 
            ? p.baseX / (width / 2) 
            : (width - p.baseX) / (width / 2);
        
        const waveThreshold = (scrollProgress * 2.5) + 0.15; 
        
        const activation = Math.max(0, Math.min(1, (waveThreshold - edgeDist) * 5));
        
        const scale = 1 + (activation * 1.0); 

        const scaledBaseX = p.cx + (p.baseX - p.cx) * scale;
        const scaledBaseY = p.cy + (p.baseY - p.cy) * scale;

        const directionX = p.baseX < width / 2 ? -1 : 1;
        const targetX = scaledBaseX + (directionX * scrollSpread);
        const targetY = scaledBaseY;

        p.vx += (targetX - p.x) * 0.08; 
        p.vy += (targetY - p.y) * 0.08;

        p.vx *= 0.8;
        p.vy *= 0.8;

        p.x += p.vx;
        p.y += p.vy;

        p.size = p.baseSize * scale;

        ctx.fillRect(p.x, p.y, p.size, p.size);
      }

      animationFrameRef.current = requestAnimationFrame(animateParticles);
    };

    // Explicitly force the font to load before drawing
    document.fonts.load('10px "Rubik Iso"').then(() => {
      initParticles();
      animateParticles();
    }).catch(() => {
      // Fallback if font loading fails
      initParticles();
      animateParticles();
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        containerRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
      if (containerRef.current) {
        containerRef.current.style.setProperty("--mouse-x", `-1000px`);
        containerRef.current.style.setProperty("--mouse-y", `-1000px`);
      }
    };

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        initParticles();
      }, 100);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="canvas-container"
      className="relative w-full bg-black"
      style={{ height: `${(frameCount || 352) * 2}vh` }}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Rubik+Iso&display=swap');
      `}} />

      <div className="sticky top-0 w-full h-screen overflow-hidden bg-black flex items-center justify-center">
        
        {children}

        <canvas 
          ref={bgCanvasRef} 
          className="absolute inset-0 w-full h-full object-cover z-0 mix-blend-screen" 
        />

        {/* Interactive Grayscale Mask overlay (Desktop Only) */}
        <div 
          className="hidden md:block absolute inset-0 w-full h-full z-[5] pointer-events-none"
          style={{
            backdropFilter: "grayscale(100%)",
            WebkitBackdropFilter: "grayscale(100%)",
            WebkitMaskImage: "radial-gradient(circle 350px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), transparent 0%, black 100%)",
            maskImage: "radial-gradient(circle 350px at var(--mouse-x, -1000px) var(--mouse-y, -1000px), transparent 0%, black 100%)"
          }}
        />

        <canvas 
          ref={textCanvasRef}
          className="absolute inset-0 w-full h-full z-10 pointer-events-none drop-shadow-[0_0_15px_rgba(0,0,0,1)]"
        />

        <div 
          ref={loadingRef}
          className="fixed inset-0 flex flex-col items-center justify-center bg-black z-[100] pointer-events-none overflow-hidden"
        >
          {/* Subtle Cyber Grid Background */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_40%,transparent_100%)]" />

          <div className="relative flex items-center justify-center w-full h-full">
            {/* Outline Text Layer */}
            <div 
              className="absolute text-[35vw] md:text-[25vw] font-black tracking-tighter text-transparent select-none leading-none flex items-center justify-center"
              style={{ WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)' }}
            >
              {loadedPercentage}
            </div>

            {/* Glowing Filled Text Layer (Fills from bottom to top) */}
            <div 
              className="absolute text-[35vw] md:text-[25vw] font-black tracking-tighter text-cyan-400 select-none leading-none flex items-center justify-center transition-all duration-300 ease-out"
              style={{ 
                clipPath: `polygon(0 ${100 - loadedPercentage}%, 100% ${100 - loadedPercentage}%, 100% 100%, 0 100%)`,
                textShadow: '0 0 40px rgba(34,211,238,0.4)'
              }}
            >
              {loadedPercentage}
            </div>
          </div>
          
          {/* Bottom Info Bar */}
          <div className="absolute bottom-10 w-full px-8 md:px-16 flex items-center justify-between font-mono">
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-white/30 uppercase animate-pulse">Initializing...</span>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-cyan-400/50 uppercase">VIBE_CODER // SYS</span>
          </div>
        </div>

        {/* Start Overlay Layout */}
        <div ref={startOverlayRef} className="absolute inset-0 w-full h-full z-20 pointer-events-none flex flex-col justify-end pb-48 md:pb-48">
          <div className="w-full px-6 md:px-14 flex flex-col md:flex-row justify-between items-start md:items-end">
            
            {/* Left Side Info */}
            <div ref={leftInfoRef} className="flex flex-col gap-6 pointer-events-auto w-full md:max-w-sm mb-8 md:mb-0">
              <p className="text-xs md:text-sm leading-relaxed text-white/50 uppercase tracking-[0.15em]">
                I am ready for freelancing
                <br />and new projects,
                <br />hackathons.
              </p>
              <a 
                href="#contact" 
                onClick={(e) => {
                  setTimeout(() => {
                    const el = document.getElementById("contactMessage");
                    if(el) el.focus();
                  }, 500);
                }}
                className="group flex items-center gap-2 text-xs tracking-[0.15em] text-cyan-400 hover:bg-cyan-400 hover:text-black uppercase transition-all duration-300 w-fit border border-cyan-400/50 px-5 py-2.5 rounded-full shadow-[0_0_15px_rgba(0,212,255,0.15)]"
              >
                Let's collaborate <ArrowUpRight size={12} className="opacity-60 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Right Side Links */}
            <div ref={rightInfoRef} className="flex flex-wrap md:flex-col items-start md:items-end gap-x-6 gap-y-4 pointer-events-auto w-full md:w-auto mt-8 md:mt-0">
              {[
                { name: "LinkedIn", url: "https://www.linkedin.com/in/govind-chudari/" },
                { name: "GitHub", url: "https://github.com/Govind-Chudari" },
                { name: "LeetCode", url: "https://leetcode.com/u/govindchudari/" },
                { name: "Resume", url: "https://drive.google.com/file/d/17-3Ii9JXsQWA_aeF4-yTzs_bbKTFZue7/view?usp=sharing" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[11px] md:text-xs tracking-[0.15em] text-white/50 hover:text-white uppercase transition-colors duration-300"
                >
                  <span className="inline">{link.name}</span>
                  <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity hidden md:block" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
