const express = require('express')

const userRouter = require('./user.route')

const indexRouter = express.Router()
indexRouter.get('/', (req, res) => {
  res.send('<h1>User Management</h1>')
})

indexRouter.use('/users', userRouter)

module.exports = indexRouter
