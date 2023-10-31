const express = require('express')
const dotEnv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const indexRouter = require('./routes/index.route.js')
const cookieParser = require('cookie-parser')
const connectDB = require('./db/dbConnect.js')
const errorController = require('./controllers/err.controller.js')

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
