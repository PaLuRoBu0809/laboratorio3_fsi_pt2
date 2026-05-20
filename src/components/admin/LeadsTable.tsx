// src/components/admin/LeadsTable.tsx
'use client';

import React, { useState } from 'react';
import { useLeads, Lead } from '@/hooks/useLeads';

export default function LeadsTable() {
  const { leads, loading, error, deleteLead } = useLeads();

  // Estados de la tabla
  const [smartPrompt, setSmartPrompt] = useState('');
  const [selectedPms, setSelectedPms] = useState('Todos');
  const [selectedSize, setSelectedSize] = useState('Todos');

  // Estado para el Modal de Análisis Avanzado
  const [analyzingLead, setAnalyzingLead] = useState<Lead | null>(null);

  // 1. Lógica de Búsqueda Inteligente (Smart Prompt)
  const filteredLeads = leads.filter((lead) => {
    // Simulamos un motor de búsqueda que busca en múltiples campos a la vez
    const searchTerms = smartPrompt.toLowerCase().split(' ');
    const leadString = `${lead.nombre} ${lead.alojamiento} ${lead.email}`.toLowerCase();

    // Verifica si todos los términos del prompt están en la información del lead
    const matchesSmartPrompt = searchTerms.every(term => leadString.includes(term));

    const matchesPms = selectedPms === 'Todos' || lead.pms === selectedPms;
    const matchesSize = selectedSize === 'Todos' || lead.habitaciones === selectedSize;

    return matchesSmartPrompt && matchesPms && matchesSize;
  });

  const uniquePmsList = ['Todos', ...Array.from(new Set(leads.map(l => l.pms).filter(Boolean)))];

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-[#0B132B]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#00EBDA] border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-center">
        <p>⚠️ Error al conectar con SQLite: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-[#0B132B] min-h-screen text-white p-1 relative">

      {/* HEADER INTEGRADO DEL DASHBOARD */}
      <div className="mb-6 border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#00EBDA] bg-clip-text text-transparent">
            OmniBooking CRM Inteligente
          </h1>
          <p className="text-sm text-slate-400 mt-1">Gestión y Análisis Avanzado de Solicitudes</p>
        </div>
        <div className="text-xs font-semibold text-[#00EBDA] bg-[#00EBDA]/10 px-3 py-1.5 rounded-md border border-[#00EBDA]/20 w-fit">
          {leads.length} leads en base de datos
        </div>
      </div>

      {/* PROMPT INTELIGENTE (Buscador con diseño IA) */}
      <div className="bg-gradient-to-r from-indigo-900/40 to-cyan-900/40 p-1 rounded-2xl border border-[#00EBDA]/30 shadow-[0_0_15px_rgba(0,235,218,0.1)]">
        <div className="bg-[#0B132B] rounded-xl p-4 flex items-center gap-3">
          <span className="text-xl">✨</span>
          <input
            type="text"
            placeholder="Pregúntale a tu CRM (Ej: 'hoteles con Cloudbeds' o 'Juan de Villa Roma')..."
            value={smartPrompt}
            onChange={(e) => setSmartPrompt(e.target.value)}
            className="w-full bg-transparent border-none text-white focus:outline-none focus:ring-0 text-sm md:text-base placeholder:text-slate-500"
          />
        </div>
      </div>

      {/* FILTROS TRADICIONALES SECUNDARIOS */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 bg-white/5 p-4 rounded-xl border border-white/10">
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Filtrar por PMS</label>
          <select
            value={selectedPms}
            onChange={(e) => setSelectedPms(e.target.value)}
            className="w-full bg-[#111A36] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00EBDA]"
          >
            {uniquePmsList.map(pms => <option key={pms} value={pms}>{pms}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 uppercase mb-2 tracking-wider">Tamaño de Hotel</label>
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            className="w-full bg-[#111A36] border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-[#00EBDA]"
          >
            <option value="Todos">Todos los tamaños</option>
            <option value="1-10">1-10 habitaciones</option>
            <option value="11-50">11-50 habitaciones</option>
            <option value="51-100">51-100 habitaciones</option>
            <option value="+100">+100 habitaciones</option>
          </select>
        </div>
      </div>

      {/* TABLA DE DATOS */}
      <div className="overflow-x-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold text-slate-300 uppercase tracking-wider">
              <th className="p-4">Establecimiento</th>
              <th className="p-4">Tamaño</th>
              <th className="p-4">Stack Tech</th>
              <th className="p-4">Desafío Principal</th>
              <th className="p-4 text-center">Acciones IA</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-white/5">
            {filteredLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="font-semibold text-white group-hover:text-[#00EBDA] transition-colors">
                    {lead.alojamiento || 'No especificado'}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{lead.nombre}</div>
                </td>

                <td className="p-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {lead.habitaciones} habs
                  </span>
                </td>

                <td className="p-4 font-mono text-xs text-slate-300">
                  <div className="font-medium text-slate-200">{lead.pms || 'Ninguno'}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{lead.reservas_mensuales} res/mes</div>
                </td>

                <td className="p-4 text-slate-300 max-w-xs truncate" title={lead.desafio}>
                  {lead.desafio}
                </td>

                <td className="p-4 text-center whitespace-nowrap space-x-2">
                  <button
                    onClick={() => setAnalyzingLead(lead)}
                    className="text-xs bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded border border-indigo-500/20 transition-colors font-medium"
                  >
                    🧠 Analizar
                  </button>
                  <button
                    onClick={() => {
                      if(confirm('¿Seguro que deseas eliminar este lead?')) deleteLead(lead.id);
                    }}
                    className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2 py-1.5 rounded border border-red-500/20 transition-colors"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}

            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan={5} className="p-12 text-center text-slate-400">
                  Ningún lead coincide con tu consulta inteligente.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL DE ANÁLISIS AVANZADO */}
      {analyzingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B132B]/80 backdrop-blur-sm p-4">
          <div className="bg-[#111A36] border border-[#00EBDA]/30 rounded-2xl p-6 max-w-2xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">

            {/* Cabecera del Modal */}
            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
              <div>
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>📊</span> Análisis Estratégico: {analyzingLead.alojamiento}
                </h3>
                <p className="text-sm text-slate-400 mt-1">Contacto: {analyzingLead.nombre} ({analyzingLead.email})</p>
              </div>
              <button
                onClick={() => setAnalyzingLead(null)}
                className="text-slate-400 hover:text-white text-xl p-1"
              >
                ✕
              </button>
            </div>

            {/* Cuerpo del Reporte */}
            <div className="space-y-6 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                  <h4 className="font-semibold text-[#00EBDA] mb-1">Perfil Operativo</h4>
                  <ul className="text-slate-300 space-y-1 mt-2">
                    <li>• Volumen: <span className="text-white">{analyzingLead.reservas_mensuales} reservas/mes</span></li>
                    <li>• Capacidad: <span className="text-white">{analyzingLead.habitaciones} habitaciones</span></li>
                    <li>• Sistema Actual: <span className="text-white">{analyzingLead.pms}</span></li>
                  </ul>
                </div>
                <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
                  <h4 className="font-semibold text-red-400 mb-1">Dolor Detectado</h4>
                  <p className="text-slate-300 mt-2 font-medium">"{analyzingLead.desafio}"</p>
                </div>
              </div>

              <div className="bg-indigo-500/10 p-5 rounded-xl border border-indigo-500/20">
                <h4 className="font-semibold text-indigo-300 flex items-center gap-2 text-base">
                  <span>🤖</span> Recomendación del Motor de IA
                </h4>
                <p className="text-slate-300 mt-3 leading-relaxed">
                  Basado en un volumen de <strong>{analyzingLead.reservas_mensuales} reservas mensuales</strong> y el uso de <strong>{analyzingLead.pms || 'ningún PMS'}</strong>, el principal cuello de botella de {analyzingLead.alojamiento} es <strong>{analyzingLead.desafio.toLowerCase()}</strong>.
                </p>
                <div className="mt-4 space-y-2">
                  <p className="font-semibold text-white">Estrategia de Venta (Pitch):</p>
                  <ul className="list-disc pl-5 text-slate-300 space-y-1">
                    {analyzingLead.desafio.includes('horario') && (
                      <li>Enfocar la propuesta de valor en <strong>automatización de respuestas 24/7</strong> con IA conversacional para capturar reservas nocturnas.</li>
                    )}
                    {analyzingLead.desafio.includes('overbooking') && (
                      <li>Resaltar la urgencia de integrar un <strong>Channel Manager robusto</strong> bidireccional conectado a su PMS {analyzingLead.pms}.</li>
                    )}
                    {analyzingLead.pms === 'Ninguno' && (
                      <li>El cliente está en etapa de digitalización temprana. Ofrecer un <strong>paquete "Todo en Uno"</strong> (PMS + Motor de reservas) muy fácil de usar.</li>
                    )}
                    <li>Demostrar ROI calculado: Cómo recuperar X horas semanales del equipo.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer del Modal */}
            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => setAnalyzingLead(null)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors text-sm font-medium"
              >
                Cerrar Reporte
              </button>
              <button className="px-4 py-2 bg-[#00EBDA] hover:bg-[#00EBDA]/80 text-[#0B132B] rounded-lg transition-colors text-sm font-bold shadow-[0_0_10px_rgba(0,235,218,0.4)]">
                Exportar PDF
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
