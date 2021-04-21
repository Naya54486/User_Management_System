const express = require("express");
const route = express.Router();

const services = require('../services/render')
const controller = require('../controller/controller')


/**
 * @description Root Route
 * @method GET/
 */
route.get('/', services.homeRoute);


/**
 * @description Add Users Route
 * @method GET/add_user
 */
route.get('/add_user', services.add_user);


/**
 * @description Update Users Route
 * @method GET/update_user
 */
route.get('/update_user', services.update_user)



// API
route.post('/api/create', controller.create);
route.put('/api/:id/update', controller.update);
route.delete('/api/:id/delete', controller.delete);
route.get('/api/users', controller.find);


module.exports = route;