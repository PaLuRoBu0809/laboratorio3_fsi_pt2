import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const DB_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DB_DIR, 'omnibooking.db');

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

declare global {
  // eslint-disable-next-line no-var
  var __db: Database.Database | undefined;
}

function getDatabase(): Database.Database {
  if (!global.__db) {
    global.__db = new Database(DB_PATH);
    global.__db.pragma('journal_mode = WAL');
    global.__db.pragma('foreign_keys = ON');
    initializeSchema(global.__db);
  }
  return global.__db;
}

function initializeSchema(db: Database.Database): void {
  // 1. Crear tabla leads si no existe
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

  // 2. Crear tabla de tablas personalizadas si no existe
  db.exec(`
    CREATE TABLE IF NOT EXISTS custom_tables (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL UNIQUE,
      descripcion TEXT,
      columnas TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now', 'localtime'))
    );
  `);

  // 3. SEEDER: Cargar 20 datos de prueba si la tabla está vacía
  const countResult = db.prepare('SELECT COUNT(*) as count FROM leads').get() as { count: number };

  if (countResult.count === 0) {
    console.log('🌱 Poblando base de datos SQLite con 20 leads de prueba...');

    const mockLeads = [
      { nombre: "Alejandro Gómez", email: "agomez@hotelparadise.com", telefono: "+34 611 223 344", alojamiento: "Hotel Paradise Boutique", habitaciones: "11-50", pms: "Cloudbeds", reservas_mensuales: "120", desafio: "Atención fuera de horario" },
      { nombre: "Sofía Rossi", email: "s.rossi@villaroma.it", telefono: "+39 333 456 789", alojamiento: "Villa Roma Apartments", habitaciones: "1-10", pms: "Ninguno", reservas_mensuales: "25", desafio: "Demasiado tiempo respondiendo" },
      { nombre: "Carlos Mendoza", email: "operaciones@mendoza.com", telefono: "+52 55 9876 5432", alojamiento: "Mendoza Eco-Resort", habitaciones: "+100", pms: "Mews", reservas_mensuales: "450", desafio: "Errores de overbooking" },
      { nombre: "Laura Dialogue", email: "laura@seychelles.com", telefono: "+248 4 222 333", alojamiento: "Seychelles Luxury Stays", habitaciones: "51-100", pms: "SiteMinder", reservas_mensuales: "180", desafio: "Falta de personal multilingüe" },
      { nombre: "Markus Weber", email: "m.weber@berlinlodging.de", telefono: "+49 30 123456", alojamiento: "Berlin Urban Lodging", habitaciones: "11-50", pms: "Guesty", reservas_mensuales: "95", desafio: "Demasiado tiempo respondiendo" },
      { nombre: "Lucía Fernández", email: "lfernandez@solymar.com", telefono: "+34 600 111 222", alojamiento: "Hostal Sol y Mar", habitaciones: "1-10", pms: "Cloudbeds", reservas_mensuales: "40", desafio: "Atención fuera de horario" },
      { nombre: "Pierre Dubois", email: "p.dubois@parisbreeze.fr", telefono: "+33 1 42 27 78", alojamiento: "Paris Breeze Hotel", habitaciones: "11-50", pms: "Amenitiz", reservas_mensuales: "110", desafio: "Errores de overbooking" },
      { nombre: "Santiago Aria", email: "santiago@andeslodges.cl", telefono: "+56 2 2345 6789", alojamiento: "Andes Alpine Lodges", habitaciones: "11-50", pms: "Cloudbeds", reservas_mensuales: "75", desafio: "Falta de personal multilingüe" },
      { nombre: "Emma Watson", email: "manager@londonpenthouses.co.uk", telefono: "+44 20 7946 0192", alojamiento: "London Premium Penthouses", habitaciones: "1-10", pms: "Guesty", reservas_mensuales: "30", desafio: "Demasiado tiempo respondiendo" },
      { nombre: "Ricardo Santos", email: "ricardo@algarvebliss.pt", telefono: "+351 21 345 6789", alojamiento: "Algarve Bliss Resort", habitaciones: "51-100", pms: "Newhotel", reservas_mensuales: "210", desafio: "Atención fuera de horario" },
      { nombre: "Matías Novoa", email: "mnovoa@mexicogrand.mx", telefono: "+52 998 123 4567", alojamiento: "Mexico Grand Oasis", habitaciones: "+100", pms: "Opera (Oracle)", reservas_mensuales: "600", desafio: "Errores de overbooking" },
      { nombre: "Camila Vega", email: "cvega@patagoniatrips.com", telefono: "+54 11 4321 8765", alojamiento: "Patagonia Eco-Lodge", habitaciones: "1-10", pms: "Ninguno", reservas_mensuales: "15", desafio: "Demasiado tiempo respondiendo" },
      { nombre: "John Doe", email: "j.doe@nycaparts.com", telefono: "+1 212 555 0199", alojamiento: "NYC Central Apartments", habitaciones: "11-50", pms: "Hostaway", reservas_mensuales: "140", desafio: "Atención fuera de horario" },
      { nombre: "Elena Rostova", email: "erostova@balticview.ee", telefono: "+372 612 3456", alojamiento: "Baltic View Hotel", habitaciones: "51-100", pms: "Cloudbeds", reservas_mensuales: "190", desafio: "Falta de personal multilingüe" },
      { nombre: "Ahmed Mansoor", email: "ahmed@dubailuxe.ae", telefono: "+971 4 321 4321", alojamiento: "Dubai Marina Luxe Suites", habitaciones: "51-100", pms: "Mews", reservas_mensuales: "310", desafio: "Errores de overbooking" },
      { nombre: "Yuki Tanaka", email: "tanaka@kyototradition.jp", telefono: "+81 75 211 3111", alojamiento: "Kyoto Tradition Ryokan", habitaciones: "11-50", pms: "Ninguno", reservas_mensuales: "50", desafio: "Falta de personal multilingüe" },
      { nombre: "Valeria Duque", email: "vduque@medellinroofs.com", telefono: "+57 300 765 4321", alojamiento: "Medellin Roofs & Pools", habitaciones: "1-10", pms: "Guesty", reservas_mensuales: "35", desafio: "Demasiado tiempo respondiendo" },
      { nombre: "Giovanni Rossi", email: "g.rossi@tuscanhills.it", telefono: "+39 055 123456", alojamiento: "Tuscan Hills Boutique", habitaciones: "11-50", pms: "Scrigno", reservas_mensuales: "85", desafio: "Atención fuera de horario" },
      { nombre: "Diana Prince", email: "diana@thematicorlando.com", telefono: "+1 202 555 0144", alojamiento: "Thematic Stays Orlando", habitaciones: "51-100", pms: "Cloudbeds", reservas_mensuales: "220", desafio: "Errores de overbooking" },
      { nombre: "Lucas Silva", email: "lucas@riobeachfront.br", telefono: "+55 21 99999 8888", alojamiento: "Rio Beachfront Hostel", habitaciones: "11-50", pms: "HQ Beds", reservas_mensuales: "105", desafio: "Demasiado tiempo respondiendo" }
    ];

    const insertStmt = db.prepare(`
      INSERT INTO leads (nombre, email, telefono, alojamiento, habitaciones, pms, reservas_mensuales, desafio)
      VALUES (@nombre, @email, @telefono, @alojamiento, @habitaciones, @pms, @reservas_mensuales, @desafio)
    `);

    // Transacción nativa de better-sqlite3 para máxima velocidad
    const insertMany = db.transaction((leadsList) => {
      for (const lead of leadsList) insertStmt.run(lead);
    });

    insertMany(mockLeads);
    console.log('✅ Base de datos lista con datos de prueba.');
  }
}

export const db = getDatabase();
