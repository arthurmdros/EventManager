const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');
const classCelebrate = require('celebrate');

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
const upload = multer(multerConfig);

/*LOGIN*/

routes.post('/admin/session', LoginAdmController.create);
routes.get('/admin/profile', ProfileAdmController.index);
routes.post('/user/session', LoginController.create);
routes.get('/user/profile', ProfileController.index);

/*ADMIN*/

routes.get('/admin/index', AdminController.index);
routes.post('/admin/create', AdminController.create);
routes.delete('/admin/delete/:id', AdminController.delete);
routes.put('/admin/update/:id', AdminController.update);

/*USERS*/

routes.get('/user/index', UserController.index);
routes.get('/user/index/data/:id', UserController.selectUser);
routes.post('/user/create', UserController.create);
routes.put('/user/profile/update/:id', UserController.updateProfile);
routes.put('/user/account/update/:id', UserController.updateAccount);
routes.delete('/user/delete/:id', UserController.delete);

/*COMPANIES*/

routes.get('/company/index', CompanyController.index);
routes.post('/company/create',  upload.single('image'), CompanyController.create);
routes.put('/company/update/:id', CompanyController.update);
routes.put('/company/select/:id', CompanyController.confirmCompany);
routes.delete('/company/delete/:id', CompanyController.delete);
routes.get('/company/all', CompanyController.selectCompanies);
routes.get('/company/event/:event_id', CompanyController.selectCompany);

/*EVENTS*/

routes.get('/event/index', EventController.index);
routes.post('/event/create', 
    upload.single('image'),
    classCelebrate.celebrate({
        body: classCelebrate.Joi.object().keys({
            title: classCelebrate.Joi.string().required(),
            description: classCelebrate.Joi.string().required(),
            selectedStartDate: classCelebrate.Joi.string().required(),
            selectedEndDate: classCelebrate.Joi.string().required(),
            selectedStartTime: classCelebrate.Joi.string().required(),
            selectedEndTime: classCelebrate.Joi.string().required(),
            selectedValue: classCelebrate.Joi.string().required(),
            latitude: classCelebrate.Joi.number().required(),
            longitude: classCelebrate.Joi.number().required(),
            city: classCelebrate.Joi.string().required(),
            uf: classCelebrate.Joi.string().required().max(2),            
        })
    },
    {
        abortEarly: false
    }),
    EventController.create
);
routes.put('/event/update/:id', 
    upload.single('image'),
    classCelebrate.celebrate({
        body: classCelebrate.Joi.object().keys({
            title: classCelebrate.Joi.string().required(),
            description: classCelebrate.Joi.string().required(),
            selectedStartDate: classCelebrate.Joi.string().required(),
            selectedEndDate: classCelebrate.Joi.string().required(),
            selectedStartTime: classCelebrate.Joi.string().required(),
            selectedEndTime: classCelebrate.Joi.string().required(),
            selectedValue: classCelebrate.Joi.string().required(),
            latitude: classCelebrate.Joi.number().required(),
            longitude: classCelebrate.Joi.number().required(),
            city: classCelebrate.Joi.string().required(),
            uf: classCelebrate.Joi.string().required().max(2),            
        })
    },
    {
        abortEarly: false
    }),
    EventController.update
);
routes.delete('/event/delete/:id', EventController.delete);
routes.get('/event/index/:selectedValue', EventController.selectCategorie);

/*TICKETS*/

routes.get('/ticket/index', TicketController.index);
routes.post('/ticket/create', TicketController.create);
routes.get('/ticket/event/:event_id', TicketController.selectTicket);
routes.delete('/ticket/delete/:id', TicketController.delete);
routes.put('/ticket/update/:id', TicketController.updateTicket);



module.exports = routes;