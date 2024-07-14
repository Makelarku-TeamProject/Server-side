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

app.use(routes)

// * error handler middleware
app.use(errorHandler)

// ! Menjalank Server
const port = process.env.PORT
app.listen(port, () => console.log(`🚀 Server berjalan di port ${port}!`))