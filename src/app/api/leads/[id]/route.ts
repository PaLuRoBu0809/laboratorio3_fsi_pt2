import { db } from '@/lib/db';
import { NextRequest } from 'next/server';

type RouteContext = { params: Promise<{ id: string }> };

// GET: Obtener un lead por ID
export async function GET(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    const lead = db.prepare('SELECT * FROM leads WHERE id = ?').get(id);
    if (!lead) {
      return Response.json({ error: 'Lead no encontrado' }, { status: 404 });
    }
    return Response.json({ data: lead });
  } catch (error) {
    console.error('[API/leads/:id GET]', error);
    return Response.json({ error: 'Error al obtener el lead' }, { status: 500 });
  }
}

// PUT: Actualizar un lead
export async function PUT(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { nombre, email, telefono, alojamiento, habitaciones, pms, reservas_mensuales, desafio } = body;

    if (!nombre || !email) {
      return Response.json({ error: 'Nombre y email son obligatorios' }, { status: 400 });
    }

    const existing = db.prepare('SELECT id FROM leads WHERE id = ?').get(id);
    if (!existing) {
      return Response.json({ error: 'Lead no encontrado' }, { status: 404 });
    }

    db.prepare(`
      UPDATE leads
      SET nombre = ?, email = ?, telefono = ?, alojamiento = ?,
          habitaciones = ?, pms = ?, reservas_mensuales = ?, desafio = ?
      WHERE id = ?
    `).run(nombre, email, telefono, alojamiento, habitaciones, pms, reservas_mensuales, desafio, id);

    return Response.json({ success: true });
  } catch (error) {
    console.error('[API/leads/:id PUT]', error);
    return Response.json({ error: 'Error al actualizar el lead' }, { status: 500 });
  }
}

// DELETE: Eliminar un lead
export async function DELETE(_req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    const existing = db.prepare('SELECT id FROM leads WHERE id = ?').get(id);
    if (!existing) {
      return Response.json({ error: 'Lead no encontrado' }, { status: 404 });
    }

    db.prepare('DELETE FROM leads WHERE id = ?').run(id);
    return Response.json({ success: true });
  } catch (error) {
    console.error('[API/leads/:id DELETE]', error);
    return Response.json({ error: 'Error al eliminar el lead' }, { status: 500 });
  }
}
