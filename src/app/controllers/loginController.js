const Person = require('../models/Person')

module.exports = {
    async login(req, res){
        
        const {user, password} = req.body

        try {

            const findUser = await Person.find({
                where: {user}
            })

            if(!findUser){
                return res.send("Usuário não cadastrado")
            }

            if(findUser.password != password){
                return res.send("As senhas não são iguais")
            }

            return res.send(findUser)

        } catch (error) {
            console.error(error)
        }
    },
}