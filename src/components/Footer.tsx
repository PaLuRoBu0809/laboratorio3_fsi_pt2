import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#050810] py-12 border-t border-white/5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white tracking-tight">Omni<span className="text-brand-cyan">Booking</span></span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} OmniBooking. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-white text-sm">Términos</a>
            <a href="#" className="text-gray-500 hover:text-white text-sm">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
