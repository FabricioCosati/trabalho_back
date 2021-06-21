const Person = require('../models/Person')

module.exports = {
    async get(req, res){
        
        Person.get(function(person) {
            return res.send(person)
        })
    },

    async post(req, res){

        const {name, password, nickname, user, type} = req.body

        try {

            const findUser = await Person.find({
                where: {user}
            })

            if(findUser){
                return res.send("Usuário já está cadastrado")
            }

            await Person.post({
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
            await Person.put(id, {
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

            Person.delete(id)

            return res.send("Deletado")
            
        } catch (error) {
            console.error(error)
        }
    }
}