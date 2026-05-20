---
name: disenador-web-premium
description: Diseña landing pages modernas, futuristas y oscuras utilizando Next.js y Tailwind CSS, con una estética espacial de cielo estrellado y arcos de luz de neón.
---

# Diseñador Web Premium - Landing Page Espacial

## Vista General
Esta habilidad capacita al agente para actuar como un diseñador e ingeniero frontend experto en la creación de interfaces premium y landing pages con **Next.js** y **Tailwind CSS**. La habilidad está optimizada para generar diseños altamente personalizados, responsivos y con una estética visualmente impactante ("premium, dark & futuristic") que evita los patrones genéricos de IA, incorporando fondos estrellados, arcos de luz difusa y tipografías modernas.

## Cuándo Usar
Se activa cuando el usuario requiere:
- Diseñar o maquetar una landing page con estética espacial, futurista o de ciencia ficción.
- Crear componentes visualmente impresionantes utilizando Next.js, React y Tailwind CSS.
- Implementar efectos avanzados de CSS/Tailwind como luces de neón, gradientes de texto, desenfoques (blurs) y fondos dinámicos.

## Instrucciones de Diseño e Implementación

Para asegurar una calidad excepcional y un diseño vanguardista, el agente debe seguir las siguientes pautas técnicas y estéticas:

### 1. Sistema de Diseño y Paleta de Colores
- **Fondo Principal**: Fondo oscuro profundo (`#030014` o `#070518`) combinado con un fondo estrellado de múltiples capas y opacidades.
- **Tonos de Acento**: 
  - Púrpura Neón: `from-purple-600 to-indigo-600` / `rgba(147, 51, 234, 0.5)`
  - Azul Eléctrico: `from-blue-500 to-cyan-500` / `rgba(59, 130, 246, 0.4)`
- **Efectos de Brillo**: Uso de contenedores con `backdrop-blur-xl` y capas con gradientes radiales difusos para simular arcos de luz cósmica.

### 2. Estructura de Componentes

#### A. Cabecera (Header)
- **Alineación**: `flex justify-between items-center px-6 md:px-12 py-5 backdrop-blur-md sticky top-0 z-50 border-b border-white/5`.
- **Logotipo**: Texto estilizado al lado de un icono de estrella brillante (`sparkles` de Heroicons o SVG personalizado).
- **Navegación**: Menú centrado con enlaces interactivos en hover (`transition-colors duration-300 hover:text-purple-400`).
- **Botón de Acción**: Botón a la derecha con borde semi-transparente y efecto hover de brillo suave.

#### B. Sección Hero Principal (Sección de Impacto)
- **Arco de Luz**: Un gradiente semicircular difuso (`radial-gradient` o un `div` absoluto con `bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-transparent blur-[120px] rounded-full`) colocado detrás del título principal para enmarcar la sección.
- **Título**: Tipografía grande y audaz (`text-5xl md:text-7xl font-extrabold tracking-tight`) con un degradado de color púrpura y azul neón de alta fidelidad (`bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400`).
- **Subtítulo/Párrafo**: Texto explicativo limpio con tipografía Inter o similar, opacidad suave (`text-gray-400 max-w-2xl mx-auto`).
- **Botones CTA**:
  - *Botón Principal*: Relleno en púrpura neón vibrante con sombras de luz (`shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.7)]`).
  - *Botón Secundario*: Con borde (outline) estilizado y efecto de color en hover.

#### C. Grilla de Socios (Partners Section)
- **Layout**: Sección inferior con fondo súper oscuro y una grilla fluida (`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-60 hover:opacity-100 transition-opacity duration-500`).
- **Logotipos**: Representados en blanco monocromático puro con opacidades reducidas (`text-white/40 hover:text-white/90`).

---

## Ejemplo de Código (Next.js + Tailwind CSS)

El agente puede usar la siguiente plantilla como punto de partida para implementar el diseño solicitado:

```tsx
import React from 'react';

export default function SpaceLandingPage() {
  return (
    <div className="relative min-h-screen bg-[#030014] text-white overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* Fondo estrellado simulado mediante gradientes y partículas */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      
      {/* Estrellas decorativas */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iOTAiIHI9IjEuNSIgZmlsbD0iI2ZmZiIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjMwIiByPSIxIiBmaWxsPSIjZmZmIi8+PGNpcmNsZSBjeD0iMTEwIiBjeT0iMTYwIiByPSIyIiBmaWxsPSIjZmZmIi8+PC9zdmc+')] bg-repeat" />

      {/* Gran Arco de Luz Degradada */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-purple-600/30 to-blue-500/20 rounded-full blur-[140px] z-0 pointer-events-none" />

      {/* Cabecera / Header */}
      <header className="relative z-10 flex justify-between items-center px-6 md:px-16 py-6 border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          {/* Icono de Estrella */}
          <svg className="w-6 h-6 text-purple-400 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.196-.612 1.056-.612 1.253 0l1.597 4.982a1.242 1.242 0 001.18.847h5.243c.645 0 .914.827.392 1.206l-4.242 3.08a1.242 1.242 0 00-.451 1.39l1.598 4.982c.196.612-.452 1.08-.976.7L15.65 17.65a1.242 1.242 0 00-1.46 0l-4.242 3.08c-.524.38-1.172-.088-.976-.7l1.598-4.982a1.242 1.242 0 00-.451-1.39l-4.242-3.08c-.522-.379-.253-1.206.392-1.206h5.243a1.242 1.242 0 001.18-.847l1.597-4.982z" />
          </svg>
          <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">STELLAR</span>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition-colors">Características</a>
          <a href="#about" className="hover:text-white transition-colors">Acerca de</a>
          <a href="#pricing" className="hover:text-white transition-colors">Precios</a>
        </nav>

        <button className="px-5 py-2 text-xs font-semibold tracking-wider text-purple-300 border border-purple-500/30 rounded-full hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300">
          Iniciar Sesión
        </button>
      </header>

      {/* Área Principal (Hero Section) */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-32 text-center">
        {/* Arco visual sutil de soporte sobre el título */}
        <div className="mx-auto w-32 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent mb-8" />
        
        <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none">
          Diseñamos el <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-500 to-blue-400 drop-shadow-[0_2px_30px_rgba(168,85,247,0.3)]">
            Futuro Digital
          </span>
        </h1>

        <p className="mt-8 text-lg md:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
          Creamos experiencias inmersivas que cautivan desde el primer instante. Sin plantillas comunes, sin apariencias automáticas. Pura innovación interactiva a tu alcance.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-purple-600 text-white font-semibold rounded-xl shadow-[0_0_25px_rgba(147,51,234,0.4)] hover:bg-purple-700 hover:shadow-[0_0_35px_rgba(147,51,234,0.6)] transition-all duration-300">
            Comenzar Proyecto
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 text-gray-300 font-semibold rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            Ver Portafolio
          </button>
        </div>
      </main>

      {/* Sección Inferior: Grilla de Logos de Empresas */}
      <footer className="relative z-10 border-t border-white/5 bg-[#010008]/80 py-16 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-widest text-purple-400/60 font-semibold mb-8">Nuestros Socios Globales</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-50">
            {/* Logos representativos */}
            <span className="text-lg font-bold tracking-widest text-white hover:opacity-100 transition-opacity">NEXUS</span>
            <span className="text-lg font-bold tracking-widest text-white hover:opacity-100 transition-opacity">APEX</span>
            <span className="text-lg font-bold tracking-widest text-white hover:opacity-100 transition-opacity">ORBIT</span>
            <span className="text-lg font-bold tracking-widest text-white hover:opacity-100 transition-opacity">VERTEX</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
```
