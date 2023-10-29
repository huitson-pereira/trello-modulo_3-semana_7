const { Router } = require('express');
const { loginUsuario, createOneUsuario, listUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuario.controllers');


class UsuarioRouter {
  routesFromUser() {
    const usuarioRoutes = Router();

    userRoutes.post('/v1/login', loginUsuario);
    userRoutes.post('/v1/usuario', createOneUsuario);
    userRoutes.get('/v1/usuario', auth, listUsuario);
    userRoutes.put('/v1/usuario/:id', auth, updateUsuario);
    userRoutes.delete('/v1/usuario/:id', auth, deleteUsuario)

    return userRoutes;
  }
}

module.exports = new UsuarioRouter();
