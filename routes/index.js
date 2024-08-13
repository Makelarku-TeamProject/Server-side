const express = require('express')
const routes = express.Router()
const categoryRoutes = require('./categories')
const houseRoutes = require('./house')
const authRoutes = require('./auth')
const sliderRoutes = require('./slider')

// TODO : restfull API
/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: A list of categories
 */
routes.use('/api/v1/categories', categoryRoutes)
routes.use('/api/v1/auth', authRoutes)
routes.use('/api/v1/house', houseRoutes)
routes.use('/api/v1/slider', sliderRoutes)

routes.get('/', (req, res) => {
    console.log('Rendering index page')
    res.render('customer/index')
})
routes.get('/contact', (req, res) => {
    console.log('Rendering contact page')
    res.render('customer/contact')
})

routes.get('/house', (req, res) => {
    console.log('Rendering house page')
    res.render('customer/house')
})

routes.get('/error', (req, res) => {
    console.log('Rendering error page')
    res.render('error/errorpage')
})


module.exports = routes