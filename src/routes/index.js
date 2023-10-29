const { Router } = require('express');
const { routesFromUsuario } = require('./usuario.routes');
const { routesFromUnidade } = require('./unidade.route');
const { routesFromGeracao } = require('./reracao.routes');

const routes = Router();

routes.use('/api', [routesFromUsuario(), routesFromUnidade(), routesFromGeracao()]);

module.exports = routes;