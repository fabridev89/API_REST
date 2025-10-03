// src/controllers/clientController.js
const clientService = require('../services/clientService');

// 1. POST
async function createClient(req, res) {
    try {
        const newClient = await clientService.create(req.body);
        // Si todo sale bien, devuelve 201 Created
        res.status(201).json(newClient); 
    } catch (error) {
        // Devuelve 400 Bad Request o 500 Internal Server Error
        res.status(400).json({ error: error.message }); 
    }
}

// 2. GET
async function getAllClients(req, res) {
    // No necesita try/catch si el service devuelve array vacío en caso de error
    const clientslist = await clientService.findAll();
    res.status(200).json(clientslist);
}

// 3. PUT
async function updateClient(req, res) {
    const id = req.params.id;
    try {
        const updatedClient = await clientService.update(id, req.body);
        
        if (updatedClient) {
            res.status(200).json(updatedClient);
        } else {
            // 404 Not Found si el servicio devuelve null
            res.status(404).json({ error: 'Client not found.' }); 
        }
    } catch (error) {
        // 400 Bad Request o 500 Internal Server Error
        res.status(400).json({ error: error.message }); 
    }
}

// *Opcional: Endpoint DELETE*
// Agregaremos el DELETE para una API REST completa (se debe agregar la función delete en el Service)
/*
async function deleteClient(req, res) {
    // ... Implementación similar a update, usando DELETE FROM client WHERE id = $1
}
*/

module.exports = { createClient, getAllClients, updateClient /*, deleteClient */ };