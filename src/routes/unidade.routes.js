const { Router } = require('express');
const {
  listarAllUnidades, 
  createOneUnidade, 
  atualizarOneUnidade, 
  excluirUnidade
} = require('../controllers/unidade.controllers')


class UnidadeRouter {
  routesFromUnidade() {
    const unidadeRoutes = Router();

    unidadeRoutes.get('/v1/unidade', listarAllUnidades);
    unidadeRoutes.post('/v1/unidade', createOneUnidade);
    unidadeRoutes.put('/v1/unidade/:id', atualizarOneUnidade);
    unidadeRoutes.delete('/v1/unidade/:id', excluirUnidade)

    return unidadeRoutes;
  }
}

module.exports = new UnidadeRouter();