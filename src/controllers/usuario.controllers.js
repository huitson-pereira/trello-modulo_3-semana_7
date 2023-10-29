const { Usuario } = require ('../models/usuario')
const { sign } = require('jsonwebtoken')

class UsuarioController {

    //Criando novo usuário
    async createOneUsuario(req,res){
        try{
        const{
            name,
            email,
            password
        } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({error: "Preencha os campos obrigatórios!"})
        }

        const emailExistente = await Usuario.findOne({ where: {email}})
        if(emailExistente) {
            return res.status(403).json({error: "E-mail já cadastrado ou formato de e-mail inválido"})
        }

        const newUsuario = await Usuario.create({
            name,
            email,
            password
        })

        return res.status(201).json({
            id: newUsuario.id,
            name: newUsuario.name,
            email: newUsuario.email,
            password: newUsuario.password
        })
      } catch (error){
        return res.status(500).json({error: "Não foi possivel fazer o cadastro!"})
}
    }

    //Login 
    async loginUsuario(req, res){
        try{
            const {email, password} =  req.body;

            const usuario = await Usuario.findOne({ where: { email}});
            if(!usuario) {
                return res.status(404).json({error: "E-mail não cadastrado!"});
            }

            if(usuario.password !== password){
                return res.status(401).jso({error: "Senha incorreta!"})
            }
            else{
            //Retorna um Token para autenticação
            const payload = {"email": usuario.email, "senha":usuario.password}
            const token = sign (payload, process.env.SECRET_JWT)
            return res.status(200).json({ token });
            }

        } catch (error){
            return res.status(500).json({error: "Não foi possivel fazer o login!"})
    }
        }

        // Verificando usuarios existentes
        async listUsuario(req,res) {
            try{
           const {usuario} = req.params
           const usuarios = await Usuario.findAll(usuario)

           return res.status(200).json(usuarios)
        } catch (error) {
        return res.status(500).json ({error: "Erro ao encontrar usuário!"})
        }
    }

    //Atualizar usuário no sistema
    async updateUsuario (req,res) {
        
            const { id } = req.params;
            const { name,
                    email, 
                    password} = req.body

                    try {
                        const usuario = await Usuario.findByPk (id);
                        if(!usuario){
                            return res.status(400).json({error: "Id não encontrado ou algum dado está incorreto"})
                        }

                        usuario.name = name || usuario.name;
                        usuario.email = email || usuario.email;
                        usuario.password = password || usuario.password;

                        await usuario.save();
                        return res.status(200).json(usuario)
                    } catch (error){
                        console.error(error)
                        return res.status(500).json({error: "Não foi possível atualizar dados"})
                    }
        }

        //Deletar usuário
        async deleteUsuario (req, res){
            try{
                const { id } = req.params;
                const usuario = await Usuario.findOne({
                    where: { id }
                });
                    if(!usuario) {
                        return res.status(400).json({error: "Id inválido!"})
                    }
                    await usuario.destroy ({ where: {id}})
                    return res.status(204).json()
            } catch (error){
                return res.status(500).json({error: "Não foi possivel fazer o login!"})
            }
        }
}
    
module.exports = new UsuarioController ()
