const express = require('express')
const routes = express.Router()
const houseController = require('../controllers/houseController')
const authMiddleware = require('../middlewares/authentication/authMiddleware')
const upload = require('../config/multer')

routes.get('/', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin', 'member', 'customer'), houseController.getAllHouse)
routes.get('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin', 'member', 'customer'), houseController.getHousewithJoin)
routes.post('/', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin', 'member', 'customer'), upload.array('house_images', 10), houseController.createHouse)
routes.put('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin', 'member', 'customer'),upload.array('house_images', 10), houseController.updateHouse)
routes.delete('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin', 'member', 'customer'), houseController.deleteHouse)

module.exports = routes


