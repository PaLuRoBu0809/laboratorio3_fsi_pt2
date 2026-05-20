'use client';

import React, { useRef } from 'react';
import { Building2 } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
    });
  }, { scope: headerRef });

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-all duration-300 backdrop-blur-[20px] bg-[#0b1120]/40 border-b border-white/5 shadow-[0_10px_40px_rgba(0,0,0,0.2)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan to-brand-mint flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-500 transform group-hover:scale-110">
              <Building2 size={24} />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Omni<span className="text-brand-cyan">Booking</span></span>
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#beneficios" className="text-gray-300 hover:text-white hover:-translate-y-1 transition-transform duration-300">Beneficios</a>
            <a href="#evaluacion" className="text-gray-300 hover:text-white hover:-translate-y-1 transition-transform duration-300">Evaluación</a>
          </nav>
          <div className="flex items-center">
            <a 
              href="#evaluacion" 
              className="px-6 py-2.5 bg-white/10 text-white border border-white/20 font-semibold rounded-lg hover:bg-brand-cyan hover:text-[#0b1120] hover:border-brand-cyan transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transform hover:scale-105"
            >
              Comenzar ahora
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
