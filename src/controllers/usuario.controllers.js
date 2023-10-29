const { User } = require ('../models/user')
const { sign } = require('jsonwebtoken')

class UserController {

    //Login 
    async loginUser(req, res){
        try{
            const {email, password} =  req.body;

            const user = await User.findOne({ where: { email}});
            if(!user) {
                return res.status(404).json({error: "E-mail não cadastrado!"});
            }

            if(user.password !== password){
                return res.status(401).jso({error: "Senha incorreta!"})
            }
            else{
            //Retorna um Token para autenticação
            const payload = {"email": user.email, "senha":user.password}
            const token = sign (payload, process.env.SECRET_JWT)
            return res.status(200).json({ token });
            }

        } catch (error){
            return res.status(500).json({error: "Não foi possivel fazer o login!"})
    }
        }

        // Verificando usuarios existentes
        async listUser(req,res) {
            try{
           const {user} = req.params
           const users = await User.findAll(user)

           return res.status(200).json(users)
        } catch (error) {
        return res.status(500).json ({error: "Erro ao encontrar usuário!"})
        }
    }

}
    
module.exports = new UserController ()
