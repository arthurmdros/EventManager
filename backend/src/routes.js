const express = require('express');
const AdminController = require('./controllers/AdminController');
const UserController = require('./controllers/UserController');
const CompanyController = require('./controllers/CompanyController');
const EventController = require('./controllers/EventController');


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

routes.get('/event/index', EventController.index);
routes.post('/event/create', EventController.create);
routes.put('/event/update/:id', EventController.update);
routes.delete('/event/delete/:id', EventController.delete);



module.exports = routes;