/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        -firstName
 *        -lastName
 *        -userName
 *        -email
 *        -password
 *      properties:
 *        id:
 *          type: string
 *          description: The auto-generated id of the user
 *        firstName:
 *          type: string
 *          description: The first name of user
 *        lastName:
 *          type: string
 *          description: The last name of user
 *        userName:
 *          type: string
 *          description: The name for use in app for user
 *        role:
 *          type: string
 *          description: role of user
 *        email:
 *          type: string
 *          description: email of user
 *        password:
 *          type: string,
 *          description: password for user account
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The user managing API
 * /users:
 *  get:
 *    summary: Lists all the users
 *    tags: [User]
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 */

/**
 * @swagger
 * tags:
 *  name: User
 *  description: The user managing API
 * /users/{id}:
 *  get:
 *    summary: Get user by ID
 *    tags: [User]
 *    description: Retrieve a user by their ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: string ID of the user to retrieve
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: string
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                userName:
 *                  type: string
 *                role:
 *                  type: string
 *                email:
 *                  type: string
 */

/**
 * @swagger
 * /users/create:
 *  post:
 *    summary: Add a new user
 *    tags: [User]
 *    description: Add a new user to the system
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *              email:
 *                type: string
 *              role:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      201:
 *        description: User created successfully
 */

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update user by ID
 *    tags: [User]
 *    description: Update a user by their ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: string ID of the user to update
 *        schema:
 *          type: string
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              firstName:
 *                type: string
 *              lastName:
 *                type: string
 *              userName:
 *                type: string
 *              email:
 *                type: string
 *              role:
 *                type: string
 *              password:
 *                type: string
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                userName:
 *                  type: string
 *                email:
 *                  type: string
 *                role:
 *                  type: string
 *      404:
 *        description: User not found
 */

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *    summary: Delete user by ID
 *    tags: [User]
 *    description: Delete a user by their ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: string ID of the user to Delete
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: User deleted successfully
 *      404:
 *        description: User not found
 */

const express = require('express')
const userRouter = express.Router()
const userController = require('../controllers/user.controller')

userRouter.post('/create', userController.createUser)
userRouter.get('/', userController.getUsers)
userRouter.get('/:id', userController.getUsers)
userRouter.put('/update/:id', userController.updateUser)
userRouter.delete('/delete/:id', userController.deleteUser)

module.exports = userRouter
