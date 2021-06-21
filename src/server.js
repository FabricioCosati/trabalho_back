const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express')
const routes = require('./routes')

const server = express()

server.use(cors())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.urlencoded({extended: true}))

server.use(routes)

server.set("view engine", "njk")

server.listen(5000)