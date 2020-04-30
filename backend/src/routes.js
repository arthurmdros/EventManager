const express = require('express');
const AdminController = require('./controllers/AdminController');
const UserController = require('./controllers/UserController');
const CompanyController = require('./controllers/CompanyController');

const routes = express.Router();

routes.get('/admin/index', AdminController.index);
routes.post('/admin/create', AdminController.create);
routes.delete('/admin/delete/:id', AdminController.delete);
routes.put('/admin/update/:id', AdminController.update);

routes.get('/user/index', UserController.index);
routes.post('/user/create', UserController.create);
routes.put('/user/update/:id', UserController.update);
routes.delete('/user/delete/:id', UserController.delete);


routes.get('/company/index', CompanyController.index);
routes.post('/company/create', CompanyController.create);
routes.put('/company/update/:id', CompanyController.update);
routes.delete('/company/delete/:id', CompanyController.delete);


module.exports = routes;