
// src/utils/connection.js
const { Pool } = require('pg');

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',          // Reemplaza con tu usuario de PostgreSQL
    host: 'localhost',         // Generalmente 'localhost' en Windows
    database: 'client_api',   // Nombre de tu base de datos
    password: 'Fabri3459',   // Reemplaza con tu contraseña
    port: 5432,                // Puerto por defecto de PostgreSQL
});

// Mensaje de Log para verificar la conexión
pool.on('connect', () => {
    console.log('Log: Conexión exitosa a PostgreSQL.');
});

// Log en caso de error
pool.on('error', (err) => {
    console.error('Error: Conexión a base de datos fallida:', err.message);
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};