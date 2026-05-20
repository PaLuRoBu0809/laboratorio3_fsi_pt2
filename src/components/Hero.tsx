'use client';

import React, { useRef } from 'react';
import { ArrowRight, ShieldCheck, Headset, Zap } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from('.hero-glow', {
      scale: 0.5,
      opacity: 0,
      duration: 2,
      ease: 'power3.out',
    })
    .from('.hero-badge', { y: 30, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' }, '-=1.5')
    .from('.hero-title', { y: 50, opacity: 0, duration: 1, ease: 'power4.out', stagger: 0.2 }, '-=1')
    .from('.hero-desc', { y: 30, opacity: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
    .from('.hero-cta', { scale: 0.9, opacity: 0, duration: 0.8, ease: 'back.out(1.5)' }, '-=0.6');

    gsap.from('.feature-card', {
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 85%',
      },
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.to('.hero-glow', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
      y: 200,
    });

  }, { scope: containerRef });

  const features = [
    { icon: Headset, title: 'Atención 24/7', desc: 'Sin horarios comerciales. Cubrimos todas las franjas.', colorClass: 'text-brand-cyan bg-brand-cyan/10' },
    { icon: ShieldCheck, title: '0 Errores', desc: 'Olvídate de las sobreventas y el overbooking.', colorClass: 'text-brand-mint bg-brand-mint/10' },
    { icon: Zap, title: 'Integración Total', desc: 'Conectamos con Guesty, Cloudbeds, Mews y más.', colorClass: 'text-blue-400 bg-blue-500/10' }
  ];

  return (
    <section ref={containerRef} className="relative pt-40 pb-24 overflow-hidden perspective-1000">
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-b from-brand-cyan/20 to-brand-mint/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-brand-cyan mb-8 backdrop-blur-md shadow-[0_5px_20px_rgba(0,0,0,0.2)]">
          <Zap size={16} />
          <span className="text-sm font-medium tracking-wide">Atención de reservas automatizada y humana</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-black text-white tracking-tight mb-8 leading-none drop-shadow-2xl">
          <span className="hero-title block">Nosotros hacemos</span>
          <span className="hero-title block text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-mint">
            el trabajo duro.
          </span>
        </h1>
        
        <p className="hero-desc max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed font-light">
          Reduce el tiempo de respuesta, elimina errores de overbooking y delega tu operativa B2B a la mejor tecnología combinada con expertos humanos 24/7.
        </p>
        
        <div className="hero-cta flex justify-center mb-24">
          <a href="#evaluacion" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#0b1120] font-bold rounded-2xl transition-all duration-300 text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transform hover:-translate-y-1 hover:scale-105">
            Quiero saber si aplico 
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-12" id="beneficios">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card flex flex-col items-center gap-4 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-white/10 transition-all duration-500 group transform hover:-translate-y-2">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.1)] group-hover:scale-110 transition-transform duration-500 ${feature.colorClass}`}>
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl text-white font-bold tracking-wide">{feature.title}</h3>
              <p className="text-gray-400 text-center font-light leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
