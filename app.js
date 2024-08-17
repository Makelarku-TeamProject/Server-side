const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const morgan = require('morgan')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler/errorHandler')
const { Pool } = require('pg')
// const swaggerJsdoc = require('swagger-jsdoc');
const swaggerJson = require('./swagger/openapiLast.json')
const swaggerUi = require('swagger-ui-express');


dotenv.config()

const pgPool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
})


// * views engine ejs
app.set('view engine', 'ejs');

//* middleware
app.use(express.json())

// * morgan middleware
app.use(morgan("dev"))
app.use(cors())

// * session 
app.use(session({
    secret: String(process.env.SESSION_SECRET), 
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV !== 'development' 
    }
}));

// * Swagger Alwy Test

app.get('/test', (req, res) => {
    res.send('Hello')
})
app.use('/documents', swaggerUi.serve, swaggerUi.setup(swaggerJson))


// * Swagger configuration
// const swaggerOptions = {
//     swaggerDefinition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'My Express API',
//             version: '1.0.0',
//             description: 'API documentation for my Express application',
//         },
//         servers: [
//             {
//                 url: `http://localhost:${process.env.PORT}`, 
//             },
//         ],
//     },
//     apis: ['./routes/index.js'], 
// };

// const swaggerDocs = swaggerJsdoc(swaggerOptions);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(routes)

// * error handler middleware
app.use(errorHandler)

// ! Menjalank Server
const port = process.env.PORT
app.listen(port, () => console.log(`🚀 Server berjalan di port ${port}!`))