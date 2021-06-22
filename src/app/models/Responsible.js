const con = require("../../config/db")

module.exports = {
    async get(callback){

        try {

            var results
            await con.query("SELECT * FROM responsible", (err, rows) => {
                if(err) throw err

                callback(results = rows)
            })
            
        } catch (error) {
            console.error(error)
        }
    },

    async post(filters){

        try {

            let keys = [],
                values = []

            Object.keys(filters).map(key => {

                keys.push(key)
                
                values.push(`'${filters[key]}'`)
            })

            const query = `INSERT INTO responsible (${keys.join(",")}) VALUES (${values.join(",")})`

            await con.query(query, (err, rows) => {
                if(err) throw err

            })
            
        } catch (error) {
            console.error(error)
        }
    },

    async put(id, filters){

        try {
            let update = []

            Object.keys(filters).map(key => {

                const row = ` ${key} = '${filters[key]}'`
                update.push(row)
            })

            const query = `UPDATE responsible SET ${update.join(",")} WHERE id = ${id}`

            await con.query(query, (err, rows) => {
                if(err) throw err

                return rows
            })
            
        } catch (error) {
            console.log(error)
        }
    },

    async delete(id){

        try {

            await con.query(`DELETE FROM responsible WHERE id = ${id}`, (err, rows) => {
                if(err) throw err

                return rows
            })
            
        } catch (error) {
            console.log(error)
        }
    },

    async find(filters){

        try {
            let query = "SELECT * FROM responsible"

            Object.keys(filters).map(key => {
                query += ` ${key}`

                Object.keys(filters[key]).map(field => {
                    query += ` ${field} = '${filters[key][field]}'`
                })
            })

            return new Promise(function(resolve, reject){

                con.query(query, (err, rows) => {
                    if(err) throw err
                    
                    resolve(rows[0])
                    
                })
            })

        } catch (error) {
            console.error(error)
        }
    }

}