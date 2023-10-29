const { Router } = require('express');
const {listarAllUnidades, createOneUnidade, atualizarOneUnidade, excluirUnidade} = require('../controllers/unidade.controller');
const { auth } = require ('../middleware/auth')


class UnidadeRouter {
  routesFromUnidade() {
    const unidadeRoutes = Router();

    unidadeRoutes.get('/v1/unidade', auth, listarAllUnidades);
    unidadeRoutes.post('/v1/unidade', auth, createOneUnidade);
    unidadeRoutes.put('/v1/unidade/:id', auth, atualizarOneUnidade);
    unidadeRoutes.delete('/v1/unidade/:id', auth, excluirUnidade)

    return unidadeRoutes;
  }
}

module.exports = new UnidadeRouter();