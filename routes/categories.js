const express = require('express')
const routes = express.Router()
const categoryController = require('../controllers/categoryController')
const validateCategory = require('../middlewares/validators/categoryValidator')
const authMiddleware = require('../middlewares/authentication/authMiddleware')

routes.get('/', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin', 'member', 'customer'), categoryController.getAllCategories)
routes.get('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin','member','customer'),categoryController.getCategoryById)
routes.post('/', validateCategory(), validateCategory.validate, authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin'), categoryController.createCategory)
routes.patch('/:id', validateCategory(), validateCategory.validate, authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin'), categoryController.updateCategory)
routes.delete('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin'), categoryController.deleteCategory)

module.exports = routes

