const express = require('express')
const routes = express.Router()
const authController = require('../controllers/authController')
const validateAuth = require('../middlewares/validators/authValidator')

routes.post('/register', validateAuth.validateRegister(), validateAuth.validateRegister.validate, authController.register)
routes.post('/login', validateAuth.validateLogin(), validateAuth.validateLogin.validate, authController.login)
routes.post('/logout',authController.logout)

module.exports = routes
