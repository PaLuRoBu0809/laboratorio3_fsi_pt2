'use client';

import { useState, useEffect, useCallback } from 'react';

export interface Lead {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  alojamiento: string;
  habitaciones: string;
  pms: string;
  reservas_mensuales: string;
  desafio: string;
  created_at: string;
}

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/leads');
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setLeads(json.data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  }, []);

  const createLead = async (data: Omit<Lead, 'id' | 'created_at'>) => {
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error);
    }
    await fetchLeads();
  };

  const updateLead = async (id: number, data: Omit<Lead, 'id' | 'created_at'>) => {
    const res = await fetch(`/api/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error);
    }
    await fetchLeads();
  };

  const deleteLead = async (id: number) => {
    const res = await fetch(`/api/leads/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.error);
    }
    await fetchLeads();
  };

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return { leads, loading, error, fetchLeads, createLead, updateLead, deleteLead };
}
