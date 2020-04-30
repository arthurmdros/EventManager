const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');


const routes = express.Router();

routes.get('/users', UsuarioController.index);
routes.post('/users', UsuarioController.create);
routes.delete('/users/:id', UsuarioController.delete);
routes.put('/users/:id', UsuarioController.update);

module.exports = routes;