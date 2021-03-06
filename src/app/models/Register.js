const con = require("../../config/db")

module.exports = {
    async get(callback) {

        try {

            var results
            await con.query("SELECT register.*, (SELECT count(*) FROM register) AS total_register FROM register", (err, rows) => {
                if (err) throw err

                callback(results = rows)
            })

        } catch (error) {
            console.error(error)
        }
    },

    async post(filters) {

        try {

            let keys = [],
                values = []

            Object.keys(filters).map(key => {

                keys.push(key)

                values.push(`'${filters[key]}'`)
            })

            const query = `INSERT INTO register (${keys.join(",")}) VALUES (${values.join(",")})`

            return new Promise(function (resolve, reject) {

                con.query(query, (err, rows) => {
                    if (err) throw err

                    resolve(rows.insertId)

                })
            })

        } catch (error) {
            console.error(error)
        }
    },

    async put(id, filters) {

        try {
            let update = []

            Object.keys(filters).map(key => {

                const row = ` ${key} = '${filters[key]}'`
                update.push(row)
            })

            const query = `UPDATE register SET ${update.join(",")} WHERE id = ${id}`

            await con.query(query, (err, rows) => {
                if (err) throw err

                return rows
            })

        } catch (error) {
            console.log(error)
        }
    },

    async delete(id) {

        try {

            await con.query(`DELETE FROM register WHERE id = ${id}`, (err, rows) => {
                if (err) throw err

                return rows
            })

        } catch (error) {
            console.log(error)
        }
    },

    async find(filters) {

        try {
            let query = "SELECT * FROM register"

            Object.keys(filters).map(key => {
                query += ` ${key}`

                Object.keys(filters[key]).map(field => {
                    query += ` ${field} = '${filters[key][field]}'`
                })
            })

            return new Promise(function (resolve, reject) {

                con.query(query, (err, rows) => {
                    if (err) throw err

                    resolve(rows[0])

                })
            })

        } catch (error) {
            console.error(error)
        }
    },

    async filtering(params) {

        try {

            const { priority, risk, status } = params

            let query = "",
                totalQuery = "",
                filterTotal = "WHERE 1 = 1"

            if(priority){
                filterTotal += ` AND(register.priority LIKE '%${priority}%')`
                totalQuery = `(SELECT count(*) FROM register ${filterTotal}) AS total_register`
            }

            if(risk){
                filterTotal += ` AND (register.risk LIKE '%${risk}%')`
                totalQuery = `(SELECT count(*) FROM register ${filterTotal}) AS total_register`
            }

            if(status){
                filterTotal += ` AND (register.status LIKE '%${status}%')`
                totalQuery = `(SELECT count(*) FROM register ${filterTotal}) AS total_register`
            }

            if(!totalQuery){
                totalQuery = `(SELECT count(*) FROM register) AS total_register`
            }

            query = `
                    SELECT register.*,
                    ${totalQuery}
                    FROM responsible
                    LEFT JOIN register ON (responsible.register_id = register.id)
                    LEFT JOIN person ON (responsible.person_id = person.id)
                    ${filterTotal}
                `
            
            return new Promise(function (resolve, reject) {

                con.query(query, (err, rows) => {
                    if (err) throw err

                    resolve(rows)

                })
            })

        } catch (error) {
            console.error(error)
        }
    },

}