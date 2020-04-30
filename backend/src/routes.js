const express = require('express');
const AdminController = require('./controllers/AdminController');
const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/admin/index', AdminController.index);
routes.post('/admin/create', AdminController.create);
routes.delete('/admin/update/:id', AdminController.delete);
routes.put('/admin/delete/:id', AdminController.update);

routes.get('/user/index', UserController.index);
routes.post('/user/create', UserController.create);
routes.put('/user/update/:id', UserController.update);
routes.delete('/user/delete/:id', UserController.delete);


module.exports = routes;