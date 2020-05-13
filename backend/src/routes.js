const express = require('express');
const AdminController = require('./controllers/AdminController');
const UserController = require('./controllers/UserController');
const CompanyController = require('./controllers/CompanyController');
const EventController = require('./controllers/EventController');
const TicketController = require('./controllers/TicketController');
const LoginController = require('./controllers/LoginController');
const LoginAdmController = require('./controllers/LoginAdmController')
const ProfileController = require('./controllers/ProfileController');
const ProfileAdmController = require('./controllers/ProfileAdmController');


const routes = express.Router();

routes.post('/admin/session', LoginAdmController.create);
routes.get('/admin/profile', ProfileAdmController.index);
routes.post('/user/session', LoginController.create);
routes.get('/user/profile', ProfileController.index);

routes.get('/admin/index', AdminController.index);
routes.post('/admin/create', AdminController.create);
routes.delete('/admin/delete/:id', AdminController.delete);
routes.put('/admin/update/:id', AdminController.update);

routes.get('/user/index', UserController.index);
routes.get('/user/index/data/:id', UserController.selectUser);
routes.post('/user/create', UserController.create);
routes.put('/user/profile/update/:id', UserController.updateProfile);
routes.put('/user/account/update/:id', UserController.updateAccount);
routes.delete('/user/delete/:id', UserController.delete);


routes.get('/company/index', CompanyController.index);
routes.post('/company/create', CompanyController.create);
routes.put('/company/update/:id', CompanyController.update);
routes.delete('/company/delete/:id', CompanyController.delete);
routes.get('/company/all', CompanyController.selectCompanys);

routes.get('/event/index', EventController.index);
routes.post('/event/create', EventController.create);
routes.put('/event/update/:id', EventController.update);
routes.delete('/event/delete/:id', EventController.delete);

routes.get('/ticket/index', TicketController.index);
routes.post('/ticket/create', TicketController.create);
routes.get('/ticket/event/:event_id', TicketController.selectTicket);
routes.delete('/ticket/delete/:id', TicketController.delete);



module.exports = routes;