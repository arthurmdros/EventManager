const express = require('express');
const UsuarioController = require('./controllers/UsuarioController');
const EventoController = require('./controllers/EventoController');
const OrgController = require('./controllers/OrganizadorController');

const routes = express.Router();

routes.get('/users', UsuarioController.index);
routes.post('/users', UsuarioController.create);
routes.delete('/users/:id', UsuarioController.delete);
routes.put('/users/:id', UsuarioController.update);

routes.get('/events', EventoController.index);
routes.post('/events', EventoController.create);
routes.delete('/events/:id', EventoController.delete);
routes.put('/events/:id', EventoController.update);

routes.get('/orgs', OrgController.index);
routes.post('/orgs/:user_id', OrgController.create);
routes.delete('/orgs/:user_id', OrgController.delete);
routes.put('/orgs/:user_id', OrgController.update);

module.exports = routes;