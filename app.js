// app.js
const express = require('express');
const bodyParser = require('body-parser');
const { createClient, getAllClients, updateClient } = require('./clientes-api-node/src/controllers/clienteController');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
// Rutas de la API

app.post('/api/clientes', createClient);
app.get('/api/clientes', getAllClients);
app.put('/api/clientes/:id', updateClient);
// Iniciar el servidor

app.listen(port, () => {
    console.log(`Log: Servidor de clientes escuchando en http://localhost:${port}`);
});