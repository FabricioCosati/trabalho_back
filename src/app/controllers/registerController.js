const Register = require('../models/Register')
const Responsible = require('../models/Responsible')
const { iso, date } = require('../lib/utils')

module.exports = {

    async post(req, res) {

        const { status, risk, priority, isOnline, personId, description } = req.body

        try {
            const date = iso(Date.now())

            var onlineBoolean

            if (isOnline == "true" || isOnline == true) onlineBoolean = 1
            else onlineBoolean = 0

            const registerId = await Register.post({
                date,
                status,
                risk,
                priority,
                isOnline: onlineBoolean,
                description
            })

            await Responsible.post({
                person_id: personId,
                register_id: registerId,
                prof_id: 0
            })

            return

        } catch (error) {
            console.log(error)
        }
    },

    async put(req, res) {

        const {status, risk, priority, isOnline, responsible_user, action } = req.body
        const { id } = req.params

        try {
            var onlineBoolean
            var end

            if(status == 0){
                end = iso(Date.now())
            }

            if (isOnline == "true") onlineBoolean = 1
            else onlineBoolean = 0

            await Register.put(id, {
                status,
                risk,
                priority,
                isOnline: onlineBoolean,
                dateEnd: end || null,
                action,
                responsible_user
            })

            return res.send(`Registro atualizado com sucesso`)

        } catch (error) {
            console.log(error)
        }
    },

    async delete(req, res) {

        const { id } = req.params
        try {

            Register.delete(id)

            return res.send("Registro deletado")

        } catch (error) {
            console.error(error)
        }
    },

    async getOne(req, res) {

        const { id } = req.params

        try {

            const register = await Register.find({
                where: { "register.id": id }
            })

            return res.send(register)

        } catch (error) {
            console.error(error)
        }
    },

    async get(req, res) {

        try {

            let { priority, risk, status } = req.query

            const params = {
                priority,
                risk,
                status
            }

            const registers = await Register.filtering(params)

            return res.send(registers)

        } catch (error) {
            console.log(error)
        }
    }
}