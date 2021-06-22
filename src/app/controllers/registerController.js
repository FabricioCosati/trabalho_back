const Register = require('../models/Register')
const Responsible = require('../models/Responsible')

module.exports = {
    async get(req, res){
        
        Register.get(function(register) {
            return res.send(register)
        })
    },

    async post(req, res){

        const {date, status, risk, priority, isOnline, dateEnd, personId, description} = req.body

        try {
            var onlineBoolean

            if(isOnline == "true" || isOnline == true) onlineBoolean = 1
            else onlineBoolean = 0
            
            const registerId = await Register.post({
                date,
                status,
                risk,
                priority,
                isOnline: onlineBoolean,
                dateEnd,
                description
            })

            await Responsible.post({
                person_id: personId,
                register_id: registerId,
                prof_id: 0
            })

            return res.send("Registro cadastrado com sucesso")
            
        } catch (error) {
            console.log(errors)
        }
    },

    async put(req, res){

        const {date, status, risk, priority, isOnline, dateEnd, description} = req.body
        const {id} = req.params

        try {

            var onlineBoolean

            if(isOnline == "true") onlineBoolean = 1
            else onlineBoolean = 0

            await Register.put(id, {
                date,
                status,
                risk,
                priority,
                isOnline: onlineBoolean,
                dateEnd,
                description
            })

            return res.send(`Registro atualizado com sucesso`)
            
        } catch (error) {
            console.log(error)
        }
    },

    async delete(req, res){

        const {id} = req.params
        try {

            Register.delete(id)

            return res.send("Registro deletado")
            
        } catch (error) {
            console.error(error)
        }
    },

    async getOne(req, res){

        const {id} = req.params

        try {

            const register = await Register.find({
                where: {id}
            })

            return res.send(register)
            
        } catch (error) {
            console.error(error)
        }
    },

    async filtering(req, res){

        try {

            let {limit, offset, filter} = req.query

            const params = {
                filter,
                limit,
                offset
            }

            const registers = await Register.filtering(params)

            return res.send(registers)
            
        } catch (error) {
            console.log(error)
        }
    }
}