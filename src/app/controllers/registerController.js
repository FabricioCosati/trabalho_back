const Register = require('../models/Register')

module.exports = {
    async get(req, res){
        
        Register.get(function(register) {
            return res.send(register)
        })
    },

    async post(req, res){

        const {date, status, risk, priority} = req.body

        try {

            const findUser = await Register.find({
                where: {user}
            })

            if(findUser){
                return res.send("Usuário já está cadastrado")
            }

            await Register.post({
                name,
                password,
                nickname,
                user,
                type
            })

            return res.send("Cadastrado com sucesso")
            
        } catch (error) {
            console.log(errors)
        }
    },

    async put(req, res){

        const {name, password, nickname, user, type} = req.body
        const {id} = req.params

        try {
            await Register.put(id, {
                name,
                password,
                nickname,
                user,
                type
            })

            return res.send(`Atualizado com sucesso`)
            
        } catch (error) {
            console.log(error)
        }
    },

    async delete(req, res){

        const {id} = req.params
        try {

            Register.delete(id)

            return res.send("Deletado")
            
        } catch (error) {
            console.error(error)
        }
    }
}