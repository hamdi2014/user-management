const express = require('express')
const dotEnv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const indexRouter = require('./routes/index.route.js')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/dbConnect.js')
const errorController = require('./controllers/err.controller.js')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUI = require('swagger-ui-express')

//load app environment variables
dotEnv.config()

connectDB()
const app = express()
const port = process.env.PORT || 3000

//set cors policy options
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/', indexRouter)

app.use(errorController)

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User management api doc',
      version: '0.0.1',
      description:
        'This is a simple user management API app made with Express Js and documented with swagger',
      contact: {
        name: 'skills with Hamdollah',
        url: 'https://github.com/hamdi2014',
        email: 'cn120.2010@gmail.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsDoc(options)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
