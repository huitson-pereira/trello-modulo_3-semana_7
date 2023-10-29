const express = require('express')
const cors = require('cors')
const { connection } = require ('./database/connection')
const routes = require('./routes')

class Server {
    constructor (server = express())
    {
        this.middlewares(server)
        this.database()
        this.initializeServer(server)
        this.allRoutes(server)
    }

    async middlewares(app) {
        app.use(cors())
        app.use(express.json())
    }

    async database() {
        try{
            await connection.authenticate();
            console.log('Sua conexão foi bem sucedida!');
        } catch (error) {
            console.error('Não foi possível conectar com o banco de dados.', error);
            throw error
        }
    }

    async initializeServer(app) {
        const PORT = 3000
        app.listen(PORT, () => console.log(`Servidor executanto na porta ${PORT}`))
    }

    async allRoutes(app) {
        app.use(routes)
    }
}

module.exports = { Server }