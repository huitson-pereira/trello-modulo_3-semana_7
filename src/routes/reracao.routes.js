const { Router } = require('express');
const {
  createGeracao,
  listGeracaoId,
  getAllGeracoes,
  deleteGeracao,
  updateGeracao,
} = require('../controllers/geracao.controllers');

class GeracaoRouter {
  routesFromGeracao() {
    const geracaoRoutes = Router();

    geracaoRoutes.post('/v1/geracao', createGeracao);
    geracaoRoutes.get('/v1/geracao/:unidadeId', listGeracaoId);
    geracaoRoutes.delete('/v1/geracao/:id', deleteGeracao);
    geracaoRoutes.get('/v1/geracao', getAllGeracoes);
    geracaoRoutes.put('/v1/geracao/:id', updateGeracao);

    return geracaoRoutes;
  }
}

module.exports = new GeracaoRouter();
