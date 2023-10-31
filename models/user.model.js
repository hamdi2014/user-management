const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please Enter first name!'],
    },
    lastName: {
      type: String,
      required: [true, 'Please Enter last name!'],
    },
    userName: {
      type: String,
      required: [true, 'Enter an username!'],
      trim: true,
      unique: true,
      lowercase: true,
      minlength: [4, 'username should be at least Four characters!'],
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      required: true,
      default: 'user',
    },
    email: {
      type: String,
      required: [true, 'Enter an email!'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Enter a password!'],
      minlength: [8, 'Password should be at least Eight characters!'],
    },
  },
  { timestamps: true }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, 15)
  }
  next()
})

userSchema.pre('findOneAndUpdate', async function (next) {
  console.log(this._update)
  if (this._update.password && this._update.password.trim().length > 8) {
    this._update.password = await bcryptjs.hash(this._update.password, 15)
  } else {
    delete this._update.password
  }
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
