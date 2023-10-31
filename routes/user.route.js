const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')

userRouter.post('/create', userController.createUser)

//get one user with id or all users
userRouter.get('/', userController.getUsers)
userRouter.put('/update', userController.updateUser)
userRouter.delete('/delete', userController.deleteUser)

module.exports = userRouter
