const User = require('../models/user.model')

const createUser = async (req, res, next) => {
  try {
    if (!req.body) {
      throw {
        code: 400,
        message: 'content can not be empty!',
      }
    }
    const newUser = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      role: req.body?.role,
      email: req.body.email,
      password: req.body.password,
    })

    await newUser.save()
    console.log(newUser)
    res.json({ message: 'Data successfully saved!', addedUser: newUser })
  } catch (err) {
    next(err)
  }
}

const getUsers = async (req, res, next) => {
  try {
    if (!req.query.id) {
      const users = await User.find()
      res.json(users)
    }
    const userId = req.query.id
    const user = await User.findById(userId)
    if (!user) {
      throw {
        code: 404,
        message: `User not found by id: ${userId}`,
      }
    }
    console.log('User found!')
    res.json(user)
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
  try {
    console.log('OK')
    if (!req.body) {
      throw {
        code: 400,
        message: 'Data to update can not be Empty!',
      }
    }

    const userId = req.query.id
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updatedUser) {
      throw {
        code: 404,
        message: 'Not Found!',
      }
    }
    console.log('Data successfully Updated!')
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    if (!req.query.id) {
      throw {
        code: 400,
        message: 'user id can not be Empty!',
      }
    }

    const userId = req.query.id
    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
      throw {
        code: 404,
        message: 'Not found!',
      }
    }

    console.log('Data successfully Deleted!')
    res.json(deletedUser)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
}
