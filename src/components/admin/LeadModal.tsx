'use client';

import { useState } from 'react';
import { Lead } from '@/hooks/useLeads';
import { X, Save, User, Mail, Phone, Building2, BedDouble, Monitor, BarChart3, AlertCircle } from 'lucide-react';

const PMS_OPTIONS = ['Cloudbeds', 'Guesty', 'Mews', 'SiteMinder', 'Opera', 'Ninguno', 'Otro'];
const HABITACIONES_OPTIONS = ['1-10', '11-50', '51-100', '+100'];
const RESERVAS_OPTIONS = ['Menos de 50', '50-200', '200-500', 'Más de 500'];
const DESAFIO_OPTIONS = [
  'Demasiado tiempo respondiendo mensajes',
  'Errores de sobreventa/overbooking',
  'Atención fuera del horario comercial',
  'Falta de personal multilingüe',
  'Otro',
];

type FormData = Omit<Lead, 'id' | 'created_at'>;

interface LeadModalProps {
  lead?: Lead | null;
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
}

export default function LeadModal({ lead, onClose, onSave }: LeadModalProps) {
  const isEditing = !!lead;
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [form, setForm] = useState<FormData>({
    nombre: lead?.nombre ?? '',
    email: lead?.email ?? '',
    telefono: lead?.telefono ?? '',
    alojamiento: lead?.alojamiento ?? '',
    habitaciones: lead?.habitaciones ?? '1-10',
    pms: lead?.pms ?? 'Ninguno',
    reservas_mensuales: lead?.reservas_mensuales ?? 'Menos de 50',
    desafio: lead?.desafio ?? DESAFIO_OPTIONS[0],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } catch (err: unknown) {
      setFormError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-glass">
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-icon-wrap">
              <User size={18} />
            </div>
            <h2 className="modal-title">
              {isEditing ? 'Editar Lead' : 'Nuevo Lead'}
            </h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            {/* Nombre */}
            <div className="field-group">
              <label className="field-label">
                <User size={13} /> Nombre completo
              </label>
              <input name="nombre" value={form.nombre} onChange={handleChange}
                className="field-input" placeholder="Ej: Carlos Mendoza" required />
            </div>

            {/* Email */}
            <div className="field-group">
              <label className="field-label">
                <Mail size={13} /> Correo electrónico
              </label>
              <input name="email" type="email" value={form.email} onChange={handleChange}
                className="field-input" placeholder="correo@hotel.com" required />
            </div>

            {/* Teléfono */}
            <div className="field-group">
              <label className="field-label">
                <Phone size={13} /> Teléfono
              </label>
              <input name="telefono" value={form.telefono} onChange={handleChange}
                className="field-input" placeholder="+52 55 0000 0000" />
            </div>

            {/* Alojamiento */}
            <div className="field-group">
              <label className="field-label">
                <Building2 size={13} /> Nombre del alojamiento
              </label>
              <input name="alojamiento" value={form.alojamiento} onChange={handleChange}
                className="field-input" placeholder="Ej: Hotel Bahía Azul" />
            </div>

            {/* Habitaciones */}
            <div className="field-group">
              <label className="field-label">
                <BedDouble size={13} /> Habitaciones
              </label>
              <select name="habitaciones" value={form.habitaciones} onChange={handleChange}
                className="field-select">
                {HABITACIONES_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* PMS */}
            <div className="field-group">
              <label className="field-label">
                <Monitor size={13} /> PMS / Channel Manager
              </label>
              <select name="pms" value={form.pms} onChange={handleChange}
                className="field-select">
                {PMS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* Reservas */}
            <div className="field-group">
              <label className="field-label">
                <BarChart3 size={13} /> Reservas mensuales
              </label>
              <select name="reservas_mensuales" value={form.reservas_mensuales} onChange={handleChange}
                className="field-select">
                {RESERVAS_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* Desafío */}
            <div className="field-group">
              <label className="field-label">
                <AlertCircle size={13} /> Principal desafío
              </label>
              <select name="desafio" value={form.desafio} onChange={handleChange}
                className="field-select">
                {DESAFIO_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>

          {formError && (
            <div className="form-error">
              <AlertCircle size={14} /> {formError}
            </div>
          )}

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="btn-save">
              <Save size={15} />
              {saving ? 'Guardando...' : isEditing ? 'Actualizar' : 'Crear Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
