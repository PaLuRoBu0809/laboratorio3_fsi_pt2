/**
 * Script de seed: inserta 20 leads de prueba en la BD SQLite.
 * Ejecutar: node scripts/seed.mjs
 */
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_DIR = path.join(__dirname, '..', 'data');
const DB_PATH = path.join(DB_DIR, 'omnibooking.db');

if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// Asegurar que la tabla existe
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    telefono TEXT,
    alojamiento TEXT,
    habitaciones TEXT,
    pms TEXT,
    reservas_mensuales TEXT,
    desafio TEXT,
    created_at TEXT DEFAULT (datetime('now', 'localtime'))
  );
`);

const pmsOptions = ['Cloudbeds', 'Guesty', 'Mews', 'SiteMinder', 'Opera', 'Ninguno'];
const habitacionesOptions = ['1-10', '11-50', '51-100', '+100'];
const reservasOptions = ['Menos de 50', '50-200', '200-500', 'Más de 500'];
const desafioOptions = [
  'Demasiado tiempo respondiendo mensajes',
  'Errores de sobreventa/overbooking',
  'Atención fuera del horario comercial',
  'Falta de personal multilingüe',
  'Otro',
];

const seedData = [
  { nombre: 'Carlos Mendoza', email: 'cmendoza@hotelbahia.com', telefono: '+52 55 1234 5678', alojamiento: 'Hotel Bahía Azul', habitaciones: '51-100', pms: 'Cloudbeds', reservas_mensuales: '200-500', desafio: 'Atención fuera del horario comercial' },
  { nombre: 'Laura Vásquez', email: 'lvasquez@posadaencanto.mx', telefono: '+52 33 9876 5432', alojamiento: 'Posada El Encanto', habitaciones: '11-50', pms: 'Mews', reservas_mensuales: '50-200', desafio: 'Demasiado tiempo respondiendo mensajes' },
  { nombre: 'Andrés Romero', email: 'aromero@haciendacorona.com', telefono: '+57 300 456 7890', alojamiento: 'Hacienda La Corona', habitaciones: '+100', pms: 'Opera', reservas_mensuales: 'Más de 500', desafio: 'Falta de personal multilingüe' },
  { nombre: 'Sofía Torres', email: 'storres@boutiquepalma.es', telefono: '+34 91 234 5678', alojamiento: 'Boutique Hotel Palma', habitaciones: '1-10', pms: 'Ninguno', reservas_mensuales: 'Menos de 50', desafio: 'Errores de sobreventa/overbooking' },
  { nombre: 'Miguel Ángel Fuentes', email: 'mfuentes@grandecoral.com', telefono: '+52 984 567 8901', alojamiento: 'Gran Hotel Coral', habitaciones: '+100', pms: 'SiteMinder', reservas_mensuales: 'Más de 500', desafio: 'Atención fuera del horario comercial' },
  { nombre: 'Valentina Cruz', email: 'vcruz@casacoral.co', telefono: '+57 311 234 5678', alojamiento: 'Casa Coral', habitaciones: '11-50', pms: 'Guesty', reservas_mensuales: '50-200', desafio: 'Demasiado tiempo respondiendo mensajes' },
  { nombre: 'Roberto Jiménez', email: 'rjimenez@monteverdevillas.com', telefono: '+506 8765 4321', alojamiento: 'Monteverde Villas', habitaciones: '51-100', pms: 'Cloudbeds', reservas_mensuales: '200-500', desafio: 'Otro' },
  { nombre: 'Isabella Moreno', email: 'imoreno@palacioreal.mx', telefono: '+52 81 4567 8901', alojamiento: 'Palacio Real Hotel', habitaciones: '+100', pms: 'Opera', reservas_mensuales: 'Más de 500', desafio: 'Falta de personal multilingüe' },
  { nombre: 'Diego Herrera', email: 'dherrera@altagracia.com', telefono: '+1 305 456 7890', alojamiento: 'Hotel Alta Gracia', habitaciones: '11-50', pms: 'Mews', reservas_mensuales: '50-200', desafio: 'Errores de sobreventa/overbooking' },
  { nombre: 'Camila Restrepo', email: 'crestrepo@plazacenter.co', telefono: '+57 316 789 0123', alojamiento: 'Plaza Center Medellín', habitaciones: '51-100', pms: 'SiteMinder', reservas_mensuales: '200-500', desafio: 'Atención fuera del horario comercial' },
  { nombre: 'Francisco Navarro', email: 'fnavarro@costabella.es', telefono: '+34 95 345 6789', alojamiento: 'Costa Bella Resorts', habitaciones: '+100', pms: 'Guesty', reservas_mensuales: 'Más de 500', desafio: 'Demasiado tiempo respondiendo mensajes' },
  { nombre: 'Mariana López', email: 'mlopez@suiteselite.mx', telefono: '+52 55 8901 2345', alojamiento: 'Suites Elite CDMX', habitaciones: '11-50', pms: 'Cloudbeds', reservas_mensuales: '50-200', desafio: 'Otro' },
  { nombre: 'Sebastián Ortega', email: 'sortega@villasluzmar.com', telefono: '+52 662 901 2345', alojamiento: 'Villas Luz de Mar', habitaciones: '1-10', pms: 'Ninguno', reservas_mensuales: 'Menos de 50', desafio: 'Errores de sobreventa/overbooking' },
  { nombre: 'Natalia Vargas', email: 'nvargas@anfiteatro.com', telefono: '+56 9 4567 8901', alojamiento: 'Hotel Anfiteatro', habitaciones: '51-100', pms: 'Mews', reservas_mensuales: '200-500', desafio: 'Falta de personal multilingüe' },
  { nombre: 'Tomás Gutiérrez', email: 'tgutierrez@ecoparaiso.cr', telefono: '+506 2345 6789', alojamiento: 'Eco Paraíso Lodge', habitaciones: '11-50', pms: 'SiteMinder', reservas_mensuales: '50-200', desafio: 'Atención fuera del horario comercial' },
  { nombre: 'Alejandra Ríos', email: 'arios@beachclub.pe', telefono: '+51 1 567 8901', alojamiento: 'Beach Club Miraflores', habitaciones: '+100', pms: 'Opera', reservas_mensuales: 'Más de 500', desafio: 'Demasiado tiempo respondiendo mensajes' },
  { nombre: 'Julián Castillo', email: 'jcastillo@plazamayer.com', telefono: '+52 449 678 9012', alojamiento: 'Hotel Plaza Mayor', habitaciones: '51-100', pms: 'Guesty', reservas_mensuales: '200-500', desafio: 'Otro' },
  { nombre: 'Valeria Medina', email: 'vmedina@casaselva.com', telefono: '+52 993 789 0123', alojamiento: 'Casa en la Selva', habitaciones: '1-10', pms: 'Ninguno', reservas_mensuales: 'Menos de 50', desafio: 'Errores de sobreventa/overbooking' },
  { nombre: 'Pablo Sánchez', email: 'psanchez@riogrande.ar', telefono: '+54 11 8901 2345', alojamiento: 'Río Grande Suites', habitaciones: '11-50', pms: 'Cloudbeds', reservas_mensuales: '50-200', desafio: 'Falta de personal multilingüe' },
  { nombre: 'Lucía Fernández', email: 'lfernandez@islabella.do', telefono: '+1 809 012 3456', alojamiento: 'Isla Bella Resort', habitaciones: '+100', pms: 'SiteMinder', reservas_mensuales: 'Más de 500', desafio: 'Atención fuera del horario comercial' },
];

const stmt = db.prepare(`
  INSERT INTO leads (nombre, email, telefono, alojamiento, habitaciones, pms, reservas_mensuales, desafio)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)
`);

const insertMany = db.transaction((leads) => {
  let count = 0;
  for (const lead of leads) {
    stmt.run(lead.nombre, lead.email, lead.telefono, lead.alojamiento, lead.habitaciones, lead.pms, lead.reservas_mensuales, lead.desafio);
    count++;
  }
  return count;
});

const inserted = insertMany(seedData);
console.log(`✅ Se insertaron ${inserted} leads de prueba en ${DB_PATH}`);

const total = db.prepare('SELECT COUNT(*) as total FROM leads').get();
console.log(`📊 Total de leads en la BD: ${total.total}`);

db.close();
