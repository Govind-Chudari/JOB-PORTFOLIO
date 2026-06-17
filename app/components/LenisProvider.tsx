"use client";

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Force scroll to top on reload to fix Canvas stuck on last frame
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.5, // slightly slower for premium feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerObj = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerObj);
    gsap.ticker.lagSmoothing(0);

    // 2. Intercept anchor links for smooth scrolling via Lenis
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          if (href === '#') {
            lenis.scrollTo(0, { duration: 1.5 });
          } else {
            lenis.scrollTo(href, { duration: 1.5 });
          }
        }
      }
    };

    document.documentElement.addEventListener('click', handleHashClick);

    return () => {
      document.documentElement.removeEventListener('click', handleHashClick);
      gsap.ticker.remove(tickerObj);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
