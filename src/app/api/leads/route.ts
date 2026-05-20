import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

// GET: Listar todos los leads
export async function GET() {
  try {
    const leads = db.prepare('SELECT * FROM leads ORDER BY created_at DESC').all();
    return Response.json({ data: leads });
  } catch (error) {
    console.error('[API/leads GET]', error);
    return Response.json({ error: 'Error al obtener los leads' }, { status: 500 });
  }
}

// POST: Crear nuevo lead
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, telefono, alojamiento, habitaciones, pms, reservas_mensuales, desafio } = body;

    if (!nombre || !email) {
      return Response.json({ error: 'Nombre y email son obligatorios' }, { status: 400 });
    }

    const stmt = db.prepare(`
      INSERT INTO leads (nombre, email, telefono, alojamiento, habitaciones, pms, reservas_mensuales, desafio)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(nombre, email, telefono, alojamiento, habitaciones, pms, reservas_mensuales, desafio);

    return Response.json({ success: true, id: result.lastInsertRowid }, { status: 201 });
  } catch (error) {
    console.error('[API/leads POST]', error);
    return Response.json({ error: 'Error al crear el lead' }, { status: 500 });
  }
}
