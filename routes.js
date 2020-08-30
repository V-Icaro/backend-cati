const express = require('express');

const userController = require('./controllers/usersController');
const computadorController = require('./controllers/computadorController');
const manutencoesControler = require('./controllers/manutencoesControler');

const routes = express.Router();

//Usuarios 
routes.post('/logon', userController.logon);
routes.get('/allusers', userController.getUsuarios);
routes.post('/users', userController.createUser);  
routes.delete('/users/:id', userController.deleteUser);

//Computadores
routes.get('/computadores-todos', computadorController.allComputadores);
routes.get('/computadores/:page/:limit', computadorController.getComputadores);
routes.post('/computadores-id/:id', computadorController.getComputadoresPorId);
routes.post('/computadores-novo', computadorController.createComputador);
routes.post('/computadores-update/:id', computadorController.updateComputador);

//Manutenções
routes.get('/manutencoes/:page/:limit', manutencoesControler.getManutencoes);
routes.get('/manutencoes-liberados/:page/:limit', manutencoesControler.getManutencoesLiberados);
routes.post('/manutencoes-novo', manutencoesControler.createManutencao);

module.exports = routes;        