const express = require('express')
const routes = express.Router()
const sliderController = require('../controllers/sliderController')
const authMiddleware = require('../middlewares/authentication/authMiddleware')
const upload = require('../config/multer')

routes.get('/', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('member', 'admin', 'customer'), sliderController.getAllSlider)
routes.get('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('member', 'admin', 'customer'), sliderController.getSliderById)
routes.post('/', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin'),upload.single('image'), sliderController.createSlider)
routes.put('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin'), upload.single('image'), sliderController.updateSlider)
routes.delete('/:id', authMiddleware.authenticaToken, authMiddleware.authorizeRoles('admin'), sliderController.deleteSlider);

module.exports = routes

