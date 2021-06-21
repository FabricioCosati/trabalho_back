const express = require('express')
const routes = express.Router()
const PersonController = require('./app/controllers/personController')
const LoginController = require('./app/controllers/loginController')

routes.get('/', (req, res)=>{
    return res.redirect("/person")
})

routes.get('/persons', PersonController.get)
routes.post('/persons', PersonController.post)
routes.put('/persons/:id', PersonController.put)
routes.delete('/persons/:id', PersonController.delete)

routes.post('/login', LoginController.login)

module.exports = routes