const express = require('express')
const routes = express.Router()
const PersonController = require('./app/controllers/personController')
const LoginController = require('./app/controllers/loginController')
const RegisterController = require('./app/controllers/registerController')

routes.get('/', (req, res)=>{
    return res.redirect("/person")
})

routes.get('/persons', PersonController.get)
routes.post('/persons', PersonController.post)
routes.put('/persons/:id', PersonController.put)
routes.delete('/persons/:id', PersonController.delete)

routes.post('/login', LoginController.login)

routes.get('/registers', RegisterController.get)
routes.get('/registers/:id', RegisterController.getOne)
routes.post('/registers', RegisterController.post)
routes.put('/registers/:id', RegisterController.put)
routes.delete('/registers/:id', RegisterController.delete)


module.exports = routes