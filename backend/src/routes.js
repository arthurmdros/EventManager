const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const EventoController = require('./controllers/EventoController');

const routes = express.Router();

routes.get('/users', UsuarioController.index);
routes.post('/users', UsuarioController.create);
routes.delete('/users/:id', UsuarioController.delete);
routes.put('/users/:id', UsuarioController.update);

routes.get('/events', EventoController.index);
routes.post('/events', EventoController.create);
routes.delete('/events/:id', EventoController.delete);
routes.put('/events/:id', EventoController.update);

module.exports = routes;