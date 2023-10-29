const { Router } = require('express');
const { 
    loginUsuario, 
    createOneUsuario, 
    listUsuario, 
    updateUsuario, 
    deleteUsuario 
} = require('../controllers/usuario.controllers');

class UsuarioRouter {
  routesFromUsuario() {
    const usuarioRoutes = Router();

    usuarioRoutes.post('/v1/login', loginUsuario);
    usuarioRoutes.post('/v1/usuario', createOneUsuario);
    usuarioRoutes.get('/v1/usuario', listUsuario);
    usuarioRoutes.put('/v1/usuario/:id', updateUsuario);
    usuarioRoutes.delete('/v1/usuario/:id', deleteUsuario)

    return usuarioRoutes;
  }
}

module.exports = new UsuarioRouter();
