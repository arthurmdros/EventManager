const express = require('express');
const AdminController = require('./controllers/AdminController');

const routes = express.Router();

routes.get('/admin/index', AdminController.index);
routes.post('/admin/create', AdminController.create);
routes.delete('/admin/update/:id', AdminController.delete);
routes.put('/admin/delete/:id', AdminController.update);

module.exports = routes;