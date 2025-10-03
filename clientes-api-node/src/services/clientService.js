// src/services/clientService.js
const db = require('../utils/conection'); // Importar el módulo de conexión

// ----------------------------------------------------
// 1. POST (Creación de un nuevo cliente)
// ----------------------------------------------------
async function create(client) {
    const { nombre, email } = client;
    const SQL = 'INSERT INTO client (nombre, email) VALUES ($1, $2) RETURNING id, nombre, email;';
    
    try {
        const result = await db.query(SQL, [nombre, email]);
        const newClient = result.rows[0];
        console.log('Log: New client created in DB:', newClient.nombre);
        return newClient; // Devuelve el objeto creado (incluyendo el ID generado)
    } catch (error) {
        // Manejo de excepción (Ej: email duplicado, error de conexión)
        console.error('Error (Create): No se pudo insertar el client.', error.message);
        throw new Error('Database Error: Could not create client.');
    }
}

// ----------------------------------------------------
// 2. GET (Obtener todos los clientes)
// ----------------------------------------------------
async function findAll() {
    const SQL = 'SELECT id, nombre, email FROM client ORDER BY id ASC;';
    
    try {
        const result = await db.query(SQL);
        console.log('Log: The client list was requested from DB.');
        return result.rows; // Devuelve la lista de clientes (clientslist)
    } catch (error) {
        // Manejo de excepción
        console.error('Error (FindAll): No se pudo obtener la lista de clientes.', error.message);
        return [];
    }
}

// ----------------------------------------------------
// 3. PUT (Actualización de un cliente)
// ----------------------------------------------------
async function update(id, client) {
    const { nombre, email } = client;
    const SQL = 'UPDATE client SET nombre = $1, email = $2 WHERE id = $3 RETURNING id, nombre, email;';
    
    try {
        const result = await db.query(SQL, [nombre, email, id]);

        if (result.rowCount === 0) {
            // Manejo de caso: No se encontró el cliente con ese ID
            console.log(`Log: Client ID ${id} not found for update.`);
            return null;
        }

        const updatedClient = result.rows[0];
        console.log('Log: Client updated in DB:', updatedClient.nombre);
        return updatedClient; // Devuelve el cliente actualizado
    } catch (error) {
        // Manejo de excepción (Ej: email duplicado, error de conexión)
        console.error('Error (Update): No se pudo actualizar el client.', error.message);
        throw new Error('Database Error: Could not update client.');
    }
}

module.exports = { create, findAll, update };