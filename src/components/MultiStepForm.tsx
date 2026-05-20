'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    tamaño: '',
    pms: '',
    volumen: '',
    dolor: '',
    nombre: '',
    email: '',
    telefono: '',
    alojamiento: ''
  });
  
  const totalSteps = 6; // 5 questions + 1 success step
  
  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
  
  const handleOptionClick = (field: string, value: string) => {
    updateForm(field, value);
    setTimeout(() => nextStep(), 300);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    nextStep();
  };

  const tamaños = ["1-10", "11-50", "51-100", "+100"];
  const pmsList = ["Cloudbeds", "Guesty", "Mews", "SiteMinder", "Ninguno", "Otro"];
  const dolores = [
    "Demasiado tiempo respondiendo mensajes",
    "Errores de sobreventa/overbooking",
    "Atención fuera del horario comercial",
    "Falta de personal multilingüe",
    "Otro"
  ];

  return (
    <section id="evaluacion" className="py-32 relative perspective-1000">
      {/* Elemento decorativo 3D de fondo */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[150px] pointer-events-none -z-10" />
      
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 mb-6 drop-shadow-lg">Descubre si hacemos "Match"</h2>
          <p className="text-lg text-gray-400 font-light">Responde unas breves preguntas para saber cómo podemos escalar tu operación.</p>
        </div>

        <div className="bg-[#0b1120]/60 backdrop-blur-[30px] border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden transform transition-all duration-500 hover:shadow-[0_40px_100px_rgba(6,182,212,0.15)]">
          {step < totalSteps && (
            <div className="absolute top-0 left-0 w-full h-1.5 bg-white/5">
              <motion.div 
                className="h-full bg-gradient-to-r from-brand-cyan to-brand-mint shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          )}

          <div className="min-h-[350px] relative">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">¿Cuántas habitaciones o propiedades gestionas actualmente?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tamaños.map(t => (
                      <button key={t} onClick={() => handleOptionClick('tamaño', t)} className={`p-4 rounded-xl border text-left transition-all ${formData.tamaño === t ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan' : 'border-white/10 text-gray-300 hover:border-brand-cyan/50 hover:bg-white/5'}`}>{t}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">¿Qué PMS y/o Channel Manager utilizas actualmente?</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pmsList.map(pms => (
                      <button key={pms} onClick={() => handleOptionClick('pms', pms)} className={`p-4 rounded-xl border text-left transition-all ${formData.pms === pms ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan' : 'border-white/10 text-gray-300 hover:border-brand-cyan/50 hover:bg-white/5'}`}>{pms}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">¿Cuál es tu volumen promedio de reservas mensuales?</h3>
                  <input type="text" placeholder="Ej. 150 reservas..." value={formData.volumen} onChange={(e) => updateForm('volumen', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan" />
                  <button onClick={nextStep} className="w-full py-4 bg-brand-cyan text-brand-navy font-bold rounded-xl mt-4">Continuar</button>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">¿Cuál es tu mayor desafío actual con la atención de reservas?</h3>
                  <div className="flex flex-col gap-3">
                    {dolores.map(dolor => (
                      <button key={dolor} onClick={() => handleOptionClick('dolor', dolor)} className={`p-4 rounded-xl border text-left transition-all ${formData.dolor === dolor ? 'border-brand-cyan bg-brand-cyan/10 text-brand-cyan' : 'border-white/10 text-gray-300 hover:border-brand-cyan/50 hover:bg-white/5'}`}>{dolor}</button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div key="step5" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Casi listo. ¿Dónde te contactamos?</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input required type="text" placeholder="Nombre completo" value={formData.nombre} onChange={e => updateForm('nombre', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none" />
                    <input required type="email" placeholder="Correo electrónico corporativo" value={formData.email} onChange={e => updateForm('email', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none" />
                    <input required type="tel" placeholder="Teléfono" value={formData.telefono} onChange={e => updateForm('telefono', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none" />
                    <input required type="text" placeholder="Nombre del alojamiento" value={formData.alojamiento} onChange={e => updateForm('alojamiento', e.target.value)} className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan outline-none" />
                    
                    <button type="submit" className="w-full py-4 bg-brand-cyan text-brand-navy font-bold rounded-xl mt-6 hover:bg-brand-mint transition-colors flex items-center justify-center gap-2">
                      Finalizar Evaluación <ArrowRight size={18} />
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 6 && (
                <motion.div key="step6" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center justify-center h-full space-y-6 text-center py-10">
                  <div className="w-20 h-20 bg-brand-mint/20 rounded-full flex items-center justify-center text-brand-mint">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">¡Evaluación Completada!</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">Gracias {formData.nombre}. Hemos recibido tus datos y nuestro equipo experto analizará tu caso. Te contactaremos en menos de 24 horas.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {step > 1 && step < totalSteps && (
            <div className="mt-8 flex justify-between items-center border-t border-white/10 pt-6">
              <button onClick={prevStep} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Volver
              </button>
              <span className="text-sm text-gray-500">Paso {step} de {totalSteps - 1}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
