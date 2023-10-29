const { Router } = require('express');
const { routesFromUsuario } = require('./usuario.routes');
const { routesFromUnidade } = require('./unidade.route');

const routes = Router();

routes.use('/api', [routesFromUsuario(), routesFromUnidade()]);

module.exports = routes;